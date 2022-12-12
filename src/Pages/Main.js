import React from 'react';
import { Route, Navigate, Link } from "react-router-dom";

const Main = ({ children, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }

    return (hasJWT() ? <Navigate to='/home' /> : <Navigate to='/login' />
    );
};

export default Main;