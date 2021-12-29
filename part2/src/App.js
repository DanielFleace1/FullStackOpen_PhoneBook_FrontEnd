import React, { useEffect, useState } from 'react'
//import axios from 'axios'
import SearchBar from './components/SearchBar'
import Names from './components/Names'
import NewEntry from './components/NewEntry'
import Message from './components/Message'
import ErrorMessage from './components/errorMessage'
import serverFunctions from './services/serverFunctions'
import axios from 'axios'

// base URLs for delete
// const baseUrl = 'https://radiant-refuge-98080.herokuapp.com/api/persons'
// relative baseUrl
const baseUrl = '/api/persons'


// App Component 
const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('');
  const [newFilter,setNewFilter] = useState('')
  const [message,setMessage] = useState(null)
  const [errorMessage,setErrorMessage] = useState(null)
  
  const addNewName = (e) => {
    e.preventDefault();
    /** Make sure Data is entered for all fields */
    const newNamelen = newName.length;
    const newNumlen = newNum.length;
    if(newNamelen === 0 || newNumlen === 0){ return alert('Please enter data for all the fields')}    
    const newNameObj = {
      name:newName,
      number: newNum
    }   
    // Look for name in phone book. Will return the object if it exists 
    const person = persons.find(n=>n.name === newName)
    // if numnber does not already exist 
    if(!person) {
      // create new object to be "posted"
      serverFunctions
      .create(newNameObj)
      .then(response=>{  
        //console.log('response to post')
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNum('')
        setMessage(`${newNameObj.name} was added to your phone book`)
        setTimeout(() => {
          setMessage(null)
          }, 3000)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setNewName('');
        setNewNum('');


      })
    }
    // if number does exist and user wants to change their num.
    else{ 
      const truthy = window.confirm(`${newName} is already added to the phonebook, would you like to replace the old number with a new one?`);      
      // users confirms to make a change
      if(truthy){
        const changedPerson = {...person, number: newNum}
        serverFunctions
        .update(person.id,changedPerson)
        .then( response=> {
          setPersons(persons.map(prsn=> prsn.id !== person.id ? prsn : response.data))
          setNewName('');
          setNewNum('');
          setMessage(`${newNameObj.name}'s number was changed to ${newNameObj.number} in your phone book `)
          setTimeout(() => {
            setMessage(null)
          }, 3000)
          })
        .catch(error=> {
          console.log('There is an error:',error)
          setErrorMessage(`${newNameObj.name} has already been deleted from the server `)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
          setNewName('');
          setNewNum('');
          setPersons(persons.filter(prsn => prsn.id !== person.id))
        })  
      }
      else return
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
    const truthy = window.confirm(`Are you sure you want to delete ${b} from your phonebook?`)
    if(truthy){
      axios
      .delete(`${baseUrl}/${a}`)
      let copy = [...persons]
      const removeIndex= persons.findIndex(persons=>persons.id === a)
      console.log(copy)
      copy.splice(removeIndex,1)
      console.log(copy)
      setPersons(copy)
    }
    else return 
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
      <Message  message = {message}/>
      <ErrorMessage  errorMessage = {errorMessage}/>
      <SearchBar handleFilterChange = {handleFilterChange} />
      <h2>Add a new person</h2>
      <NewEntry newName = {newName} newNum ={newNum}  handleNameChange ={handleNameChange} handleNumChange = {handleNumChange} addNewName = {addNewName} />
      <Names persons = {persons} newFilter ={newFilter} handleDelete = {handleDelete} />
    </div>
  )
}
export default App

