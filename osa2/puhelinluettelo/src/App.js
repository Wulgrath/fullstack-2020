import React, { useState } from 'react'


const App = (props) => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'044-1267723', id: '1' },
    { name: 'Jesse Mainio', number:'044-3565723', id: '2' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll] = useState('')
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    let item = persons.find(item => item.name === newName)
    console.log(item)
    
    if (item) {
      window.alert(`${newName} already exists in the phonebook`)
    } else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('button clicked', event.target)
    }
    
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log(event.target.value)
    setShowAll(event.target.value)
  }

  const dataToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes({showAll}))

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
        value={showAll}
        onChange={handleFilter}
        />
      </div>
      <h2>add a new number</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {dataToShow.map(persons =>
          <p key={persons.id}>
            {persons.name} {persons.number}
          </p>
          )}
    </div>
  )

}
export default App