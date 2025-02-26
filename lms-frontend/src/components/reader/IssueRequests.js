import React, { useEffect, useState } from 'react'
import '../../css/issue_requests.css'
import axios from 'axios'

const IssueRequests = (props) => {
    const user = props.user
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const fetchIssueRequests = async () => {
            await axios.post("http://localhost:8080/user-issue-requests", { reader_id: user.id })
                .then(res => setRequests(res.data.msg.reverse()))
                .catch(err => console.log(err))
        }

        fetchIssueRequests()
    }, [])
    return (
        <div id='issues'>
            <h2>My Issue Requests</h2>
            {requests.length>0 &&
                <table>
                    <thead>
                        <th>ReqID</th>
                        <th>ISBN</th>
                        <th>Request Date</th>
                        <th>Approval Date</th>
                        <th>Approver ID</th>
                        <th>Request Type</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            requests.map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.req_id}</td>
                                        <td>{v.book_id}</td>
                                        <td>{new Date(v.request_date).toLocaleDateString('en-GB')}</td>
                                        <td>{v.approval_date ? new Date(v.approval_date).toLocaleDateString('en-GB') : "-"}</td>
                                        <td>{v.approver_id ? v.approver_id : "-"}</td>
                                        <td>{v.request_type}</td>
                                        <td>{v.approval_date ? "Approved" : "Pending"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }
            {
                !requests.length && <p>There are no issue requests available</p>
            }

        </div>
    )
}

export default IssueRequests