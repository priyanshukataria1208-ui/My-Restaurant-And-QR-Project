import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
   // ✅ Zomato style message

  const userId = localStorage.getItem("userId"); // 👈 LOGIN USER ID

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/menu");
      setFoods(res.data.data || []);
    } catch (error) {
      console.log("Error:", error);
      showToast("Failed to load menu items");
    }
  };

  // ✅ Show toast message
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast(""); // auto disappear after 3 seconds
    }, 3000);
  };

  // ✅ ADD TO CART
  const addToCart = async (menuItemId) => {
    if (!userId) {
      showToast("Please login first!");
      return;
    }

    try {
      setLoadingId(menuItemId);

      await axios.post("http://localhost:3000/api/v1/addcart", {
        menuItemId,
        userId,
        quantity: 1,
      });

      toast.success("Item added to cart 🛒");
    } catch (error) {
      console.log("ADD CART ERROR:", error.response?.data || error.message);
      toast.error("Failed to add item");
    } finally {
      setLoadingId(null);
    }
  };

  const filterProducts = foods.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-page">
      <h1 className="menu-title">Our Menu</h1>

      {/* 🔔 Toast message */}
      {toast && <div className="toast">{toast}</div>}

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="search"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FOOD GRID */}
      <div className="menu-grid">
        {filterProducts.length === 0 ? (
          <p className="not-found">No items found</p>
        ) : (
          filterProducts.map((item) => (
            <div className="menu-card" key={item._id}>
              <div className="menu-img-wrapper">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="menu-info">
                <h3>{item.name}</h3>
                <p className="category">{item.category}</p>
                <p className="price">₹{item.price}</p>

                <button
                  className="add-btn"
                  disabled={loadingId === item._id}
                  onClick={() => addToCart(item._id)}
                >
                  {loadingId === item._id ? "Adding..." : "Add to Cart"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔧 Toast CSS inline for example */}
      <style>{`
        .toast {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #4BB543;
          color: white;
          padding: 12px 20px;
          border-radius: 5px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          z-index: 9999;
          animation: slide-in 0.3s ease;
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Menu;
