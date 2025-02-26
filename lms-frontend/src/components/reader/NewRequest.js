import axios from 'axios'
import React, { useState } from 'react'

const NewRequest = (props) => {
    const [isbn,setIsbn] = useState("")
    const user = props.user

    const handleIssueRequest = (e) => {
        e.preventDefault()
        if (isbn.length !== 13){
            alert("Enter valid ISBN No.")
        }else{
            const data = {
                isbn:parseInt(isbn),
                reader_id:user.id
            }
            axios.post("http://localhost:8080/create-issue-request",data)
            .then(res => alert(res.data.msg))
            .catch(err => alert(err.response.data.error))
        }
    }
    return (
        <div style={{ padding: "10px 10px 10px 50px" }}>
            <h2>Raise an Issue Request</h2>
            <form onSubmit={handleIssueRequest}>
                <input
                    style={{
                        padding:"10px"
                    }}
                    required
                    type='number'
                    name='isbn'
                    placeholder='ISBN Number'
                    onChange={(e)=>setIsbn(e.target.value)}></input>
                <button
                type='submit'
                    style={{
                        padding:"11px",
                        backgroundColor:"#443266",
                        color:"white",
                        fontSize:"small",
                        margin:"10px",
                        border:"none"
                    }}
                >
                    Raise Request
                </button>
            </form>
        </div>
    )
}

export default NewRequest