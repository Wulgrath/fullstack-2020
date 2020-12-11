
import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        born
      }
      published
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 4000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 4000
  })
  
  console.log(authors.data)
  console.log(books.data)


  if (authors.loading) {
    return <div>
      loading...
    </div>
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
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
      />

    </div>
  )
}

export default App