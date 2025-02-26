import React, { useState, useEffect } from 'react'
import axios from 'axios'

const IssuedBooks = (props) => {
    const user = props.user
    const [IssuedBooks, setIssuedBooks] = useState([])

    useEffect(() => {
        const fetchIssueRequests = async () => {
            await axios.post("http://localhost:8080/user-issued-books", { reader_id: user.id })
                .then(res => setIssuedBooks(res.data.msg.reverse()))
                .catch(err => console.log(err))
        }

        fetchIssueRequests()
    }, [user])

    const handleReturnRequest = (e,v) => {
        e.preventDefault()
        axios.post("http://localhost:8080/book-return-request",{request:v})
        .then(res => {
            alert(res.data.msg)
        })
        .catch(err => alert(err.response.data.error))
    }
    return (
        <div id='issues'>
            <h2>My Issued Books</h2>
            {IssuedBooks.length > 0 &&
                <table>
                    <thead>
                        <th>IssueID</th>
                        <th>ISBN</th>
                        <th>Issue Date</th>
                        <th>Approver ID</th>
                        <th>Status</th>
                        <th>Expected Return Date</th>
                        <th>Return Date</th>
                        <th>Return Approver ID</th>
                        <th>Return here</th>
                    </thead>
                    <tbody>
                        {
                            IssuedBooks.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.issue_id}</td>
                                        <td>{v.isbn}</td>
                                        <td>{new Date(v.issue_date).toLocaleDateString('en-GB')}</td>
                                        <td>{v.issue_approver_id}</td>
                                        <td>{v.issue_status}</td>
                                        <td>{new Date(v.expected_return_date).toLocaleDateString('en-GB')}</td>
                                        <td>{v.return_date? new Date(v.return_date).toLocaleDateString('en-GB') : "-"}</td>
                                        <td>{v.return_approver_id? v.return_approver_id : "-"}</td>
                                        <td>{!v.return_date?<button id='accept' onClick={(e)=>handleReturnRequest(e,v)}>return</button>:"Returned"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            {
                !IssuedBooks.length && <p>There are no issued books yet</p>
            }

        </div>
    )
}

export default IssuedBooks