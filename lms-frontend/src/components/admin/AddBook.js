import React, { useState } from 'react'
import '../../css/addbook.css'
import axios from 'axios'

const AddBook = (props) => {

  const user = props.user

  const [book, setBook] = useState({
    title: "",
    publisher: "",
    authors: "",
    isbn: undefined,
    version: "",
    lib_id:user.lib_id,
    total_copies: 1,
    available_copies: 1
  })

  const handleInputData = (e) => {
    e.preventDefault()
    if (e.target.name === 'isbn') {
      setBook({
        ...book,
        [e.target.name]: parseInt(e.target.value)
      })
    }
    else {
      setBook({
        ...book,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleBookPublish = (e) => {
    e.preventDefault()
    if(book.isbn.toString().length !== 13){
      alert("Enter Valid ISBN No.")
    }else{
      const data = {
        email:user.email,book:book
      }
      console.log(data)
      axios.post("http://localhost:8080/add-book",data)
      .then(res => alert(res.data.msg))
      .catch(err => console.log(err))
    }

  }


  return (
    <div id='addbook'>
      <h1>Add new Books to your Collection</h1>
      <form onSubmit={handleBookPublish}>
        <input type='text' className='fields' name='title' onChange={handleInputData}  placeholder='Title of the book' required></input>
        <br />
        <input type='text' className='fields' name='publisher' onChange={handleInputData}  placeholder='Name of the Publisher' required></input>
        <br />
        <input type='text' className='fields' name='authors' onChange={handleInputData}  placeholder='Name of the Authors (comma separated)' required></input>
        <br />
        <input type='text' className='fields' name='version' onChange={handleInputData}  placeholder='Version of the book' required></input>
        <br />
        <input type='number' className='fields' name='isbn' onChange={handleInputData}  placeholder='ISBN number' required></input>
        <br />
        <button type='submit' id='publish-btn'>Publish</button>
      </form>
    </div>
  )
}

export default AddBook