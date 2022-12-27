import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar'
import { Toast } from 'bootstrap';

const AllTransactions = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [id, setId] = useState('')
    let [transaction, setTransactions] = useState([])
    let token = localStorage.getItem('token').replace('"', '').replace('"', '')
    let page = useRef(1)
    let max = useRef(10)

    let allTransactions = async (token, limit = 10, page = 1) => {
        let params = { limit, page }
        if (name != '') {
            params.name = name
        }
        if (email != '') {
            if (!validator.isEmail(email)) {
                toast("please type correct email")
                return
            }
            params.email = email
        }
        if (id != '') {
            params.id = id
        }
        try {
            let res = await axios.get("http://localhost:3000/api/v1/Admin/transactions", {
                // Money/transactions
                headers: { "Authorization": `Bearer ${token}` },
                params
            })
            setTransactions(res.data.his)
            max.current = Math.ceil(res.data.len / 10)
        }
        catch (e) {

        }
    }

    useEffect(() => {
        allTransactions()
    }, [])

    useEffect(() => { // when query changes
        console.log("change")
        page.current = 1
        const getData = setTimeout(() => {
            allTransactions(token, page.current)
        }, 1000)
        return () => clearTimeout(getData)

    }, [name, email, id])

    let fetchNext = async (page) => {
        if (page.current >= max.current) return
        console.log(page.current, max.current)
        if (token == undefined) return
        page.current = page.current + 1
        allTransactions(token, page.current)
    }

    let fetchPrev = async (page) => {
        if (page.current == 1) return // will expand
        if (token == undefined) return
        console.log("here")
        page.current = page.current - 1
        allTransactions(token, page.current)
    }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="parent" style={{ 'height': '50vh' }}>

                <div>
                    <label htmlFor="name">name</label>
                    <input type="text" id="name" onChange={(e) => { setName(e.target.value) }} />
                    <br />
                    <label htmlFor="email">email</label>
                    <input type="text" id="email" onChange={(e) => { setEmail(e.target.value) }} />
                    <br />
                    <label htmlFor="id">id</label>
                    <input type="text" id="id" onChange={(e) => { setId(e.target.value) }} />
                </div>

                <div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>From</th>
                                <th>To</th>
                                <th>Amount</th>
                                <th>Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transaction.map((transaction) => {
                                return (
                                    <tr key={transaction.createdAt}>
                                        <td>{transaction.from}</td>
                                        <td>{transaction.to}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.createdAt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <button onClick={() => { fetchPrev(page) }}> {"<"} </button>
                    <p style={{ display: "inline" }}>{page.current} of {max.current}</p>
                    <button onClick={() => { fetchNext(page) }}> {">"} </button>
                </div>
            </div>
        </>
    )
}

export default AllTransactions