import React, { useEffect, useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ALL_BOOKS } from './queries'
import { ALL_AUTHORS } from './queries'
import { BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [error, setError] = useState('')
  const client = useApolloClient()

  useEffect(() => {
    const loggedUser = localStorage.getItem('library-user-token')
    if (loggedUser) {
      const token = loggedUser
      setToken(token)
    }
  })

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 4000
  })

  const books = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(subscriptionData)
      window.alert(`A book titled '${addedBook.title}' was added`)
      updateCacheWith(addedBook)
    }
  })

  if (authors.loading) {
    return <div>
      loading...
    </div>
  }

  const logOut = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      {token === null ? <LoginForm
        setError={setError}
        setToken={setToken}
      /> : <button onClick={logOut}>Log out</button>}

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ?
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
          </div>
          : null
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data}
      />
      <Books
        show={page === 'books'}
        books={books.data}
      />
      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />
      <Recommended
        show={page === 'recommended'}
        books={books.data}
      />

    </div>
  )
}

export default App