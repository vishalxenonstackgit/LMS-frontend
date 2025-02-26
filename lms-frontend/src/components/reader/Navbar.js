import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Navbar = (props) => {
  const [user, setUser] = useState({})

  const fetchData = async () => {
    await axios.post("http://localhost:8080/get-user-data", { email: props.email })
      .then(res => setUser(res.data.msg))
      .catch(err => console.log(err))
  }

  useEffect(() => { fetchData() }, [])

  return (
    <div style={{
      backgroundColor: "#443266",
      padding: "3px",
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }}>
      <h2 style={{ marginLeft: "10px", color: "white" }}>Library Management</h2>
      <p style={{ color: "white" }} >Welcome: {user.name}</p>
    </div>
  )
}

export default Navbar