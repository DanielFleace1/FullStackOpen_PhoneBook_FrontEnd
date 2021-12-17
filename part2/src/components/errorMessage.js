import React from 'react'
import '../index.css'

const ErrorMessage = ({errorMessage}) => {
    if(!errorMessage){
        return(
            <div></div> 
        )
    }
    else{
        return(
            <div className = 'errorMessage'>{errorMessage}</div>
        )
    }
}

export default ErrorMessage