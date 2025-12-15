import React, { useContext } from 'react'
import Register from './components/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Navbar from './components/Navbar';
import UserProduct from './components/UserProduct';
import Welcome from "./components/welcome";
import Menu from "./components/Menu"
import TableData from './components/tabledata';
import Homepage from './components/Homepage';
import Admindashbord from './components/Admindashbord';
import { AuthProvider } from './components/context/AuthContext';
import { AuthContext } from './components/context/AuthContext';
import Addfooditem from './components/Addfooditem';
import Adminfoodproduct from './components/Adminfoodproduct';
import Footer from './components/Footer';
import Cartpage from './components/Cartpage';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  )
}

const MainApp = () => {
  const { accessToken, role } = useContext(AuthContext);

  return (
    <>
      {<Navbar />}

      <Routes>
        <Route path="/Reg" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<UserProduct />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/table" element={<TableData />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/admindash" element={<Admindashbord />} />
        <Route path='/admininsertform' element={<Addfooditem />} />
        <Route path='/adminfoodproduct' element={<Adminfoodproduct />} />
        <Route path='/cartpage' element={<Cartpage />} />
      </Routes>

      {/* Footer only for non-admin users */}


    </>
  );
};

export default App;
