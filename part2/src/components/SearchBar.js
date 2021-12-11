import React from 'react'
const SearchBar = ({handleFilterChange}) => {
    return (
      <div>Search for names:<input onChange={handleFilterChange}/></div>
    )
}
export default SearchBar