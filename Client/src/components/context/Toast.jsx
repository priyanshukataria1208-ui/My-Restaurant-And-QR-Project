import React, { useState } from "react";

const Toast = () => {
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => {
      setToast("");
    }, 3000);
  };

  return (
    <div>
      <button onClick={() => showToast("Item added to cart 🛒")}>
        Add to Cart
      </button>

      {toast && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#4BB543",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "5px",
            zIndex: 9999,
          }}
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default Toast;
