import React from "react";
import { FaChartLine, FaUtensils, FaList, FaShoppingCart, FaUsers, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";


const Sidebar = () => {
  return (
    <aside className="gd-sidebar">
      <div className="brand">
        <span className="brand-dot" />
        <strong>GoFood.</strong>
      </div>

      <nav className="gd-nav">
        <Link className="active" to="/admindashbord"><FaChartLine /> Dashboard</Link>
        <Link to="/menu"><FaUtensils /> Menu</Link>
        <Link><FaList /> Orders</Link>
            <Link to="/usertable"><FaList /> User</Link>
                <Link to="/table"><FaList /> Table</Link>
        <Link to="/adminfoodproduct"><FaList /> Food Product</Link>
        <Link to="/admininsertform"><FaList /> Add Food Item</Link>
        <Link><FaUsers /> Customers</Link>
        <Link><FaShoppingCart /> Analytics</Link>

      </nav>
    </aside>
  );
};

export default Sidebar;
