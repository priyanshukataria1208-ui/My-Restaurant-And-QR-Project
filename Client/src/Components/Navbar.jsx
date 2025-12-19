import React, {
  useState,
  useContext,
  useRef,
  useEffect
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const navigate = useNavigate();
  const { accessToken, role, logout } = useContext(AuthContext);
  const { name } = useSelector((state) => state.auth)

  // 🔥 Cart count
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);

  // 🔥 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!accessToken) return null;

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <nav className="navbar-glass" id="navbar">
      {/* LEFT */}
      <div className="nav-left">
        <Link  className="logo-wrap">
          <img src="logo.png" alt="Comida Logo" className="logo-img" />
          <h1 className="logo-text">Comida</h1>
        </Link>
      </div>


      {/* RIGHT */}
      <ul className="nav-links">
        {role === "customer" && (
          <>
            <li className="profile-btn" id="homepagebtn">
              <Link to="/">
                <i className="fas fa-house"></i>
              </Link>
            </li>

            <li id="foodtitle">
              <Link to="/menu">Menu</Link>
            </li>

            {/* CART */}
            <li id="foodtitle" className="cart-icon">
              <Link to="/cartpage">
                🛒 Cart
                {cartCount > 0 && (
                  <span className="cart-badge">{cartCount}</span>
                )}
              </Link>
            </li>
          </>
        )}

        {/* PROFILE */}
        <li
          ref={profileRef}
          className="profile-btn"
          id="logoutbtn"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          👤 {name}

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
