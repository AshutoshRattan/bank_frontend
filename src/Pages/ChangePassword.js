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
    

    return (
        <>
        <NavBar />
        <h1>change password</h1>
        </>
    )
}

export default ForgotPassword