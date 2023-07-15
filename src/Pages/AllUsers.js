import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';

const AllTransactions = () => {
    let [query, setQuery] = useState('')
    let [users, setUsers] = useState([])
    let token = localStorage.getItem('token').replace('"', '').replace('"', '')
    let page = useRef(1)
    let max = useRef(10)
    let queryInput = useRef()

    let allUsers = async (token, page = 1, limit = 10) => {
        let params = { limit, page }
        if (query) {
            params.query = query
        }
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND + '/api/v1/Admin/users'}`, {
                headers: { "Authorization": `Bearer ${token}` },
                params
            })
            setUsers(res.data.list)
            max.current = Math.ceil(res.data.len / 10)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => { // when query changes and init render
        page.current = 1
        const getData = setTimeout(() => {
            allUsers(token, page = page.current)
        }, 500)
        return () => clearTimeout(getData)

    }, [query])

    let fetchNext = async (page) => {
        if (page.current >= max.current) return
        if (token == undefined) return
        page.current = page.current + 1
        allUsers(token, page = page.current)
    }

    let fetchPrev = async (page) => {
        if (page.current == 1) return // will expand
        if (token == undefined) return
        page.current = page.current - 1
        allUsers(token, page = page.current)
    }

    let copy = async (e) => {
        console.log(e.target.innerText)
        let ID = e.target.innerText // target.__reactFiber$tlhze9l0dff.sibling.alternate
        navigator.clipboard.writeText(ID);
        toast(`copied ${ID}`)

    }

    let clear = async () => {
        setQuery('')
        queryInput.current.value = ''
    }

    return (
        <>
            <NavBar />
            <ToastContainer />

            <div className="parent">

                <div id='login'>
                    <div className="evenly">
                        <label htmlFor="query">Query</label>
                        <input type="text" id="query" onChange={(e) => { setQuery(e.target.value) }} ref={queryInput} />
                    </div>
                    <br />
                    <button onClick={() => { clear() }}>clear</button>
                </div>

                <div id='login'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Id</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user._id}>
                                        <td onClick={(e) => { copy(e) }}>{user.name}</td>
                                        <td onClick={(e) => { copy(e) }}>{user.email}</td>
                                        <td onClick={(e) => { copy(e) }}>{user.role}</td>
                                        <td onClick={(e) => { copy(e) }}>{user._id}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div>
                        <button onClick={() => { fetchPrev(page) }}> {"<"} </button>
                        <p style={{ display: "inline" }}>{page.current} of {max.current}</p>
                        <button onClick={() => { fetchNext(page) }}> {">"} </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AllTransactions