import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Profile = (props) => {

  const user = props.user

  return (
    <div style={{
      width: '100%',
      padding: '30px 10px 20px 50px'
    }}>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.contact_number}</p>
      <p><b>Account Type:</b> {user.role}</p>
      <p><b>Library ID:</b> {user.lib_id}</p>
    </div>
  )
}

export default Profile