import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorFlag, setFlag] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
      .then(initPersons => {
        setPersons(initPersons)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      if (persons.find(person => person.number === newNumber)) {
        alert(`${newName} is already added to phonebook with the same number`)
      }
      else if (window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`)) {
        const personToChange = persons.find(p => p.name === newName)
        const updatedPerson = { ...personToChange, number: newNumber }
        
        personsService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          })
          .catch(error => {
            console.log(error)
            setFlag(true)
            setInfoMessage(`Information of ${persons.find(p => p.id === updatedPerson.id).name} has already been removed from the server`)
            setTimeout(() => {
              setInfoMessage(null)
              setFlag(false)
            }, 5000)
            setPersons(persons.filter(p => p.id !== updatedPerson.id))  
          })
      }
    }
    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })

    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const contactsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  const toggleDelete = (id) => {
    if (window.confirm(`Delete ${persons.find(p => p.id == id).name} ?`)) {
      personsService
        .del(id)
        .catch(error => {
          setFlag(true)
          setInfoMessage(`Information of ${persons.find(p => p.id === id).name} has already been removed from the server`)
          setTimeout(() => {
            setInfoMessage(null)
            setFlag(false)
          }, 5000)  
        })
      setPersons(persons.filter(p => p.id !== id))
      setInfoMessage(`Deleted ${persons.find(p => p.id === id).name}`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={infoMessage}
        errorFlag={errorFlag}
      />
      <Filter
        filter={filter}
        handleFilter={handleFilter}
      />
      <h2>New contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        addContact={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
        {contactsToShow.map(person =>
          <Person
            key={person.id}
            person={person}
            toggleDelete={() => toggleDelete(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App
