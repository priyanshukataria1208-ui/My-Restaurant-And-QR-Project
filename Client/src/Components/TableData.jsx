import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";


const API = "http://localhost:3000/api/v1/table";

const TableData = () => {
  const { accessToken, role } = useContext(AuthContext);
  

  const [tables, setTables] = useState([]);
  const [editTable, setEditTable] = useState(null);
  const [tableData, setTableData] = useState({ tableNumber: "", capacity: "" });

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await axios.get(API, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setTables(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (accessToken) fetchTables();
  }, [accessToken]);

  // DELETE
  const deleteTable = async (id) => {
    if (!window.confirm("Are you sure to delete this table?")) return;
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTables(tables.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API}/${editTable._id}`, tableData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setTables(tables.map((t) => (t._id === editTable._id ? res.data : t)));
      setEditTable(null);
      setTableData({ tableNumber: "", capacity: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-wrapper">
      <div className="table-container">
        <h2 className="table-title">🍽 Table Management Dashboard</h2>

        {editTable && (
          <form className="table-edit-form" onSubmit={handleUpdate}>
            <div>
              <input
                type="text"
                placeholder="Table Number"
                value={tableData.tableNumber}
                onChange={(e) =>
                  setTableData({ ...tableData, tableNumber: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Capacity"
                value={tableData.capacity}
                onChange={(e) =>
                  setTableData({ ...tableData, capacity: e.target.value })
                }
              />
            </div>
            <div className="btn-group">
              <button className="update-btn">Save</button>
              <button className="cancel-btn" onClick={() => setEditTable(null)}>
                Cancel
              </button>
            </div>
          </form>
        )}

        <table className="styled-table">
          <thead>
            <tr>
              <th>Table Number</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tables.length > 0 ? (
              tables.map((table) => (
                <tr key={table._id}>
                  <td>{table.tableNumber}</td>
                  <td>{table.capacity}</td>
                  <td>
                    <button
                      className="update-btn"
                      onClick={() => {
                        setEditTable(table);
                        setTableData({
                          tableNumber: table.tableNumber,
                          capacity: table.capacity,
                        });
                      }}
                    >
                      Update
                    </button>

                    {role === "admin" ? (
                      <button
                        className="delete-btn"
                        onClick={() => deleteTable(table._id)}
                      >
                        Delete
                      </button>

                    ):null}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No tables found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableData;
