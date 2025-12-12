import React from 'react'
import { Link } from "react-router-dom"


const Admindashbord = () => {
  return (
    <div className="admin-page">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="admin-cards">

        <Link to="/admininsertform" className="admin-card">
          <h3>Add Food Product</h3>
          <p>Insert new food item to the menu</p>
        </Link>

        <Link to="/adminfoodproduct" className="admin-card">
          <h3>All Food Products</h3>
          <p>View, edit & delete food products</p>
        </Link>

      </div>
    </div>
  )
}

export default Admindashbord
