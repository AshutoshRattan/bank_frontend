import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link, useNavigate } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useGlobalContext } from '../context/GlobalContext';


const NavBar = () => {
    let navigate = useNavigate()
    let name = "ashutosh"
    let { isAdmin, setAdmin } = useGlobalContext()
    let logOut = () => {
        console.log("logged out")
        localStorage.removeItem('token')
        setAdmin(false)
        navigate("/login")
    }
    return (
        <Navbar bg="primary" variant='dark' expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
                {localStorage.getItem("token") ?
                    <Nav className="ms-left">
                        <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/transactions">Transactions</Nav.Link>
                        <Nav.Link as={Link} to="/transfer">Transfer</Nav.Link>
                        <Nav.Link as={Link} to="/beneficiary">Beneficiary</Nav.Link>
                    </Nav>
                    : null
                }
                <Nav className="ms-auto me-2">
                    {isAdmin ?
                    <>
                            <NavDropdown title="Admin" id="navbarScrollingDropdown" className='me-3'>
                                <NavDropdown.Item as={Link} to="/admin/transactions">All Transactions</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/admin/users">All Users</NavDropdown.Item>
                            </NavDropdown>
                    </>
                    :
                    null
                }

                    {localStorage.getItem("token") ?
                        <>
                            <NavDropdown title="Settings" id="navbarScrollingDropdown" className='me-3'>
                                <NavDropdown.Item as={Link} to="/changePassword">Change Password</NavDropdown.Item>
                            </NavDropdown>
                            <Navbar.Text onClick={() => { logOut() }}>Logout</Navbar.Text>
                        </>
                        :
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;