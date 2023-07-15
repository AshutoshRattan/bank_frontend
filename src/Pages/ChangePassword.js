import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, redirect, useNavigate } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import jwt_decode from "jwt-decode"
import NavBar from '../components/NavBar'
import { useGlobalContext } from '../context/GlobalContext';

const ChangePassword = (token) => {
    let navigate = useNavigate()
    let [password, setPassword] = useState('')
    let [newPassword, setNewPassword] = useState('')

    let changePassword = async (token) => {
        try {
            let res = await axios.post(`${process.env.REACT_APP_BACKEND + '/api/v1/User/changePassword'}`, {
                password,
                newPassword
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            toast("password resetted")

            setTimeout(() => {
                localStorage.removeItem('token')
                navigate("/login")

            }, 2000)
        }
        catch (e) {
            toast(e.response.data.msg)
        }
    }

    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="parent">
                <div id='login'>
                    <div className="evenly">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <br />
                    <div className="evenly">
                        <label htmlFor="newPassword">New Password</label>
                        <input type="password" id='newPassword' onChange={(e) => { setNewPassword(e.target.value) }} />
                    </div>
                    <br />
                    
                    <button onClick={() => { changePassword(localStorage.getItem("token").replace('"', '').replace('"', '')) }}>Submit</button>
                </div>
            </div>
        </>
    )
}

export default ChangePassword