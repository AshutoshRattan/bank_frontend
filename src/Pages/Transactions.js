import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';

const Transactions = () => {
    let { beneficiaryList, id, name, setBeneficiaryList } = useGlobalContext()
    let [recentTransactions, setRecentTransactions] = useState([])
    let page = useRef(1)
    let limit = useRef(10)
    let max = useRef(0)

    console.count("Transactions render no:")

    let checkIfBeneficiary = (beneficiaryList, data) => {
        let temp = data
        console.log(beneficiaryList)
        temp.forEach(obj => {
            beneficiaryList.forEach(obj2 => {
                if (obj.to == obj2.user2) {
                    obj.to = obj2.alias
                }
                if (obj.to == id) {
                    obj.to = name
                }
                if (obj.from == obj2.user2) {
                    obj.from = obj2.alias
                }
                if (obj.from == id) {
                    obj.from = name
                }
            })
        })
        setRecentTransactions(temp)
    }

    let fetchTransactions = async (token, page = 1, limit = 10) => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND + '/api/v1/Money/transactions'}`, {
                headers: { "Authorization": `Bearer ${token}` },
                params: { limit, page }
            })
            checkIfBeneficiary(beneficiaryList, res.data.his)
            setRecentTransactions(res.data.his)
            max.current = Math.ceil(res.data.len / 10)
        }
        catch (e) {
            toast(e.response.data)
        }
    }
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token == undefined) return
        fetchTransactions(token.replace('"', '').replace('"', ''))
        // let limit = 10
        // let page = 1 
    }, [])

    let fetchNext = async (page) => {
        if (page.current >= max.current) return
        console.log(page.current, max.current)
        let token = localStorage.getItem("token")
        if (token == undefined) return
        page.current = page.current + 1
        fetchTransactions(token.replace('"', '').replace('"', ''), page.current)
    }

    let fetchPrev = async (page) => {
        if (page.current == 1) return // will expand
        console.log("in fetchprev")
        let token = localStorage.getItem("token")
        if (token == undefined) return
        page.current = page.current - 1
        fetchTransactions(token.replace('"', '').replace('"', ''), page.current)
    }
    return (
        <>
            <NavBar />
            <ToastContainer />
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
                    {recentTransactions.map((transaction) => {
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
        </>

    )
}

export default Transactions