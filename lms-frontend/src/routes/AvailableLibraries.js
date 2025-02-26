import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

const AvailableLibraries = () => {

    const navigate = useNavigate()

    const [library, setLibrary] = useState(null)
    const [libraries, setLibraries] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:8080/get-libraries")
            .then(res => setLibraries(res.data.libraries))
            .catch(err => console.log(err))
    }, [])

    const style = {
        border: "1px solid #8C489F",
        margin: "5px",
        padding: "12px 10px",
        color: "#8C489F",
        width: "100px",
        borderRadius: "5px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "25px",
    }

    const selectedStyle = {
        border: "1px solid #8C489F",
        margin: "5px",
        padding: "12px 10px",
        color: "#8C489F",
        width: "100px",
        borderRadius: "5px",
        textAlign: "center",
        cursor: "pointer",
        fontSize: "25px",
        boxShadow: "3px 3px 6px"
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/reader/register',{state:library})
     }

    return (
        <div style={{
            padding: "10px 30px"
        }}>
            <center><h1>Select any one Library</h1></center>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
            >
                {libraries && 
                    libraries.map((v, i) => {
                        return(
                        <div
                            key={i}
                            style={
                                library == v.id ? selectedStyle : style
                            }
                            onClick={(e) => {
                                setLibrary(v.id)
                            }}
                        >
                            <h4>{v.name}</h4>
                            <p><b>ID:</b>{v.id}</p>
                        </div>
                        )
                    })
                }
            </div>
            <center>
                <button
                    style={{
                        padding: "8px 20px",
                        margin: "20px",
                        border: "none",
                        backgroundColor: "#443266",
                        color: "white",
                        borderRadius: "4px",
                        cursor: "pointer"
                    }}
                    onClick={handleSubmit}
                >
                    Select
                </button>
            </center>

        </div>
    )
}

export default AvailableLibraries