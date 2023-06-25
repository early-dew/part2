
const People = ({ persons, newSearch }) => {
  const filteredSearch = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  const filteredList = filteredSearch.map(item => <p key={item.name}>{item.name} {item.number}</p>)


  return (
    <div>
      {filteredList.length > 0 ? filteredList : 'no results'}
    </div>
  )
}

export default People