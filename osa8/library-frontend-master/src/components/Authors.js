  
import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'

  const EDIT_BIRTH = gql`
    mutation editBirth($name: String!, $born: Int!) {
      editAuthor(
        name: $name,
        born: $born
      ) {
        name
        born
      }
    }
  `

const Authors = (props) => {

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editBirth] = useMutation(EDIT_BIRTH)
  
  if (!props.show) {
    return null
  }

  const addBirth = async (event) => {
    event.preventDefault()

    editBirth({ variables: { name: name.value, born: Number(born) }})

    setName('')
    setBorn('')
  }

  const authors = props.authors.allAuthors

  const options = authors.map(p => ({ value: p.name, label: p.name}))
  console.log(name)
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set Birthyear</h2>
        <form onSubmit={addBirth}>
          <div>
            <Select 
              value={name}
              onChange={setName}
              options={options}
            />
          </div>
          <div>
            born
            <input 
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
