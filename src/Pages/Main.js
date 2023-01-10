import React from 'react';
import { Route, Navigate, Link } from "react-router-dom";
import { useGlobalContext } from '../context/GlobalContext';

const Main = ({ children, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }

    return ( localStorage.getItem("token") ? <Navigate to='/home' /> : <Navigate to='/login' />
    );
};

export default Main;