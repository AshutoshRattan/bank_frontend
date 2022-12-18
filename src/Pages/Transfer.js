import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';

const Home = () => {
    let { name, setName, email, setEmail, setBalance, balance } = useGlobalContext()

    let [to, setTo] = useState('')
    let [amount, setAmount] = useState(0)
    
    let getBal = async (token) => {
        try {
            let res = await axios.get('http://localhost:3000/api/v1/Money/balance', {
                headers: { "Authorization": `Bearer ${token}` }
            })
            setBalance(res.data.bal)
        }
        catch (e) {
            console.log(e.response.data)
            // if (e.response.data == "Unauthorized"){
            //     localStorage.removeItem("token")
            //     return redirect("/login")
            // }
        }
    }

    let transfer = async (token) => {
        try {
            let res = await axios.post('http://localhost:3000/api/v1/Money/transfer', {
                'to': to,
                'amount': amount
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            })            
            toast('done')
            setBalance(res.data.bal)
        }
        catch (e) {
            toast(e.response.data.msg)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("token")
        if (token == undefined) return
        let decoded = jwt_decode(token)
        setName(decoded.name)
        setEmail(decoded.email)
        getBal(token.replace('"', '').replace('"', ''))


    }, [])
    return (
        <>
            <NavBar />
            <ToastContainer />
            <p>balance: {balance}</p>
            <label htmlFor="">to</label>
            <input type="text" onChange={(e) => { setTo(e.target.value) }} />
            <br />
            <label htmlFor="">amount</label>
            <input type="number" onChange={(e) => { setAmount(e.target.value) }} />
            <br />
            <button type="submit" onClick={() => {
                transfer(localStorage.getItem("token").replace('"', '').replace('"', ''))
            }}>transfer</button>
        </>

    )
}

export default Home