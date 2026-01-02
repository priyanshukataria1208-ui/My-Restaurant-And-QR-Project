import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const Cartpage = () => {
  const { userId, accessToken } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loadingItem, setLoadingItem] = useState(null);
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    if (userId) {
      fetchCart();
      fetchCoupons();
    }
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data?.cart) {
        setCart(res.data.cart);
        setAppliedCoupon(res.data.cart.appliedCoupon || null);
        setDiscount(res.data.cart.discount || 0);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/coupan", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (res.data?.CoupansAfterCalculation) setAvailableCoupons(res.data.CoupansAfterCalculation);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setAvailableCoupons([]);
    }
  };

  const increment = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/increment",
      { menuItemId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  const decrement = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/decrement",
      { menuItemId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  const removeItem = async (menuItemId) => {
    setLoadingItem(menuItemId);
    await axios.post(
      "http://localhost:3000/api/v1/remove",
      { menuItemId },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await fetchCart();
    setLoadingItem(null);
  };

  // APPLY COUPON FRONTEND
  const applyCoupon = (coupon) => {
    if (!cart) return;
    if (cart.totalCartPrice < coupon.minOrderAmount) {
      toast.error(`Add ₹${coupon.minOrderAmount - cart.totalCartPrice} more to use this coupon`);
      return;
    }

    let discountValue = 0;
    if (coupon.discountType === "fixedAmount") {
      discountValue = coupon.discountValue;
    } else if (coupon.discountType === "percentage") {
      discountValue = (cart.totalCartPrice * coupon.discountValue) / 100;
      if (coupon.maxDiscount) discountValue = Math.min(discountValue, coupon.maxDiscount);
    }

    setAppliedCoupon(coupon.code);
    setDiscount(discountValue);
    toast.success(`Coupon ${coupon.code} applied!`);
  };

  if (!cart || !cart.items.length)
    return <h2 className="text-center mt-5">🛒 Your cart is empty!</h2>;

  const totalAmount = cart.totalCartPrice;
  const finalAmount = totalAmount - discount;

  return (
    <div>
      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <h2>🛒 Your Cart</h2>

            {/* LEFT: Cart Items */}
            <div className="col-md-8">
              <div className="card mb-4" style={{ backgroundColor: "#1f1f1f" }}>
                <div className="card-header py-3">
                  <h5 className="mb-0" style={{ color: "white" }}>
                    Cart - {cart.items.length} items
                  </h5>
                </div>
                <div className="card-body" style={{ color: "white" }}>
                  {cart.items.map((item) => (
                    <div className="row mb-4" key={item.menuItemId._id}>
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div className="bg-image hover-overlay hover-zoom ripple rounded">
                          <img
                            src={item.menuItemId.image || "/default-food.png"}
                            alt={item.menuItemId.name}
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p><strong>{item.menuItemId.name}</strong></p>
                        <p>{item.menuItemId.description || "Delicious item"}</p>
                        <button
                          className="btn btn-primary btn-sm me-1 mb-2"
                          onClick={() => removeItem(item.menuItemId._id)}
                          disabled={loadingItem === item.menuItemId._id}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
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

            {/* RIGHT: Summary + Coupons */}
            <div className="col-md-4">
              <div className="card mb-4" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
                      Products
                      <span>₹ {totalAmount}</span>
                    </li>
                    {discount > 0 && (
                      <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
                        Discount ({appliedCoupon})
                        <span>- ₹ {discount}</span>
                      </li>
                    )}
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
                      Shipping
                      <span>Gratis</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3" style={{ backgroundColor: "#1f1f1f", color: "white" }}>
                      <div><strong>Total amount</strong></div>
                      <span><strong>₹ {finalAmount}</strong></span>
                    </li>
                  </ul>

                  {/* Coupons */}
                  <h5>Available Coupons</h5>
                  {availableCoupons.map((c) => {
                    const eligible = totalAmount >= c.minOrderAmount;
                    return (
                      <div
                        key={c.code}
                        className="card mb-2"
                        style={{
                          background: eligible ? "#2e7d32" : "#3a3a3a",
                          color: "#fff",
                          padding: "10px",
                        }}
                      >
                        <h6>{c.code}</h6>
                        <p>{c.description}</p>
                        <p>Valid: {new Date(c.validFrom).toLocaleDateString()} - {new Date(c.validTo).toLocaleDateString()}</p>
                        <p>Discount: {c.discountAmount || c.discountValue}</p>
                        {eligible ? (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => applyCoupon(c)}
                            disabled={applyingCoupon || appliedCoupon === c.code}
                          >
                            {appliedCoupon === c.code ? "Applied" : "Apply"}
                          </button>
                        ) : (
                          <small>Add ₹{c.minOrderAmount - totalAmount} more to unlock</small>
                        )}
                      </div>
                    );
                  })}

                  <button className="btn btn-primary btn-lg btn-block mt-3">
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
