import React from 'react'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserProduct from './components/UserProduct';
import Protectedroutes from './components/Protectedroutes';

import Welcome from "./components/welcome";
import Openroutes from './components/Openroutes';
import { AuthProvider } from './components/context/AuthContext';
import Menu from"./components/Menu"
import TableData from './components/tabledata';
import Homepage from './components/Homepage';




const App = () => {
  return (
    <div>
      <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        
<Route path='/Reg' element={<Register/>}/>
<Route path='/Login' element={<Login/>}/>
<Route path='/' element={<Protectedroutes><UserProduct/></Protectedroutes>}/>
<Route path='/welcome'element={<Welcome/>}/>
<Route path='/table' element={<TableData/>}/>
<Route path='/menu' element={<Menu/>}/>
<Route path='/homepage' element={<Homepage/>}/>


      </Routes>
    </Router>
    </AuthProvider>
    
    </div>
  )
}

export default App