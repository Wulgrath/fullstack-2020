import React, { useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries'

const Recommended = (props) => {

  const currentUser = useQuery(ME)
  useEffect(() => {

  })

  if (!props.show) {
    return null
  }

  const filteredBooks = () => {
    return props.books.allBooks.filter(book => book.genres.includes(currentUser.data.me.favoriteGenre))
  }


  return (
    <div>
      <h2>Recommendations</h2>
      books in your favorite genre <b>{currentUser.data.me.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks().map(book =>
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )

}




export default Recommended