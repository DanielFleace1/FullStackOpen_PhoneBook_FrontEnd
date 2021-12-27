import axios from 'axios'
// --- For testing Front end with db.json
//const baseUrl ='http://localhost:3001/persons'
// --- For connecting to backEnd
//const baseUrl = 'https://radiant-refuge-98080.herokuapp.com/api/persons'
// relative baseUrl
const baseUrl = '/api/persons'
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

