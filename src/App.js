import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Guard from './components/Guard'
import AdminGuard from './components/AdminGuard'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Main from './Pages/Main'
import Transfer from './Pages/Transfer'
import Transactions from './Pages/Transactions'
import Beneficiary from './Pages/Beneficiary'
import ForgotPassword from './Pages/ForgotPassword'
import ChangePassword from './Pages/ChangePassword'
import AllTransactions from './Pages/AllTransactions'
import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route path='/home' element={<Guard> <Home /> </Guard>} />
        <Route path='/transfer' element={<Guard> <Transfer /> </Guard>} />
        <Route path='/transactions' element={<Guard> <Transactions /> </Guard>} />
        <Route path='/beneficiary' element={<Guard> <Beneficiary /> </Guard>} />
        <Route path='/changePassword' element={<Guard> <ChangePassword /> </Guard>} />
        <Route path='/admin/transactions' element={<AdminGuard> <AllTransactions /> </AdminGuard>} />
      </Routes>
    </Router>
  )
}

export default App;