import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//Get all function used for getting data from server 
const getAll = () => {
    return axios.get(baseUrl)
}
// create function used for posting a new phone number 
const create = newObject =>{
    return axios.post(baseUrl,newObject)
}

const update = (id,newObject) => {
  return axios.put(`${baseUrl}/${id}`,newObject)
}


let serverFunctions = {
    getAll: getAll,
    create: create,
    update:update
}

export default serverFunctions 

