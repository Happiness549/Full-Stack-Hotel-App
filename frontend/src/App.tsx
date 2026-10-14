
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Landing} from './pages/Landing'
import {Register} from './components/Register'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Register />} />
    </Routes>  
    </BrowserRouter>
      
    </>
  )
}

export default App
