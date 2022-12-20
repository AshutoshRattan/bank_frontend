import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Guard from './components/Guard'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Main from './Pages/Main'
import Transfer from './Pages/Transfer'
import Transactions from './Pages/Transactions'
import Beneficiary from './Pages/Beneficiary'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Guard> <Home /> </Guard>} />
        <Route path='/transfer' element={<Guard> <Transfer /> </Guard>} />
        <Route path='/transactions' element={<Guard> <Transactions /> </Guard>} />
        <Route path='/beneficiary' element={<Guard> <Beneficiary /> </Guard>} />
      </Routes>
    </Router>
  )
}

export default App;