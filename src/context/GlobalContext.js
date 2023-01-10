import React, { useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    let [name, setName] = useState('nul')
    let [email, setEmail] = useState('nul')
    let [id, setId] = useState('')
    let [balance, setBalance] = useState(0)
    // let [isLoggedIn, setLoggedIn] = useState(false)
    let [isAdmin, setAdmin] = useState(false)
    let [beneficiaryList, setBeneficiaryList] = useState([])

    let token = localStorage.getItem("token")
    console.count("GlobalContext render start no:")
    let getBeneficeries = async (token) => {
        try {
            console.log("benificery start")
            let res = await axios.get('http://localhost:3000/api/v1/User/getAliases', {
                headers: { "Authorization": `Bearer ${token}` }
            })
            setBeneficiaryList(res.data.data)
            console.log("benificery end")
        }
        catch (e) {
            // toast(e.response.data.msg)
        }
    }

    useEffect(() => {
        console.count("use effect start")
        if (token) {
            console.log("logged In true")
            let { exp, userId, role, name } = jwt_decode(token)
            if (exp < (Date.now() / 1000)) {
                localStorage.removeItem('token')
            }
            setName(name)
            setAdmin(role == 'admin' ? true : false)
            setId(userId)
            console.log(42)
            getBeneficeries(localStorage.getItem('token').replace('"', '').replace('"', ''))
            console.log(44)
            console.count("use effect end")
        }
        else {
            console.log("logged In false")
        }
    }, [localStorage.getItem("token")]) // will this work if i use a var here
    console.count("GlobalContext render end no:")
    return (
        <AppContext.Provider
            value={{
                name,
                setName,
                email,
                setEmail,
                balance,
                setBalance,
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
