import React, { useEffect, useState } from 'react'
import '../../css/issue_requests.css'
import axios from 'axios'

const IssueRequests = (props) => {
    const user = props.user
    const [requests, setRequests] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        const fetchIssueRequests = async () => {
            await axios.post("http://localhost:8080/get-request-events", { lib_id: user.lib_id })
                .then(res => setRequests(res.data.msg.reverse()))
                .catch(err => console.log(err))
        }

        fetchIssueRequests()
    }, [user, reload])

    const handleAcceptRequest = (e, v) => {
        e.preventDefault()
        if (v.request_type == "issue") {
            axios.post("http://localhost:8080/accept-issue-request", {
                request: v,
                admin_id: user.id
            })
                .then(res => {
                    alert(res.data.msg)
                    setReload(!reload)
                })
                .catch(err => console.log(err.response.data.error))
        } else {
            axios.post("http://localhost:8080/accept-return-request", {
                request: v,
                admin_id: user.id
            })
                .then(res => {
                    alert(res.data.msg)
                    setReload(!reload)
                })
                .catch(err => console.log(err))
        }

    }

    const handleRejectRequest = (e, v) => {
        e.preventDefault()
        axios.post("http://localhost:8080/reject-issue-request", { req_id: v.req_id })
            .then(res => {
                alert(res.data.msg)
                setReload(!reload)
            })
            .catch(err => console.log(err.response.data.error))
    }

    return (
        <div id='issues'>
            <h2>Available Issue Requests</h2>
            {
                requests.length > 0 && <table>
                    <thead>
                        <th>ReqID</th>
                        <th>Book ISBN</th>
                        <th>Request Date</th>
                        <th>Request Type</th>
                        <th>Status</th>
                    </thead>
                    <tbody>
                        {
                            requests.reverse().map((v, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{v.req_id}</td>
                                        <td>{v.book_id}</td>
                                        <td>{new Date(v.request_date).toLocaleDateString()}</td>
                                        <td>{v.request_type}</td>
                                        <td>

                                            {v.approver_id ?
                                                "Reviewed" : <>
                                                    <button id='accept' onClick={(e) => handleAcceptRequest(e, v)}>Accept</button>
                                                    {v.request_type == "issue" && <button id='reject' onClick={(e) => handleRejectRequest(e, v)}>Reject</button>}
                                                </>}
                                        </td>
                                    </tr>
                                )
                            }, [])
                        }
                        {
                            requests.length == 0 && <center><p>There are currently no issue requests</p></center>
                        }
                    </tbody>
                </table>
            }

        </div>
    )
}

export default IssueRequests