import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = (props) => {
  return (
    <div>
        filter shown with: <input
        value={props.newFilter}
        onChange={props.handleFilter}
        />
      </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  
  return(
    <div>
      {props.dataToShow.map(persons =>
        <p key={persons.id}>
          {persons.name} {persons.number} <button onClick={() => props.deletePerson(persons.id, persons.name)}>delete</button>
        </p>
        )}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      //id: persons.length + 1
    }
   
    const item = persons.find(item => item.name === newName)
    console.log(item)
    
    if (item) {
      const nameWarning = window.confirm(`${newName} already exists in the phonebook, replace the old number with a new one?`)
      if (nameWarning){
        replaceNumber(item.id)
      } else {
        console.log('number not updated')
      }
    } 
    
    else {
      personService
      .create(nameObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const replaceNumber = (id) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = {...person, number: newNumber}

    personService
    .replace(id, changedPerson)
    .then(response => {
      setPersons(persons.map(person => person.id !== id ? person : response.data))
    })
  }

  const deletePerson = (id, name) => {
    const deleteWarning = window.confirm(`Delete ${name}?`)
    if (deleteWarning) {
      personService
      .remove(id)
    } else {
      console.log('delete not confirmed')
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
    setNewFilter(event.target.value)
  }

  const dataToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter}
      handleFilter={handleFilter}
       />
      <h2>add a new number</h2>
      <PersonForm addName={addName}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}     
      />
      <h2>Numbers</h2>
      <Persons dataToShow={dataToShow}
      deletePerson={deletePerson} />
    </div>
  )

}
export default App