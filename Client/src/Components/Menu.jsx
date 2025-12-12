import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");

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

  const filterproduct = foods.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-[#fffefe] to-[#f7faff] min-h-screen py-12">
      
      {/* TITLE */}
      <h2 className="text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-600 to-pink-600 text-transparent bg-clip-text drop-shadow-lg mb-12">
        🍽️ Explore Our Menu
      </h2>

      {/* SEARCH */}
      <div className="max-w-md mx-auto px-6 mb-8">
        <input
          type="search"
          className="form-control rounded-lg border p-3 text-lg shadow transition-all w-full focus:shadow-xl focus:ring-2 focus:ring-yellow-500"
          placeholder="🔍 Search your favorite food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FOOD CARDS */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-6">
        {filterproduct.map((item, index) => (
          <div
            key={item._id}
            style={{ animationDelay: `${index * 0.1}s` }}
            className="animate-[fadeInUp_0.6s_ease] bg-white rounded-3xl shadow-lg border overflow-hidden 
            hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer
            group relative"
          >
            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-[600ms]"
              />

              {/* CATEGORY TAG */}
              <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                {item.category}
              </span>

              {/* FLOATING PRICE TAG */}
              <span className="absolute bottom-3 right-3 bg-yellow-500 text-white font-bold px-4 py-1 rounded-full shadow-xl 
              text-sm group-hover:scale-110 transition-transform">
                ₹{item.price}
              </span>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-4 text-center flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.name}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {item.description}
              </p>

              {/* ADD TO CART BUTTON */}
              <button
                className="w-full py-2.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl 
                hover:shadow-xl active:scale-95 transition-all duration-300 font-semibold"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
