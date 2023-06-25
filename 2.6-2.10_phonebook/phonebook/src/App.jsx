import { useState } from 'react'
import People from './components/People'
import NewPeopleForm from './components/NewPeopleForm'
import NameFilter from './components/NameFilter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


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

    const sameName = persons.find(person => person.name === nameObject.name)
    sameName ? alert(`${newName} is already added to phonebook`) : setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <NameFilter handleSearchChange={handleSearchChange} newSearch={newSearch} />
      <h3>Add a new</h3>
      <NewPeopleForm handleNameChange={handleNameChange} newName={newName} handleNumberChange={handleNumberChange} newNumber={newNumber} addNumber={addNumber} />
      <h3>Numbers</h3>
      <People persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App

