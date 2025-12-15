import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";


const Cartpage = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loadingItem, setLoadingItem] = useState(null);

  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/${userId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data?.cart) setCart(res.data.cart);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const increment = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/increment",
      { menuItemId, userId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  const decrement = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/decrement",
      { menuItemId, userId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  const removeItem = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/remove",
      { menuItemId, userId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  if (!cart || !cart.items.length)
    return <h2 className="empty-cart">🛒 Your cart is empty!</h2>;

  const totalAmount = cart.totalCartPrice;

  return (
    <section className="cart-section">
      <div className="container">
        <div className="row justify-content-center">

          {/* LEFT SIDE: CART ITEMS */}
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5>🛒 Your Cart ({cart.items.length})</h5>
              </div>
              <div className="card-body">
                {cart.items.map((item) => (
                  <div className="cart-item-card" key={item.menuItemId._id}>
                    <div className="item-info d-flex align-items-center">
                      <img
                        src={
                          item.menuItemId.image
                            ? `http://localhost:3000/uploads/${item.menuItemId.image}`
                            : "/default-food.png"
                        }
                        alt={item.menuItemId.name}
                        className="item-image me-3"
                      />
                      <div>
                        <h3>{item.menuItemId.name}</h3>
                        <p>{item.menuItemId.description || "Delicious item"}</p>
                      </div>
                    </div>

                    <div className="item-actions d-flex align-items-center mt-3">
                      <button
                        className="btn-decrement"
                        onClick={() => decrement(item.menuItemId._id)}
                        disabled={loadingItem === item.menuItemId._id || item.quantity <= 1}
                      >
                        -
                      </button>
                      <input type="text" readOnly value={item.quantity} />
                      <button
                        className="btn-increment"
                        onClick={() => increment(item.menuItemId._id)}
                        disabled={loadingItem === item.menuItemId._id}
                      >
                        +
                      </button>
                      <button
                        className="btn-remove ms-3"
                        onClick={() => removeItem(item.menuItemId._id)}
                        disabled={loadingItem === item.menuItemId._id}
                      >
                        Remove
                      </button>
                    </div>
                    <h6 className="text-end mt-2">
                      ₹ {item.menuItemId.price * item.quantity}
                    </h6>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE SUMMARY */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header">
                <h5>Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between">
                    Total Items{" "}
                    <span>{cart.items.reduce((a, i) => a + i.quantity, 0)}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <strong>Total Amount</strong> <strong>₹ {totalAmount}</strong>
                  </li>
                </ul>
                <button className="btn-checkout mt-3 w-100">Checkout</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cartpage;
