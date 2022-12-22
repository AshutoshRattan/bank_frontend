import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';

const ForgotPassword = () => {
    let [isMailSent, setMailSent] = useState(false)
    let [didPasswordReset, setPasswordReset] = useState(false)
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [OTP, setOTP] = useState('')

    let sendOTP = async () =>{
        if (!validator.isEmail(email)){
            toast("please type correct email")
            return
        }
        try{
            let res = await axios.post('http://localhost:3000/api/v1/User/forgotPasswordOTP', {
                "email": email 
            })
            setMailSent(true)
            toast(res.data.msg)
        }
        catch(e){
            toast(e.respomse.data.msg)
        }
    }

    return (
        <>
            <ToastContainer/>
            {(!isMailSent && !didPasswordReset) && <>
                <label htmlFor="email">email</label>
                <input type="text" id="email"  onChange={(e) =>{setEmail(e.target.value)}}/>
                <br />
                <button onClick={() => {sendOTP()}}>Send</button>

            </>
            }
            {(isMailSent && !didPasswordReset) && <>
                <h1>mail sent</h1>
                <h2>password not resetted</h2>
            </>
            }
            {(isMailSent && didPasswordReset) && <>
                <h1>mail sent</h1>
                <h2>password resetted</h2>
            </>
            }
        </>
    )
}

export default ForgotPassword