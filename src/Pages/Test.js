import React, { useState, useEffect, useRef, CSSProperties } from 'react'
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
    console.count("Test render no:")
    let [color, setColor] = useState("#ffffff");
    let [loading, setLoading] = useState(true)
    const override = {
        display: "block",
        margin: "15% auto",
    };
    
    return (
        <>
            <ClipLoader
                color="#36d7b7"
                loading={loading}
                cssOverride={override}
                size={150}
            />
        </>
    )
}

export default Home

