import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AdminNavBar from '../AdminNavbar/AdminNavBar'

const Admin = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <AdminNavBar/>
      </Routes>
     
      </BrowserRouter>
    </div>
  )
}

export default Admin
