import React, { useState } from 'react'

const Books = (props) => {


  const [bookGenre, setBookGenre] = useState('')
  
  if (!props.show) {
    return null
  }

  const books = props.books.allBooks

  const uniqueBooks = () => {
    return [...new Map(books.map(book => [book, book.genres])).values()]
  }

  let unique = [...new Set(uniqueBooks())]
  console.log(uniqueBooks())
  console.log(unique)

  const arr = uniqueBooks('nosql')

  console.log(arr)
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
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {books.map(book => 
        <button key={book.title} onClick={() => setBookGenre(book.genres)}>{book.genres}</button>
      )}
    </div>
  )
}

export default Books