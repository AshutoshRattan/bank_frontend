import React from 'react';
import { Route, Navigate, Link } from "react-router-dom";

const Guard = ({ children, ...rest }) => {

    function hasJWT() {
        let flag = false;
        let token = localStorage.getItem("token")
        if (token && token.role == 'admin') {
            flag = true
        }

        return flag
    }

    return (hasJWT() ? children : <Navigate to='/login' />
    );
};

export default Guard;