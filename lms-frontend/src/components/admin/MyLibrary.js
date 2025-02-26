import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../css/books.css'

const MyLibrary = (props) => {

    const user = props.user
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.post("http://localhost:8080/get-library-books", { lib_id: user.lib_id })
            .then(res => setBooks(res.data.books))
            .catch(err => console.log(err))
    }, [])

    const handleBookSearch = () => { }

    return (
        <div id='books'>
            <div id='header'>
                <h1>My Library</h1>
                <br />
                <form onSubmit={handleBookSearch}>
                    <input id='search' required placeholder='Title, Author or Publisher' type='text'></input>
                    <button type='submit' id='btn'>search</button>
                </form>
            </div>
            <br />
            <div id='grid'>
                {
                    books && books.map((v, i) => {
                        return (
                            <div id='book' key={i}>
                                <div
                                    style={v.available_copies ? { backgroundColor: "rgb(159, 202, 94)" } : { backgroundColor: "rgb(226, 90, 86)" }}
                                    className='status'
                                >
                                    {v.available_copies ? "Available" : "Not Available"}
                                </div>
                                <h2>{v.title}</h2>
                                <p><b>ISBN NO:</b> {v.isbn} <i
                                    style={{ fontSize: "25px", fontWeight: "bold", cursor: "pointer" }}
                                    onClick={() => navigator.clipboard.writeText(v.isbn)}
                                >&#x2398;</i></p>
                                <p><b>Authors:</b> {v.authors}</p>
                                <p><b>Publisher:</b> {v.publisher}</p>
                                <p><b>Total Copies:</b> {v.total_copies} </p>
                                <p><b>Available Copies:</b> {v.available_copies} </p>
                                <p><b>Version:</b> {v.version} </p>
                            </div>
                        )
                    })
                }
                {
                    !books.length && <center><p>There are no books yet</p></center>
                }
            </div>
        </div>
    )
}

export default MyLibrary