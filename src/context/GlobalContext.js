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
        let {exp, userId} = jwt_decode(token)
        if (exp > Date.now()){
            console.log(exp < Date.now())
            localStorage.removeItem('token')
        }
        setLoggedIn(localStorage.getItem('token') ? true : false)
        setId(userId)
    },
    [])

    useEffect(() => {
        if(isLoggedIn){
            getBeneficeries(localStorage.getItem('token').replace('"', '').replace('"', ''))
        }
        else{
            setBeneficiaryList([])
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
                setId
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
