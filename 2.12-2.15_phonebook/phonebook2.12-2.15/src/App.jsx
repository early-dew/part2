import { useState, useEffect } from 'react'
import People from './components/People'
import NewPeopleForm from './components/NewPeopleForm'
import NameFilter from './components/NameFilter'
import phonebookService from './services/peoples'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    phonebookService
      .getAll()
      .then(allPeople => {
        setPersons(allPeople)
      })
      .catch(error => {
        console.log("failed to show all phone contacts")
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const addNumber = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const sameName = persons.find(person => person.name.toLowerCase() === nameObject.name.toLowerCase())
    // sameName ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    // setNewName('')



    if (sameName && nameObject.number !== '') {
      let result = confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)
      if (result === true) {
        phonebookService
          .update(id)
          .then(returnedData => {
            setPersons(persons.map(person => person.id !== id ? person : returnedData.number))
            // setPersons(persons.map(person => person.id !== id ? person : returnedData))

          })
      }
    } else if (sameName) {
      alert(`${newName} is already added to phonebook`)
    } else {
      phonebookService
        .create(nameObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
        })
        .catch(error => {
          console.log("failed to create a new contact")
        })
    }

  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const deleteContact = (id, name) => {

    let result = confirm(`Delete ${name}?`)
    if (result === true) {
      phonebookService
        .remove(id)
        .then(returnedData => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.log('Failed to delete contact:', error)
        })
    }

  }



  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <h3>Add a new</h3>
      <NewPeopleForm
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber} addNumber={addNumber}

      />
      <h3>Numbers</h3>
      <ul>
        {persons.map(person =>
          <People key={person.id} person={person} name={person.name} newSearch={newSearch} deleteContact={() => deleteContact(person.id, person.name)} />
        )}
      </ul>
    </div>
  )
}

export default App

