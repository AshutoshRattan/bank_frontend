import React, { useState, useEffect, useRef } from 'react'
import { Navigate, Link } from "react-router-dom";
import validator from 'validator'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useGlobalContext } from '../context/GlobalContext';
import NavBar from '../components/NavBar'
import { Toast } from 'bootstrap';

const Beneficiary = () => {
    let { beneficiaryList, setBeneficiaryList } = useGlobalContext()
    let [id, setId] = useState('')
    let [name, setName] = useState('')
    // let [beneficiaryList, setBeneficiaryList] = useState([])

    let addBeneficiary = async (token) => {
        try {
            let res = await axios.post(`${process.env.BACKEND + '/api/v1/User/createAlias'}`, {
                'aliasID': id,
                'alias': name
            }, {
                headers: { "Authorization": `Bearer ${token}` }
            })
            console.log(res.data.msg)
            setBeneficiaryList(res.data.data)
            console.log(res.data.data)
            toast(res.data.msg)
        }
        catch (e) {
            console.log(e)
            toast(e.response.data.msg)
        }
    }

    // let getBeneficeries = async (token) => {
    //     try{
    //         let res = await axios.get(`${process.env.BACKEND + '/api/v1/User/getAliases', {
    //             headers: { "Authorization": `Bearer ${token}` }
    //         })
    //         setBeneficiaryList(res.data.data)
    //     }
    //     catch(e){
    //         toast(e.response.data.msg)
    //     }
    // }

    let copyId = async (e) => {
        // console.log(e.target.nextSibling.innerText)//innerText)
        let ID = e.target.nextSibling.innerText
        navigator.clipboard.writeText(ID);
        toast(`copied ${ID}`)

    }

    let copyId2 = async (e) => {
        // console.log(e.target.innerText)
        let ID = e.target.innerText // target.__reactFiber$tlhze9l0dff.sibling.alternate
        navigator.clipboard.writeText(ID);
        toast(`copied ${ID}`)

    }
    // useEffect(() => {
    //     getBeneficeries(localStorage.getItem('token').replace('"', '').replace('"', ''))
    // }, [])
    return (
        <>
            <NavBar />
            <ToastContainer />
            <div className="parent" style={{ 'height': '50vh' }}>

                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' onChange={(e) => { setName(e.target.value) }} />
                    <br />
                    <label htmlFor="id">Id</label>
                    <input type="text" id='id' onChange={(e) => { setId(e.target.value) }} />
                    <br />
                    <button onClick={() => {
                        addBeneficiary(
                            localStorage.getItem('token').replace('"', '').replace('"', ''))
                    }}>Submit</button>
                </div>
                <div>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Beneficiary</th>
                                <th>Id</th>
                            </tr>
                        </thead>

                        <tbody>
                            {beneficiaryList.map((beneficiary) => {
                                return (
                                    <tr key={beneficiary.user2} >
                                        <td onClick={(e) => { copyId(e) }} >{beneficiary.alias}</td>
                                        <td onClick={(e) => { copyId2(e) }} >{beneficiary.user2}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Beneficiary