import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Landing} from './pages/Landing'
import {Register} from './pages/Register'
import {Login} from './pages/Login'
import {Admin} from './pages/AdminDasboard'
import HotelDetails from "./pages/HotelDetail";
import {Home} from './pages/Home'
import { Favourites } from './pages/Favourites'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Admin />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      <Route path="/home" element={<Home />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
