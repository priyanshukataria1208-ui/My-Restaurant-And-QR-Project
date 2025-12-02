import React from 'react'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserProduct from './components/UserProduct';
import Protectedroutes from './components/Protectedroutes';

import Welcome from "./components/welcome";
import Openroutes from './components/Openroutes';



const App = () => {
  return (
    <div>
    <Router>
      <Navbar/>
      <Routes>
        
<Route path='/Reg' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/' element={<Protectedroutes><UserProduct/></Protectedroutes>}/>
<Route path='/welcome'element={<Welcome/>}/>

      </Routes>
    </Router>
    </div>
  )
}

export default App