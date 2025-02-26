import React from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div id='home'>
      <p id='heading'>Welcome to Library Management</p>
      <p>You want to</p>
      <div id='btns'>
        <button onClick={()=>navigate('/owner/register')}>Continue as Owner</button>
        <p id='or'>OR</p>
        <button onClick={()=>navigate('/admin/login')}>Continue as Admin</button>
        <p id='or'>OR</p>
        <button onClick={()=>navigate('/account-check')}>Continue as Reader</button>
      </div>
    </div>
  )
}

export default Home