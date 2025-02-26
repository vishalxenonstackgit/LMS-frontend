import React from 'react'
import { useNavigate } from 'react-router-dom'
import img from '../assets/login.jpg'
import '../css/account_check.css'

const AccountCheck = () => {
    const navigate = useNavigate()
    return (
        <div id='account-check'>
            <div id='content'>
                <h1>Do you want to</h1>
                <button className='btn' onClick={() => navigate("/libraries")}>Create a new Reader Account</button>
                <p>or</p>
                <button className='btn' onClick={() => navigate("/reader/register",{state:false})}>Login to an existing Reader Account</button>
            </div>
            <div id='image'>
                <img src={img}></img>
            </div>
        </div>
    )
}

export default AccountCheck