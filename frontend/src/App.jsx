import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddOrEditProject from './pages/AddOrEditProject'
import { toast, ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/project/new' element={<AddOrEditProject/>}/>
      <Route path='/project/update/:projectId' element={<AddOrEditProject/>}/>
    </Routes>
    <ToastContainer position='top-right'/>
    </>
  )
}

export default App