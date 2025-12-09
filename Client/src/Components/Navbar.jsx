import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  function handleremove(e) {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role")
    navigate("/Login");
  }

  return (
    <nav className="navbar navbar-expand-lg  " id="navbar">
      <div className="container-fluid" >
        <NavLink className="navbar-brand" id="logo">
          🍔Restaurant
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navmenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">

            {accessToken ? (
              <>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={handleremove} id="logoutbtn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Reg">
                    Registration
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/Login">
                    Login
                  </NavLink>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
