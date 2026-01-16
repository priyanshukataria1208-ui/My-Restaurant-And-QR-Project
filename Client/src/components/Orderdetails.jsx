import React, { useEffect, useState } from "react";
import api from "../lib/api"; // tumhara axios api instance

const ITEMS_PER_PAGE = 10;

const Orderdetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await api.get("/orderss"); // change API path as per your backend
        setOrders(res.data.orders || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Safe total pages calculation
  const totalPages = Math.max(1, Math.ceil(orders.length / ITEMS_PER_PAGE));

  // Current page items
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = orders.slice(startIndex, endIndex);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto border border-slate-300 rounded">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-200">
                <tr>
                  {Object.keys(orders[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((order, idx) => (
                  <tr key={idx} className="border-b hover:bg-slate-100">
                    {Object.values(order).map((val, i) => (
                      <td key={i} className="px-4 py-2 border">
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="relative z-10 flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50 pointer-events-auto"
            >
              Prev
            </button>

            <span>
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-slate-700 rounded disabled:opacity-50 pointer-events-auto"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orderdetails;
