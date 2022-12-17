import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import NavBar from '../components/NavBar'

const Home = () => {

    return (
        <>
            <NavBar />
            <div>
                <h1>helloo</h1>
            </div>
        </>
    )
}

export default Home