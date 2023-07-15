import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';
import ClipLoader from "react-spinners/ClipLoader";

const Home = () => {
    let { name, setName, email, setEmail, setBalance, balance } = useGlobalContext()

    let [to, setTo] = useState('')
    let [amount, setAmount] = useState(0)

    const override = {
        display: "block",
        margin: "15% auto",
    };
    let [loading, setLoading] = useState('true');

    let getBal = async (token) => {
        try {
            setLoading('true')
            let res = await axios.get(`${process.env.REACT_APP_BACKEND + '/api/v1/Money/balance'}`, {
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
        setLoading(false)
    }

    let transfer = async (token) => {
        try {
            setLoading(true)
            let res = await axios.post(`${process.env.REACT_APP_BACKEND + '/api/v1/Money/transfer'}`, {
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
        setLoading(false)
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
            <div className="parent">

                {loading ? < ClipLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={150}
                /> :
                <div id='login'>
                    <h4>Current balance: {balance}</h4>
                    <div className="evenly">
                        <label htmlFor="">To</label>
                        <input type="text" onChange={(e) => { setTo(e.target.value) }} />
                    </div>
                    <br />
                    <div className="evenly">
                        <label htmlFor="">Amount</label>
                        <input type="number" onChange={(e) => { setAmount(e.target.value) }} />
                    </div>
                    <br />
                    <button type="submit" onClick={() => {
                        transfer(localStorage.getItem("token").replace('"', '').replace('"', ''))
                    }}>transfer</button>
                </div>}
            </div>
        </>

    )
}

export default Home