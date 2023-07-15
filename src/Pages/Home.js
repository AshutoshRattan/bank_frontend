import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import ClipLoader from "react-spinners/ClipLoader";

import { useGlobalContext } from '../context/GlobalContext';

const Home = () => {
    let { name, setName, email, setEmail, setBalance, balance } = useGlobalContext()
    
    const override = {
        display: "block",
        margin: "15% auto",
    };
    let [loading, setLoading] = useState('true');

    let getBal = async (token) => {
        try {
            setLoading(true)
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
                {loading ? 
                <ClipLoader
                    color="#36d7b7"
                    loading={loading}
                    cssOverride={override}
                    size={150}
                /> 
                :
                <div id="login">
                    <h1>welcome back {name}</h1>
                    <h5>your balance is {balance}</h5>
                </div>
            }
            </div>
        </>
    )
}

export default Home