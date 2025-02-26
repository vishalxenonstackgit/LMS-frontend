import React, { useState } from 'react'
import axios from 'axios'
import '../css/admin_register.css'
import img from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom'

const OwnerRegister = () => {

  const navigate = useNavigate()
  const [display, setDisplay] = useState(true)
  const [email, setEmail] = useState("")

  const handleDisplay = (e) => {
    e.preventDefault()
    setDisplay(!display)
  }

  const [data, setData] = useState({
    library: "",
    name: "",
    email: "",
    contact_number: "",
    role: "owner",
    lib_id: 1
  })

  const handleSignUpChange = (e) => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleCreateAccount = (e) => {
    e.preventDefault()
    if (data.contact_number.length !== 10) {
      alert("Please enter valid phone number")
    } else {
      axios.post("http://localhost:8080/create-owner", data)
        .then(res => {
          alert(res.data.msg)
          setDisplay(!display)
        })
        .catch(err => {
          alert(err.response.data)
        })
    }

  }

  const handleLogin = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/login",{email})
      .then(res => {
        localStorage.setItem("token",res.data.token)
        if (res.data.msg == "owner") navigate("/owner/dashboard",{state:email})
        else if (res.data.msg == "reader") navigate("/reader/dashboard",{state:email})
        else navigate("/admin/dashboard",{state:email})
      })
      .catch(err => alert(err))
  }

  return (
    <div id='admin-signup'>
      <div id='content' >
        {display &&
          <form onSubmit={handleCreateAccount}>
            <h1>Welcome to Library Management</h1>
            <p>Create Your Library</p>
            <div >
              <input type='text' id='library' name='library' className='signup-fields' placeholder='Name your library' onChange={handleSignUpChange} required></input>
              <br />
              <input type='text' id='name' name='name' className='signup-fields' placeholder='Your Full Name' onChange={handleSignUpChange} required></input>
              <br />
              <input type='email' id='email' name='email' className='signup-fields' placeholder='Your Email' onChange={handleSignUpChange} required></input>
              <br />
              <input type='number' id='number' name='contact_number' className='signup-fields' placeholder='Your Mobile' onChange={handleSignUpChange} required></input>
              <br />
              <button type='submit' className='btn'>Create My Library</button>
              <br />
            </div>
            <br />
            <p>Already have a library - <a href='' onClick={handleDisplay}>login now</a></p>
          </form>
        }


        {!display &&
          <form onSubmit={handleLogin}>
            <h1>Welcome to Library Management</h1>
            <input
              type='email' id='email' className='signup-fields' placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} required></input>
            <br />
            <button type='submit' className='btn'>Login</button>
            <br /><br />
            <p>Don't have an account - <a href='' onClick={handleDisplay}>signup now</a></p>
          </form>
        }


      </div>
      <div id='image'>
        <img src={img}></img>
      </div>
    </div>
  )
}

export default OwnerRegister