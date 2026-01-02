import React from "react";

const rows = [
  { id: "#001235", title: "Sweet Cheezy Pizza", user: "Judith Rodriguez", price: "$45.3", status: "Pending" },
  { id: "#001236", title: "Chicken Curry Special", user: "Karan Patel", price: "$5.8", status: "Delivered" },
  { id: "#001237", title: "Veg Sandwich", user: "Anita", price: "$3.4", status: "Cancelled" },
];

const Recentorders = () => {
  return (
    <div className="card">
      <h4>Recent Order Request</h4>
      <table className="table">
        <thead>
          <tr><th>Order</th><th>Item</th><th>Customer</th><th>Price</th><th>Status</th></tr>
        </thead>
        <tbody>
          {rows.map((r,i) => (
            <tr key={i}>
              <td>{r.id}</td>
              <td>{r.title}</td>
              <td>{r.user}</td>
              <td>{r.price}</td>
              <td><span className={`tag ${r.status.toLowerCase()}`}>{r.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recentorders;
