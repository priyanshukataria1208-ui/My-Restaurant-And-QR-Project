import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";


const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { accessToken, role, logout } = useContext(AuthContext);

  if (!accessToken) return null;

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <nav className="navbar-glass" id="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <h1 className="logo">🍽️ Comida</h1>
      </div>

      {/* RIGHT */}
      <ul className="nav-links">
        {role === "customer" && (
          <>
            <li id="foodtitle"><Link to="/menu">Menu</Link></li>
            <li id="foodtitle"><Link to="/cartpage">Cart</Link></li>
          </>
        )}
{/* 
        {role === "admin" && (
          <>
            <li><Link to="/admindash">Dashboard</Link></li>
            <li><Link to="/foodproduct">Products</Link></li>
          </>
        )} */}

        {/* PROFILE */}
        <li
          className="profile-btn"
          onClick={() => setProfileOpen(!profileOpen)}
          id="logoutbtn"
        >
          👤 {role}

          {profileOpen && (
            <div className="profile-dropdown">
              <span>Profile</span>
              <span>Settings</span>
              <span className="logout" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
