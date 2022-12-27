import React from 'react';
import { Route, Navigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode"

const Guard = ({ children, ...rest }) => {

    function hasJWT() {
        let flag = false;
        let token = localStorage.getItem("token")
        if(!token) return
        token = jwt_decode(token)
        console.log(token, token.role)
        if (token && token.role && token.role == 'admin') {
            flag = true
        }

        return flag
    }

    return (hasJWT() ? children : <Navigate to='/login' />
    );
};

export default Guard;