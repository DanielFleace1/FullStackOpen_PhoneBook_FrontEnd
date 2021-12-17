import React from 'react'
import '../index.css'

const Message = ({message}) => {
    if(!message){
        return(
            <div></div> 
        )
    }
    else{
        return(
            <div className = 'successMessage'>{message}</div>
        )
    }
}

export default Message