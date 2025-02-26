import React, { useEffect, useState } from 'react'
import Navbar from '../components/admin/Navbar'
import bin from '../assets/bin.png'
import '../css/owner_dashboard.css'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const OwnerDashboard = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const email = location.state

    const [mylibrary, setMylibrary] = useState()
    const [adminForm, setAdminForm] = useState(false)
    const [admins, setAdmins] = useState()

    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
        axios.post("http://localhost:8080/verify-token-exp", { token: token })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                localStorage.removeItem("token")
                navigate('/owner/register')
            })
    }, [])

    const [admin, setAdmin] = useState({
        name: "",
        email: "",
        contact_number: "",
        role: "admin",
        lib_id: null
    })

    const getOwnerLibrary = () => {
        axios.post("http://localhost:8080/get-owner-library", { email })
            .then(res => setMylibrary(res.data.msg))
            .catch(err => console.log(err.response.data.error))
    }

    const getLibraryAdmins = () => {
        axios.post("http://localhost:8080/get-library-admins", mylibrary)
            .then(res => setAdmins(res.data.msg))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOwnerLibrary()
    }, [])

    useEffect(() => {
        getLibraryAdmins()
        if (mylibrary) setAdmin({
            ...admin,
            lib_id: mylibrary.id
        })
    }, [mylibrary])


    const handleFormChange = (e) => {
        e.preventDefault()
        setAdmin({
            ...admin,
            [e.target.name]: e.target.value
        })
    }

    const handleAddAdmin = (e) => {
        e.preventDefault()
        if (admin.contact_number.length !== 10) {
            return alert("Please enter valid phone number")
        }

        axios.post("http://localhost:8080/create-admin", admin)
            .then(res => {
                alert(res.data.msg)
                setAdminForm(!adminForm)
                getLibraryAdmins()
            })
            .catch(err => alert(err.response.data.error))

    }

    const deleteAdmin = (e, v) => {
        e.preventDefault()
        axios.post("http://localhost:8080/delete-admin", v)
            .then(res => {
                alert(res.data.msg)
                getLibraryAdmins()
            })
            .catch(err => console.log(err))
    }

    const handleLogout = () => {
            localStorage.removeItem("token")
            navigate('/owner/register')
       
    }

    return (
        <div id='owner-dashboard'>
            <Navbar />
            <button id='logout' onClick={handleLogout}>Logout</button>
            <center>
                <h1>Welcome Owner</h1>
                <p>Here is your Your Library</p>
                {
                    mylibrary && <div id='library'>
                        <h2>{mylibrary.name}</h2>
                        <p>ID:{mylibrary.id}</p>
                    </div>
                }

            </center>
            <div id='my-admins'>
                <h3>My Admins</h3>
                <button id='add-admin' onClick={() => setAdminForm(!adminForm)}>{adminForm ? "X" : "Add Admin"}</button>
            </div>
            {
                adminForm &&
                <div id='add-admin-form'>
                    <form onSubmit={handleAddAdmin}>
                        <input type='text' id='name' name='name' className='signup-fields' placeholder='Admin Full Name' onChange={handleFormChange} required></input>
                        <br />
                        <input type='email' id='email' name='email' className='signup-fields' placeholder='Admin Email' onChange={handleFormChange} required></input>
                        <br />
                        <input type='number' id='number' name='contact_number' className='signup-fields' placeholder='Admin Mobile' onChange={handleFormChange} required></input>
                        <br />
                        <button type='submit' className='btn'>Create</button>
                        <br />
                    </form>
                </div>
            }

            <center>
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Remove admin</th>
                    </thead>
                    <tbody>
                        {
                            admins && admins.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.id}</td>
                                        <td>{v.name}</td>
                                        <td>{v.email}</td>
                                        <td>{v.contact_number}</td>
                                        <td><button onClick={(e) => deleteAdmin(e, v)}><img src={bin} width={20} alt='X'></img></button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </center>


        </div>
    )
}

export default OwnerDashboard