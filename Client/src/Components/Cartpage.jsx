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
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">

            {/* LEFT SIDE: Cart Items */}
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {cart.items.length} items</h5>
                </div>
                <div className="card-body">
                  {cart.items.map((item) => (
                    <div className="row mb-4" key={item.menuItemId._id}>
                      {/* Image */}
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img
                            src={item.menuItemId.image || "/default-food.png"}
                            alt={item.menuItemId.name}
                            className="w-100"
                          />

                        </div>
                      </div>

                      {/* Product Data */}
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{item.menuItemId.name}</strong></p>
                        <p>{item.menuItemId.description || "Delicious item"}</p>
                        <button
                          className="btn btn-primary btn-sm me-1 mb-2"
                          onClick={() => removeItem(item.menuItemId._id)}
                          disabled={loadingItem === item.menuItemId._id}
                          title="Remove item"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>

                      {/* Quantity + Price */}
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div className="d-flex mb-4" style={{ maxWidth: "300px" }}>
                          <button
                            className="btn btn-primary px-3 me-2"
                            onClick={() => decrement(item.menuItemId._id)}
                            disabled={loadingItem === item.menuItemId._id || item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <input
                            type="number"
                            readOnly
                            value={item.quantity}
                            className="form-control"
                          />

                          <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={() => increment(item.menuItemId._id)}
                            disabled={loadingItem === item.menuItemId._id}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>₹ {item.menuItemId.price * item.quantity}</strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Summary */}
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products
                      <span>₹ {totalAmount}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span><strong>₹ {totalAmount}</strong></span>
                    </li>
                  </ul>
                  <button className="btn btn-primary btn-lg btn-block">
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>

  );
};

export default Cartpage;
