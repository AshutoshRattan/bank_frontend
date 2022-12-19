import React, { useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    
    let [name, setName] = useState('nul')
    let [email, setEmail] = useState('nul')
    let [balance, setBalance] = useState(0)
    let [isLoggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(!token) return
        let {exp} = jwt_decode(token)
        if (exp < Date.now()){
            localStorage.removeItem('token')
        }
        setLoggedIn(localStorage.getItem('token') ? true : false)
    },
    [])
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
                setLoggedIn
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
