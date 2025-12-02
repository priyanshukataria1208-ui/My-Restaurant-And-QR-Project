import React from 'react'
import Register from './Components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import UserProduct from './Components/UserProduct';
import Protectedroutes from './Components/Protectedroutes';
import Openroutes from './Components/Openroutes';


const App = () => {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
<Route path='/Reg' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/' element={<Protectedroutes><UserProduct/></Protectedroutes>}/>

      </Routes>
    </Router>
    </div>
  )
}

export default App