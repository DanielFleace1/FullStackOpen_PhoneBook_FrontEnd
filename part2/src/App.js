import React, { useEffect, useState } from 'react'
//import axios from 'axios'
import SearchBar from './components/SearchBar'
import Names from './components/Names'
import NewEntry from './components/NewEntry'
import serverFunctions from './services/serverFunctions'
import axios from 'axios'



// App Component 
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('');
  const [newFilter, setNewFilter] = useState('');
  
  const addNewName = (e) => {
    e.preventDefault();
    /** Make sure Data is entered for all fields */
    const newNamelen = newName.length;
    const newNumlen = newNum.length;
    if(newNamelen === 0 || newNumlen === 0){ return alert('Please enter data for all the fields')} 
        
    // Look for name in phone book. Will return the object if it exists 
    const person = persons.find(n=>n.name === newName)
    if(!person) {
      // create new object to be "posted"
      const newNameObj = {
        name:newName,
        number: newNum
      }
      serverFunctions
      .create(newNameObj)
      .then(response=>{  
          //console.log('response to post')
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNum('')
        })
    }
    else{ 
      window.confirm(`${newName} is already added to the phonebook, would you like to replace the old number with a new one?`);      
      const changedPerson = {...person, number: newNum}
      serverFunctions
      .update(person.id,changedPerson)
      .then( response=> {
        setPersons(persons.map(prsn=> prsn.id !== person.id ? prsn : response.data))
      })
      setNewName('');
      setNewNum('');    
    }
  }

  // Handle Changes in name  change for new entry 
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  // Handle Changes in number change for new entry 
  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  }
  // Hanlde changes in the filter
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  }
  // Handle Delete
  const handleDelete = (a,b) => {
    window.confirm(`Are you sure you want to delete ${b} from your phonebook?`)
    axios
    .delete(`http://localhost:3001/persons/${a}`)
    let copy = [...persons]
    const removeIndex= persons.findIndex(persons=>persons.id === a)
    copy.splice(removeIndex)
    setPersons(copy)
  }
    // Get initial data from backend. Storing Data in state persons.
    useEffect(() => {
      serverFunctions
        .getAll()
        .then(response =>{
        setPersons(response.data)
      })
    },[])
  
  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar handleFilterChange = {handleFilterChange} />
      <h2>Add a New</h2>
      <NewEntry newName = {newName} newNum ={newNum}  handleNameChange ={handleNameChange} handleNumChange = {handleNumChange} addNewName = {addNewName} />
      <Names persons = {persons} newFilter ={newFilter} handleDelete = {handleDelete} />
    </div>
  )
}
export default App

