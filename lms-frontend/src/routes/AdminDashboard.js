import React,{useState,useEffect} from 'react'
import Navbar from '../components/admin/Navbar'
import Sidebar from '../components/admin/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminDashboard = () => {
  const location = useLocation()
  const email = location.state
  const navigate = useNavigate()
  
  const [token,setToken] = useState(localStorage.getItem("token"))
  useEffect(()=>{
    axios.post("http://localhost:8080/verify-token-exp",{token:token})
    .then(res => console.log(res))
    .catch(err => {
      localStorage.removeItem("token")
      navigate('/admin/login')
    })
  },[])

  return (
    <div>
      <Navbar email={email}/>
      <Sidebar email={email}/>
    </div>
  )
}

export default AdminDashboard