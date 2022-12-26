import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect, useNavigate } from "react-router-dom";
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
    let navigate = useNavigate()

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
            toast(e.response.data.msg)
        }
    }

    let resetPassword = async () => {
        if(!validator.isNumeric(OTP) || OTP.length != 6){
            toast("please check your OTP")
            return
        }
        if(password == ""){
            toast("please check your password")
            return
        }

        try{
            let res = await axios.post('http://localhost:3000/api/v1/User/forgotPassword', 
            {
                "email": email,
                "OTP": OTP,
                "password": password
            })
            // setMailSent(true)
            toast("password sucessfully resetted")
            setTimeout(() => {
                navigate('/login')
            }, 5000)
        }
        catch(e){
            toast(e.response.data.msg)
            setTimeout(() => {
                setMailSent(false)                
            }, 2000)
            console.log(e)
        }
    }

    return (
        <>
            <NavBar />
            <ToastContainer/>
            {!isMailSent && <>
                <label htmlFor="email">email</label>
                <input type="text" id="email"  onChange={(e) =>{setEmail(e.target.value)}}/>
                <br />
                <button onClick={() => {sendOTP()}}>Send</button>

            </>
            }
            {isMailSent && <>
                <label htmlFor="otp">OTP</label>
                <input type="text" id="otp" onChange={(e) => { setOTP (e.target.value) }} />
                <br />
                <label htmlFor="password">password</label>
                <input type="text" id="password" onChange={(e) => { setPassword(e.target.value) }} />
                <br />
                <button onClick={() => {resetPassword()}}>Send</button>
            </>
            }
        </>
    )
}

export default ForgotPassword