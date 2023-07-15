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

    let getBal = async (token) => {
        try {
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
            <div className="parent">
                <div>
                    <h1>welcome back {name}</h1>
                    <p>your balance is {balance}</p>
                </div>
                {/* <Link to={'/test'}>click</Link> */}
            </div>
        </>
    )
}

export default Home