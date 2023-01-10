import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar';
import jwt_decode from "jwt-decode"

const Home = () => {
    console.count("Test render no:")
    
    return (
        <>
        hello
        </>
    )
}

export default Home

