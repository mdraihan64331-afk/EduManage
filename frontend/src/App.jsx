import React from 'react'
import AdminDashboard from './components/AdminDashboard'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import UserDashboard from './components/UserDashboard'
import Signin from './pages/Signin'
import About from './pages/About'
import Contact from './pages/Contact'
import Features from './pages/Features'
import Notice from './pages/Notice'
import Signup from './pages/Signup'
import Forgot from './pages/Forgot'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/features' element={<Features />} />
        <Route path='/notice' element={<Notice />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/user-dashboard' element={<UserDashboard/>} />
        <Route path='/admin-dashboard' element={<AdminDashboard/>} />
        <Route path='/sign-in' element={<Signin/>} />
        <Route path='/sign-up' element={<Signup/>} />
        <Route path='/forgot' element={<Forgot/>} />
      </Routes>
    </>
  )
}

export default App
