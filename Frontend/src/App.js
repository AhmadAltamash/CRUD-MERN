import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import WelcomePage from './components/WelcomePage'
import EmployeeList from './components/EmployeeList'
import EmployeeCreate from './components/EmployeeCreate'
import EmployeeEdit from './components/EmployeeEdit'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/welcomeadmin" element={<WelcomePage/>} />
      <Route path="/employeelist" element={<EmployeeList/>} />
      <Route path="/addemployee" element={<EmployeeCreate/>} />
      <Route path="/editemployee/:id" element={<EmployeeEdit/>} />
    </Routes>
  )
}

export default App