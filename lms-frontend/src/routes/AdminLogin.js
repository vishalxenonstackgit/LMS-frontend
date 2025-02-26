import React, { useState } from 'react'
import img from '../assets/login.jpg'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import '../css/admin_login.css'

const AdminLogin = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/login/admin", { email })
            .then(res => {
                localStorage.setItem("token",res.data.token)
                navigate("/admin/dashboard", { state: email })
            })
            .catch(err => alert(err.response.data.error))
    }
    return (
        <div id='admin-login'>
            <div id='content'>
                    <h1>Library Management System</h1>
                    <p>Login to your admin dashboard</p>
                    <form onSubmit={handleLogin}>
                        <input type='email' className='signup-fields' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required></input>
                        <br/>
                        <button type='submit' className='btn'>login</button>
                    </form>

                </div>
                <div id='image'>
                    <img src={img}></img>
                </div>
        </div>
    )
}

export default AdminLogin