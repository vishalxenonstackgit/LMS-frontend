import React, { useState, useEffect } from 'react'
// import {useLocation } from 'react-router-dom'
import '../../css/reader_sidebar.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import Profile from '../admin/Profile'
import IssueRequests from '../admin/IssueRequests'
import MyLibrary from '../admin/MyLibrary'
import AddBook from '../admin/AddBook'
import RemoveBook from '../admin/RemoveBook'
import UpdateBook from '../admin/UpdateBook'

const Sidebar = (props) => {

    const email = props.email
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    const fetchData = async () => {
        await axios.post("http://localhost:8080/get-user-data", { email: email })
            .then(res => setUser(res.data.msg))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const [display, setDisplay] = useState({
        profile: false,
        add_book: false,
        remove_book: false,
        update_book: false,
        library: false,
        issue_requests: true
    })

    const handleClick = (e) => {
        setDisplay({
            profile: false,
            add_book: false,
            remove_book: false,
            update_book: false,
            library: false,
            issue_requests: false,
            [e.target.name]: true
        })
    }

    const handleLogOut = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        navigate('/admin/login')
     }

    return (
        <>
            <div className='resp-navbar-admin'>
                <button onClick={handleClick} name='profile'>Profile</button>
                <button onClick={handleClick} name='issue_requests'>Issue Requests</button>
                <button onClick={handleClick} name='add_book'>Add a Book</button>
                <button onClick={handleClick} name='remove_book'>Remove a Book</button>
                <button onClick={handleClick} name='update_book'>Update a Book</button>
                <button onClick={handleClick} name='library'>My Library</button>
                <button onClick={handleLogOut}>Logout</button>
            </div>
            <div id='reader_sidebar'>
                <div id='navbar'>
                    <button onClick={handleClick} name='profile'>Profile</button>
                    <button onClick={handleClick} name='issue_requests'>Issue Requests</button>
                    <button onClick={handleClick} name='add_book'>Add a Book</button>
                    <button onClick={handleClick} name='remove_book'>Remove a Book</button>
                    <button onClick={handleClick} name='update_book'>Update a Book</button>
                    <button onClick={handleClick} name='library'>My Library</button>
                    <button onClick={handleLogOut}>Logout</button>
                </div>
                <div id='content'>
                    {display.profile && <Profile user={user} />}
                    {display.issue_requests && <IssueRequests user={user} />}
                    {display.add_book && <AddBook user={user} />}
                    {display.remove_book && <RemoveBook />}
                    {display.update_book && <UpdateBook user={user} />}
                    {display.library && <MyLibrary user={user} />}
                </div>

            </div>
        </>

    )
}

export default Sidebar