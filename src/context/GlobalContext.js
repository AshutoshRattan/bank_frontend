import React, { useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    let [name, setName] = useState('nul')
    let [email, setEmail] = useState('nul')
    let [id, setId] = useState('')
    let [balance, setBalance] = useState(0)
    let [isLoggedIn, setLoggedIn] = useState(false)
    let [isAdmin, setAdmin] = useState(false)
    let [beneficiaryList, setBeneficiaryList] = useState([])

    let getBeneficeries = async (token) => {
        try {
            let res = await axios.get('http://localhost:3000/api/v1/User/getAliases', {
                headers: { "Authorization": `Bearer ${token}` }
            })
            setBeneficiaryList(res.data.data)
        }
        catch (e) {
            // toast(e.response.data.msg)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(!token) return
        let {exp, userId, role} = jwt_decode(token)
        if (exp < (Date.now() / 1000)) {
            localStorage.removeItem('token')
        }
        setLoggedIn(localStorage.getItem('token') ? true : false)
        setAdmin(role == 'admin' ? true : false)
        setId(userId)
    }, [])

    useEffect(() => {
        console.count("log")
        if (isLoggedIn == true) {
            console.count("logged In true")
            getBeneficeries(localStorage.getItem('token').replace('"', '').replace('"', ''))
        }
        else { // when i refresh i go here
        }
    }, [isLoggedIn])
    return (
        <AppContext.Provider
            value={{
                name,
                setName,
                email,
                setEmail,
                balance,
                setBalance,
                isLoggedIn,
                setLoggedIn,
                beneficiaryList,
                setBeneficiaryList,
                id,
                setId,
                isAdmin,
                setAdmin
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
