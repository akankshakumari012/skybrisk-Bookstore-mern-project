import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);

  // Total Price
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart", { position: "bottom-right" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F8F7FF",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#7C3AED",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          borderRadius: "8px",
        }}
      >
        <h2>📚 BookStore</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/" style={navLink}>
            Home
          </Link>

          <Link to="/books" style={navLink}>
            Books
          </Link>

          <Link to="/cart" style={navLink}>
            🛒 Cart
          </Link>

          <Link to="/login" style={navLink}>
            Login
          </Link>

          <Link to="/register" style={navLink}>
            Register
          </Link>

          <Link to="/admin" style={navLink}>
            Admin
          </Link>
        </div>
      </nav>

      {/* Heading */}
      <h1
        style={{
          color: "#7C3AED",
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🛒 My Cart
      </h1>

      {/* Cart Items */}
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
        }}
      >
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px" }}>
            <h2>Your cart is empty</h2>
            <p>Add some books to get started!</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  marginBottom: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Book Info */}
                <div>
                  <h3>{item.title}</h3>
                  <p style={{ color: "#7C3AED", fontWeight: "bold" }}>
                    ₹{item.price}
                  </p>
                </div>

                {/* Quantity and Remove */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  {/* Quantity Buttons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => decreaseQty(item.id)}
                      style={qtyBtn}
                    >
                      -
                    </button>

                    <span style={{ fontSize: "18px" }}>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      style={qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={{
                      backgroundColor: "#DC2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Total Section */}
        {cartItems.length > 0 && (
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2 style={{ color: "#7C3AED" }}>
              Total: ₹{total}
            </h2>

            <a href="/checkout">
              <button
                style={{
                  marginTop: "20px",
                  padding: "12px 25px",
                  backgroundColor: "#7C3AED",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              >
                Proceed to Checkout
              </button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

const qtyBtn = {
  backgroundColor: "#7C3AED",
  color: "white",
  border: "none",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  cursor: "pointer",
  fontSize: "18px",
};