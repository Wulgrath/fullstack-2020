import React, { useState } from 'react'

const Books = (props) => {


  const [bookGenre, setBookGenre] = useState('')
  
  if (!props.show) {
    return null
  }

  const filteredBooks = () => {

    if (bookGenre) {
      return props.books.allBooks.filter(book => book.genres.includes(bookGenre ))
    } else {
      return props.books.allBooks
    }
  }
  
  
  return (
    <div>
      <h2>books</h2>
      in genre: <b>{bookGenre}</b>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>
              author
            </th>
            <th>
              published
            </th>
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
      <button onClick={() => setBookGenre('patterns')}>patterns</button><button onClick={() => setBookGenre('drama')}>drama</button><button onClick={() => setBookGenre('crime')}>crime</button><button onClick={() => setBookGenre('nosql')}>nosql</button><button onClick={() => setBookGenre('database')}>database</button><button onClick={() => setBookGenre('')}>all genres</button>
    </div>
  )
}

export default Books