import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavBar = () => {
    let name = "ashutosh"
    return (
        <Navbar bg="primary" variant='dark' expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className="ms-left">
                    <Nav.Link href="./Home">Home</Nav.Link>
                    <Nav.Link href="./transactions">Transactions</Nav.Link>
                    <Nav.Link href="./transfer">Transfer</Nav.Link>
                </Nav>

                <Nav className="ms-auto">
                    <Navbar.Text>Logout</Navbar.Text>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;