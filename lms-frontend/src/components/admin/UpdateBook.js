import React, { useState, version } from 'react'
import '../../css/addbook.css'
import axios from 'axios'

const UpdateBook = (props) => {
  const user = props.user

  const [isbn, setISBN] = useState("")

  const [book, setBook] = useState(null)

  const handleInputISBN = (e) => {
    e.preventDefault()
    setISBN(e.target.value)
  }

  const handleInputData = (e) => {
    e.preventDefault()
    setBook({
      ...book,
      [e.target.name]: e.target.value
    })
  }

  const fetchBookdata = (e) => {
    e.preventDefault()
    console.log(isbn)
    axios.post("http://localhost:8080/get-book", { isbn: parseInt(isbn) })
      .then(res => setBook(res.data.msg))
      .catch(err => console.log(err))
  }

  const handleBookUpdate = (e) => {
    e.preventDefault()
    console.log(book)
    axios.post("http://localhost:8080/update-book", book)
      .then(res => {
        alert(res.data.msg)
        window.location.reload()
      })
      .catch(err => console.log(err))

  }


  return (
    <div id='addbook'>
      <h1>Update a book in your Collection</h1>
      <form onSubmit={fetchBookdata}>
        <input type='number' className='fields' name='isbn' onChange={handleInputISBN} placeholder='Enter the ISBN Number Here' required></input>
        <br />
        <button id='publish-btn' type='submit'>Get Book</button>
      </form>
      <br></br>
      {
        book && <><p>Fill all the fields that you want to update in a book</p>
          <form onSubmit={handleBookUpdate}>
            <input type='text' className='fields' name='title' value={book.title} onChange={handleInputData} placeholder='Title of the book' required></input>
            <br />
            <input type='text' className='fields' name='publisher' value={book.publisher} onChange={handleInputData} placeholder='Name of the Publisher' required></input>
            <br />
            <input type='text' className='fields' name='authors' value={book.authors} onChange={handleInputData} placeholder='Name of the Authors (comma separated)' required></input>
            <br />
            <input type='text' className='fields' name='version' value={book.version} onChange={handleInputData} placeholder='Version of the book' required></input>
            <br />
            <button type='submit' id='publish-btn'>Update</button>
          </form></>
      }

    </div>
  )
}

export default UpdateBook