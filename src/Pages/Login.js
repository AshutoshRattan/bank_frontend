import React, { useState, useEffect, useRef } from 'react'
import {Navigate, Link} from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';

const Home = () => {
    let {isLoggedIn, setLoggedIn} = useGlobalContext()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const submit = async () => {
        if (!validator.isEmail(email) || password == '') {
            toast('check email or password')
            return
        }

        try {
            let res = await axios.post('http://localhost:3000/api/v1/User/login', {
                'email': email,
                'password': password
            })
            // console.log(res)
            localStorage.setItem('token', JSON.stringify(res.data.JWT))
            setLoggedIn(true)
        }
        catch (e) {
            // console.log(e)
            toast(e.response.data.msg)
        }
    }
    return (
        <div>
            <ToastContainer />
            {isLoggedIn ? <Navigate to="/home"/> : null}
            <Link to='/signup'>signup</Link>
            <br />
            <label htmlFor="">Email</label>
            <input type="email" id='email' onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <label htmlFor="">Password</label>
            <input type="password" id='password' onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <button type="submit" onClick={submit}>Submit</button>
            <br />
            <Link to={"/forgotPassword"}>forgot password</Link>
        </div>
    )
}

export default Home