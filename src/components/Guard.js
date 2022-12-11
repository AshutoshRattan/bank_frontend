import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const RouteGuard = ({child, ...rest }) => {

    function hasJWT() {
        let flag = false;

        //check user has JWT token
        localStorage.getItem("token") ? flag = true : flag = false

        return flag
    }

    return (
        <Route {...rest} element={(props) => {
            hasJWT() ? <child {...props} /> : <Redirect to={{ pathname: '/login' }} />
        }}
        />
    );
};

export default RouteGuard;