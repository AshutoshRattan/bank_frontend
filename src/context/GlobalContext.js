import React, { useState, useContext, useEffect } from 'react';
import jwt_decode from "jwt-decode"
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    
    let [getName, setName] = useState('nul')
    let [getEmail, setEmail] = useState('nul')
    let [getBalance, setBalance] = useState(0)
    // let [isLoggedIn, setloggedIn] = useState(false)

    return (
        <AppContext.Provider
            value={{
                getName,
                setName,
                getEmail,
                setEmail,
                getBalance,
                setBalance,
                // isLoggedIn,
                // setloggedIn
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
