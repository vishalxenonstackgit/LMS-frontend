import React, { useEffect, useState } from 'react'
import Navbar from '../components/reader/Navbar'
import Sidebar from '../components/reader/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ReaderDashboard = () => {
  const location = useLocation()
  const email = location.state

  const navigate = useNavigate()
  
  const [token,setToken] = useState(localStorage.getItem("token"))
  useEffect(()=>{
    axios.post("http://localhost:8080/verify-token-exp",{token:token})
    .then(res => console.log(res))
    .catch(err => {
      localStorage.removeItem("token")
      navigate('/reader/register')
    })
  },[])
  return (
    <div>
      <Navbar email={email}/>
      <Sidebar email={email}/>
    </div>
  )
}

export default ReaderDashboard