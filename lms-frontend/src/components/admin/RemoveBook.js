import React, { useState, version } from 'react'
import '../../css/addbook.css'
import axios from 'axios'

const RemoveBook = () => {

  const [isbn, setISBN] = useState()

  const handleBookRemove = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/remove-book",{isbn:isbn})
    .then(res => alert(res.data.msg))
    .catch(err => alert(err.response.data.error))
    
  }


  return (
    <div id='addbook'>
      <h1>Remove a Book from your Collection</h1>
      <form onSubmit={handleBookRemove}>
        <input type='number' className='fields' name='isbn' onChange={(e)=>setISBN(parseInt(e.target.value))} required placeholder='ISBN number'></input>
        <br />
        <button type='submit' id='publish-btn'>Remove</button>
      </form>
    </div>
  )
}


export default RemoveBook