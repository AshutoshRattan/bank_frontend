import React from 'react';
import {Route, Navigate, Link } from "react-router-dom";

const Guard = ({children, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }

    return ( hasJWT() ? children : <Navigate to='/login' /> 
    );
};

export default Guard;