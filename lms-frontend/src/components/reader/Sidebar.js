import React, { useState, useEffect } from 'react'
import '../../css/reader_sidebar.css'
import axios from 'axios'

import Profile from './Profile'
import IssueRequests from './IssueRequests'
import NewRequest from './NewRequest'
import Books from './Books'
import IssuedBooks from './IssuedBooks'
import {useNavigate} from 'react-router-dom'

const Sidebar = (props) => {

  const email = props.email
  const navigate = useNavigate()

  const [user, setUser] = useState({})

  const fetchData = async () => {
    await axios.post("http://localhost:8080/get-user-data", { email })
      .then(res => setUser(res.data.msg))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [display, setDisplay] = useState({
    profile: false,
    issue_requests: false,
    issued_books:false,
    raise_request: false,
    books: true,
  })

  const handleClick = (e) => {
    setDisplay({
      profile: false,
      issue_requests: false,
      raise_request: false,
      issued_books:false,
      books: false,
      [e.target.name]: true
    })
  }

  const handleLogOut = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    navigate('/reader/register')
 }

  return (
    <>
      <div className='resp-navbar-admin'>
        <button onClick={handleClick} name='profile'>Profile</button>
        <button onClick={handleClick} name='issue_requests'>My Issue Requests</button>
        <button onClick={handleClick} name='raise_request'>Raise new Request</button>
        <button onClick={handleClick} name='books'>View Books</button>
        <button onClick={handleClick} name='issued_books'>Issued Books</button>
        <button onClick={handleLogOut}>Logout</button>
      </div>

      <div id='reader_sidebar'>
        <div id='navbar'>
          <button onClick={handleClick} name='profile'>Profile</button>
          <button onClick={handleClick} name='issue_requests'>My Issue Requests</button>
          <button onClick={handleClick} name='raise_request'>Raise new Request</button>
          <button onClick={handleClick} name='books'>View Books</button>
          <button onClick={handleClick} name='issued_books'>Issued Books</button>
          <button onClick={handleLogOut}>Logout</button>
        </div>
        <div id='content'>
          {display.profile && <Profile user={user} />}
          {display.issue_requests && <IssueRequests user={user} />}
          {display.raise_request && <NewRequest user={user} />}
          {display.books && <Books user={user} />}
          {display.issued_books && <IssuedBooks user={user} />}
        </div>

      </div>
    </>

  )
}

export default Sidebar