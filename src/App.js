import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Guard from './components/Guard'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Home from './Pages/Home'
import Main from './Pages/Main'
import Transfer from './Pages/Transfer'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Guard> <Home /> </Guard>} />
        <Route path='/transfer' element={<Guard> <Transfer /> </Guard>} />
      </Routes>
    </Router>
  )
}

export default App;