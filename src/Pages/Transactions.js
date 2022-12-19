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
    let { } = useGlobalContext()
    let [recentTransactions, setRecentTransactions] = useState([]) 

    let fetchTransactions = async (token) => {
        try{
            let res = await axios.get('http://localhost:3000/api/v1/Money/transactions', {
                headers: { "Authorization": `Bearer ${token}` },
                params: {limit: 10, page: 1}
            })
            setRecentTransactions(res.data.his)
        }
        catch(e){
            toast(e.response.data)
        }
    }
    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token == undefined) return
        fetchTransactions(token.replace('"', '').replace('"', ''))

    }, [])
    return (
        <>
            <NavBar />
            <ToastContainer />
            <table style={{width:"100%"}}>
                <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Amount</th>
                    <th>Time</th>
                </tr>
                </thead>

                {recentTransactions.map((transaction) => {
                    return(
                        <tr>
                            <td>{transaction.from}</td>
                            <td>{transaction.to}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.createdAt}</td>
                        </tr>
                    )
                })}
            </table>
        </>

    )
}

export default Transactions