import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { accessToken, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <div className="navbar " id="navbar">

      {/* Left */}
      <div className="navbar-left">
        <h1 className="logo">🍽️ Comida</h1>
      </div>

      {/* Middle */}
    

      {/* Right */}
      <div className="navbar-right">
        <ul className="menu">
  <li><Link to="/menu">Menu</Link></li>

          <li><Link to="/order">🛎️Orders</Link></li>
           
 {localStorage.getItem("role") === "admin" ?(
            <li>
              <Link to="/">User</Link>

            </li>
            
          ):null}
          {/* Admin Dashboard Access */}
          {localStorage.getItem("role") === "admin" ?(
            <li>
              <Link to="/admindash">Dashboard</Link>

            </li>
            
          ):null}

          {localStorage.getItem("role") === "admin" ?(
            <li>
              <Link to="/table">Table</Link>

            </li>
            
          ):null}
        
          
          {localStorage.getItem("role") === "customer" ?(
            <li>
              <Link to="/cartpage">Cart</Link>

            </li>
            
          ):null}

          
          
         


       <button id="logoutbtn">
           <li className="profile" onClick={() => setProfileOpen(!profileOpen)}>
           {`👤 ${role || "User"}`}


            {/* Dropdown */}
            {profileOpen && (
              <ul className="dropdown">
                <li className="drop">👨🏻‍💻Profile</li>
                <li className="drop">⚙️Settings</li>
                <li onClick={handleLogout}className="drop">➜] Logout </li>
              </ul>
            )}
          </li>
       </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
