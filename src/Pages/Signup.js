import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar';
import jwt_decode from "jwt-decode"
import ClipLoader from "react-spinners/ClipLoader";


const Signup = () => {
    let { setAdmin } = useGlobalContext()
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const override = {
        display: "block",
        margin: "15% auto",
    };
    let [loading, setLoading] = useState(false);

    const submit = async () => {
        if (name == '' || !validator.isEmail(email) || password == '') {
            toast('check name, email or password')
            return
        }

        try {
            setLoading(true)
            let res = await axios.post(`${process.env.REACT_APP_BACKEND + '/api/v1/User/createAccount'}`, {
                'name': name,
                'email': email,
                'password': password
            })
            // console.log(res)
            localStorage.setItem('token', JSON.stringify(res.data.JWT))
            let { role } = jwt_decode(res.data.JWT)
            setAdmin(role == 'admin' ? true : false)
        }
        catch (e) {
            // console.log(e)
            toast(e.response.data.msg)
        }
        setLoading(false)
    }

    return (
        <>
            <NavBar />
            <ToastContainer />

            <div className='parent'>
                {loading ?
                    <ClipLoader
                        color="#36d7b7"
                        loading={loading}
                        cssOverride={override}
                        size={150}
                    />
                    :
                <div id='login'>
                    <div className="evenly">
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' onChange={(e) => { setName(e.target.value) }} />

                    </div>
                    <br />
                    <div className="evenly">
                        <label htmlFor="email">Email</label>
                        <input type="email" id='email' onChange={(e) => { setEmail(e.target.value) }} />

                    </div>
                    <br />
                    <div className="evenly">
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' onChange={(e) => { setPassword(e.target.value) }} />

                    </div>
                    {localStorage.getItem("token") ? <Navigate to="/home" /> : null}
                    <br />
                    <button type="submit" onClick={submit}>Submit</button>
                </div>}
            </div>
        </>
    )
}

export default Signup