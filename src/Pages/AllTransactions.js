import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar'
import { Toast } from 'bootstrap';
import ClipLoader from "react-spinners/ClipLoader";

const AllTransactions = () => {
    let [id, setId] = useState('')
    let [transaction, setTransactions] = useState([])
    let token = localStorage.getItem('token').replace('"', '').replace('"', '')
    let page = useRef(1)
    let max = useRef(10)
    let idInput = useRef()

    const override = {
        display: "block",
        margin: "15% auto",
    };
    let [loading, setLoading] = useState('true')

    let allTransactions = async (token, page = 1, limit = 10) => {
        setLoading(true)
        let params = { limit, page }
        if (id != '' && id.match(/^[0-9a-fA-F]{24}$/)) {
            params.id = id
        }
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND + '/api/v1/Admin/transactions'}`, {
                // Money/transactions
                headers: { "Authorization": `Bearer ${token}` },
                params
            })
            setTransactions(res.data.his)
            max.current = Math.ceil(res.data.len / 10)
        }
        catch (e) {
            console.log(e)
        }
        setLoading(false)
    }


    useEffect(() => { // when query changes and init render
        page.current = 1
        const getData = setTimeout(() => {
            allTransactions(token, page = page.current)
        }, 500)
        return () => clearTimeout(getData)

    }, [id])

    let fetchNext = async (page) => {
        if (page.current >= max.current) return
        if (token == undefined) return
        page.current = page.current + 1
        allTransactions(token, page = page.current)
    }

    let fetchPrev = async (page) => {
        if (page.current == 1) return // will expand
        if (token == undefined) return
        page.current = page.current - 1
        allTransactions(token, page = page.current)
    }

    let copy = async (e) => {
        console.log(e.target.innerText)
        let ID = e.target.innerText // target.__reactFiber$tlhze9l0dff.sibling.alternate
        navigator.clipboard.writeText(ID);
        toast(`copied ${ID}`)

    }

    let clear = async () => {
        setId('')
        idInput.current.value = ''
        console.log(idInput)
    }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="parent">

                {loading ? < ClipLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={150}
                />  :

                <div id='login'>
                    <div className="evenly">
                        <label htmlFor="id">id</label>
                        <input type="text" id="id" onChange={(e) => { setId(e.target.value) }} ref={idInput} />
                    </div>
                    <br />
                    <button onClick={() => { clear() }} style={{ 'margin-left': "14px", "margin-top": '5px' }}>clear</button>
                </div>
                &&
                <div id='login'>
                    <table >
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
                                        <td onClick={(e) => { copy(e) }}>{transaction.from}</td>
                                        <td onClick={(e) => { copy(e) }}>{transaction.to}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.createdAt}</td>
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
                }
            </div>
        </>
    )
}

export default AllTransactions