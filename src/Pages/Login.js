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


const Home = () => {
    let { setAdmin } = useGlobalContext()
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const override = {
        display: "block",
        margin: "15% auto",
    };
    let [loading, setLoading] = useState(false);

    const submit = async () => {
        setLoading(true)
        if (!validator.isEmail(email) || password == '') {
            toast('check email or password')
            return
        }

        try {
            let res = await axios.post(`${process.env.REACT_APP_BACKEND + '/api/v1/User/login'}`, {
                'email': email,
                'password': password
            })
            console.log(`${process.env.REACT_APP_BACKEND + '/api/v1/User/login'}`)
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
        <div>
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
                <div>
                    {localStorage.getItem("token") ? <Navigate to="/home" /> : null}

                    <div id='login'>
                        <div className='evenly'>
                            <label htmlFor="">Email</label>
                            <input type="email" id='email' onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <br />

                        <div className='evenly'>
                            <label htmlFor="">Password</label>
                            <input type="password" id='password' onChange={(e) => { setPassword(e.target.value) }} />
                        </div>
                        <br />
                        <div className='evenly'>
                            <button type="submit" onClick={submit}>Submit</button>
                            {/* <br /> */}
                                <Link to={"/forgotPassword"} style={{
                                    paddingLeft: '10px', color:"black",
                                    "text-decoration": "none"}}>forgot password</Link>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Home