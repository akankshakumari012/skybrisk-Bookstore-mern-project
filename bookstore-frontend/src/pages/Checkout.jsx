import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [status] = useState(2);
  const { cartItems, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F7FF",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "#7C3AED" }}>
        Checkout
      </h1>

      {/* Checkout Form */}
      <div
        style={{
          backgroundColor: "white",
          maxWidth: "400px",
          margin: "30px auto",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Address"
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Phone Number"
          style={inputStyle}
        />

        <button
          onClick={async () => {
            const token = localStorage.getItem("token");
            if (!token) {
              toast.error("Please login first!", { position: "bottom-right" });
              navigate("/login");
              return;
            }

            if (!cartItems || cartItems.length === 0) {
              toast.error("Your cart is empty", { position: "bottom-right" });
              return;
            }

            try {
              const orderItems = cartItems.map((item) => ({
                // book id may not be available for frontend-only items; backend accepts missing book ref
                title: item.title,
                price: item.price,
                image: item.image || "",
                quantity: item.quantity,
              }));

              await axios.post(
                `${apiBaseUrl}/api/orders`,
                { orderItems, paymentMethod: "Cash on Delivery" },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              // clear local cart
              cartItems.forEach((it) => removeFromCart(it.id));

              setOrderPlaced(true);
              toast.success("Order placed successfully!", { position: "bottom-right" });
            } catch (err) {
              const msg = err?.response?.data?.message || "Failed to place order.";
              toast.error(msg, { position: "bottom-right" });
            }
          }}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#7C3AED",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Place Order
        </button>

        {/* Success Message */}
        {orderPlaced && (
          <div>
            <p
              style={{
                color: "green",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              ✅ Order placed successfully!
            </p>

            {/* Order Tracking */}
            <div
              style={{
                marginTop: "20px",
                backgroundColor: "#EDE9FE",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h3 style={{ color: "#7C3AED" }}>
                📦 Order Tracking
              </h3>

              <p>
                {status >= 1 ? "✅" : "⬜"} Order Confirmed
              </p>

              <p>
                {status >= 2 ? "✅" : "⬜"} Shipped
              </p>

              <p>
                {status >= 3 ? "✅" : "⬜"} Out for Delivery
              </p>

              <p>
                {status >= 4 ? "✅" : "⬜"} Delivered
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
};