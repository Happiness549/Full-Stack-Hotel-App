
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Landing} from './pages/Landing'
import {Register} from './pages/Register'
import {Login} from './pages/Login'
import {Admin} from './pages/AdminDasboard'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Admin />} />
    </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
