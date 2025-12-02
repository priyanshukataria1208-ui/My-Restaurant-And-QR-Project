import React, { useContext } from "react";

import { NavLink,  } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="container-fluid" id="navbar">
      <div className="row">
        <div className="col-md-12" id="navbar2">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/" id="logo">
              🍔Restaurant
              </NavLink>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  
                 
                    
                      <li className="nav-item">
                        <NavLink className="nav-link " to="/Reg">
                          Registration
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink className="nav-link" to="/Login">
                          Login
                        </NavLink>
                      </li>
                    
                 
                
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
