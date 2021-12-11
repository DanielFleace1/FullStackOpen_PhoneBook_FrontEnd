import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from './components/SearchBar'
import Names from './components/Names'
import NewEntry from './components/NewEntry'



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
    //console.log(newNamelen); console.log(newNumlen);
    if(newNamelen === 0 || newNumlen === 0){ return alert('Please enter data for all the fields')} 
    /** Store input data into state. 
     *  Make sure user does not enter a name that already has an entry .
     */
    const newNameObj = {
      name:newName,
      number: newNum
    }
    var index = persons.findIndex(x =>x.name === newNameObj.name);
    if(index ===-1 ){
      setPersons(persons.concat(newNameObj))
      if(index===-1){
        setNewName('')
      }
      if(index===-1){
        setNewNum('')
      }
    }
    else{ 
      setNewName('');
      setNewNum('');
      alert(`${newNameObj.name} is already added to phonebook`);
    }
  }
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumChange = (e) => {
    setNewNum(e.target.value);
  }
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response =>{
        console.log('promise fulfilled', response)
        setPersons(response.data)
      })
  },[])
  
  return (
    <div>
      <h1>Phonebook</h1>
      <SearchBar handleFilterChange = {handleFilterChange} />
      <h2>Add a New</h2>
      <NewEntry newName = {newName} newNum ={newNum}  handleNameChange ={handleNameChange} handleNumChange = {handleNumChange} addNewName = {addNewName}  />
      <Names persons = {persons} newFilter ={newFilter} />
    </div>
  )
}
export default App


// leaving of tryihg to create the effect hook to render the data rather than the state wooo::

//part 2. exercise 2.11: The phonebook step6