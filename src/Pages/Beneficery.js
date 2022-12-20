import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar'
import { Toast } from 'bootstrap';
const Beneficery = () => {
    let [id, setId] = useState('')
    let [name, setName] = useState('')
    let [beneficeryList, setBeneficeryList] = useState([])

    let addBeneficery = async (token) => {
        try {
            let res = await axios.post('http://localhost:3000/api/v1/User/createAlias', {
                'aliasID': id,
                'alias': name
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(res.data.msg)
            setBeneficeryList(res.data.data)
            console.log(res.data.data)
            toast(res.data.msg)
        }
        catch (e) {
            console.log(e)
            toast(e.response.data.msg)
        }
    }

    let getBeneficeries = async (token) => {
        try{
            let res = await axios.get('http://localhost:3000/api/v1/User/getAliases', {
                headers: { "Authorization": `Bearer ${token}` }
            })
            setBeneficeryList(res.data.data)
        }
        catch(e){
            toast(e.response.data.msg)
        }
    }
    useEffect(() => {
        getBeneficeries(localStorage.getItem('token').replace('"', '').replace('"', ''))
    }, [])
    return (
        <>
            <NavBar />
            <ToastContainer />
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' onChange={(e) => { setName(e.target.value) }} />
                <br />
                <label htmlFor="id">Id</label>
                <input type="text" id='id' onChange={(e) => { setId(e.target.value) }} />
                <br />
                <button onClick={() => { addBeneficery(
                    localStorage.getItem('token').replace('"', '').replace('"', '')) }}>Submit</button>
            </div>

            <div>
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Beneficery</th>
                            <th>Id</th>
                        </tr>
                    </thead>

                    <tbody>
                        {beneficeryList.map((beneficery) => {
                            return (
                                <tr key={beneficery.user2}>
                                    <td>{beneficery.alias}</td>
                                    <td>{beneficery.user2}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Beneficery