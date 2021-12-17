import React from 'react'

const Names = ({persons,newFilter,handleDelete}) => {

    // Find index in persons of the filtered data so it can be displayed 
    const index = persons.findIndex(x =>x.name === newFilter)
    
    if(newFilter.length===0){
      return(
        <div>
          <h2>Numbers</h2>
          {persons.map((persons,index)=> {return  <li key={index}> {persons.name}: {persons.number} <button  onClick = {()=>{handleDelete(persons.id,persons.name)}} > delete</button></li>
          })}
        </div>
      )
    }
    else if(index > -1){
      return (
        <div> 
          <h2>Filtered names</h2>
          {persons[index].name}: {persons[index].number}  <button onClick = {()=>{handleDelete(persons[index].id,persons[index].name)}}> delete </button>
          <p>(clear filter bar to see all existing phone numbers)</p>
        </div>
      )
    }
    else {
      return (
        <div> 
          <h2>Filtered names</h2>
          <p> No filtered names exist</p>
          {/* <div>{newFilter}</div> */}
          <p>(clear filter bar to get all phone numbers)</p>
        </div>
      )
    }
  }

export default Names