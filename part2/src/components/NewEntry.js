import React from 'react'

const NewEntry = ({newName,newNum,handleNameChange,handleNumChange,addNewName}) => {
    return(
      <form onSubmit = {addNewName} >
      <div>name: <input value = {newName} onChange={handleNameChange} /></div>
      <div>number: <input value = {newNum} onChange={handleNumChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
    )
}

export default NewEntry