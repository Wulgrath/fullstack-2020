import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return (
    <div>
      <div className="notification">
        {notification}
      </div>
    </div>
  )
}

const ErrorNotification = ({ errorNotification }) => {
  if (errorNotification === null) {
    return null;
  }
  return (
    <div>
      <div className="errorNotification">
        {errorNotification}
      </div>
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorNotification, setError ] = useState(null)

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
      number: newNumber
    }

    const item = persons.find(item => item.name === newName)
    
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
        setNotification(`Person '${newName}' was added to the phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
      setNotification(`${person.name}'s number was changed to the phonebook`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    })
    .catch(error => {
      console.log(`${error} the person '${person.name}' no longer exists in the phonebook`)
      setError(`the person '${person.name}' no longer exists in the phonebook`)
      setTimeout(() => {
        setError(null)
      }, 3000)
      setPersons(persons.filter(n => n.id !== id))
    })
  }

  const deletePerson = (id, name) => {
    const deleteWarning = window.confirm(`Delete ${name}?`)
    if (deleteWarning) {
      personService
      .remove(id)
      setPersons(persons.filter(n => n.id !== id))
      setNotification(`The person '${name}' was deleted from the phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 3000)
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
      <Notification notification={notification} />
      <ErrorNotification errorNotification={errorNotification}/>
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