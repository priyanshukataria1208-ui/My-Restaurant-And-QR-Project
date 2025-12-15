import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);

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
    }
  };

  // ✅ ADD TO CART
  const addToCart = async (menuItemId) => {
    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      setLoadingId(menuItemId);

      await axios.post("http://localhost:3000/api/v1/addcart", {
        menuItemId,
        userId,
        quantity: 1,
      });

      alert("Item added to cart 🛒");
    } catch (error) {
      console.log("ADD CART ERROR:", error.response?.data || error.message);
      alert("Failed to add item");
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
    </div>
  );
};

export default Menu;
