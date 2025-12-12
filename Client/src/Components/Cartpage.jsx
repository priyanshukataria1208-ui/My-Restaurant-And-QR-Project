import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const Cartpage = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loadingItem, setLoadingItem] = useState(null);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/cart/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setCart(res.data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const increment = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post("http://localhost:3000/api/v1/cart/increment", { menuItemId, userId }, { headers: { Authorization: `Bearer ${accessToken}` } });
    fetchCart();
    setLoadingItem(null);
  };

  const decrement = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post("http://localhost:3000/api/v1/cart/decrement", { menuItemId, userId }, { headers: { Authorization: `Bearer ${accessToken}` } });
    fetchCart();
    setLoadingItem(null);
  };

  const removeItem = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post("http://localhost:3000/api/v1/cart/remove", { menuItemId, userId }, { headers: { Authorization: `Bearer ${accessToken}` } });
    fetchCart();
    setLoadingItem(null);
  };

  if (!cart || !cart.items.length)
    return <h2 className="text-center mt-20 text-3xl font-semibold">🛒 Your cart is empty!</h2>;

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h2 className="text-4xl font-bold text-center mb-10">🛒 Your Cart</h2>
      <div className="grid gap-6">
        {cart.items.map((item) => (
          <div key={item.menuItemId} className="flex items-center justify-between bg-white shadow-lg rounded-xl p-4">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500">₹{item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => decrement(item.menuItemId)} disabled={loadingItem === item.menuItemId} className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300">-</button>
              <span className="px-3 py-1 font-semibold">{item.quantity}</span>
              <button onClick={() => increment(item.menuItemId)} disabled={loadingItem === item.menuItemId} className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">+</button>
              <button onClick={() => removeItem(item.menuItemId)} disabled={loadingItem === item.menuItemId} className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-right text-2xl font-bold">
        Total: ₹{cart.totalCartPrice}
      </div>
    </div>
  );
};

export default Cartpage;
