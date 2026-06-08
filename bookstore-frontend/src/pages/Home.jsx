import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

const booksData = [
  { id: 1, title: "Atomic Habits", author: "James Clear", price: 499, image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg" },
  { id: 2, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", price: 399, image: "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg" },
  { id: 3, title: "Harry Potter", author: "J.K. Rowling", price: 599, image: "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg" },
];

export default function Home() {
  const [darkMode,  setDarkMode]=useState(false);
  const { addToCart } = useContext(CartContext);
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#111827" : "#F8F7FF",
color: darkMode ? "white" : "black",
transition: "0.3s",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Animations */}
      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }

        @keyframes glow {
          from {
            transform: scale(1);
            filter: drop-shadow(0 0 8px #C084FC);
          }

          to {
            transform: scale(1.05);
            filter: drop-shadow(0 0 20px #7C3AED);
          }
        }
      `}</style>

      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#7C3AED",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    backgroundColor: "white",
    color: "#7C3AED",
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: "10px",
  }}
>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "60px",
    padding: "80px 40px",
    flexWrap: "wrap",
  }}
>
  {/* Left Image */}
  <img
    src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
    alt="Book"
    style={{
      width: "350px",
      borderRadius: "20px",
      boxShadow: "0 10px 25px rgba(124, 58, 237, 0.4)",
      animation: "float 3s ease-in-out infinite",
    }}
  />

  {/* Right Content */}
  <div style={{ maxWidth: "500px" }}>
    <h1
      style={{
        fontSize: "65px",
        fontWeight: "bold",
        lineHeight: "1.2",
        background:
          "linear-gradient(90deg, #6D28D9, #A855F7, #C084FC)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation:
          "glow 2s ease-in-out infinite alternate",
      }}
    >
      Welcome to BookStore
    </h1>

    <p
      style={{
        fontSize: "20px",
        color: "#555",
        marginTop: "20px",
        marginBottom: "30px",
      }}
    >
      Discover your next favorite book with
      premium collections and trending reads.
    </p>

    <Link to="/books">
      <button
        style={{
          backgroundColor: "#7C3AED",
          color: "white",
          border: "none",
          padding: "14px 30px",
          borderRadius: "10px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          boxShadow:
            "0 4px 15px rgba(124,58,237,0.4)",
        }}
      >
        Browse Books
      </button>
    </Link>
  </div>
</div>
{/* Offer Banner */}
<div
  style={{
    margin: "40px auto",
    width: "90%",
    background:
      "linear-gradient(90deg, #7C3AED, #A855F7)",
    color: "white",
    padding: "25px",
    borderRadius: "20px",
    textAlign: "center",
    boxShadow:
      "0 8px 20px rgba(124,58,237,0.4)",
  }}
>
  <h2
    style={{
      fontSize: "32px",
      marginBottom: "10px",
    }}
  >
    🔥 Flat 30% OFF on Best Sellers
  </h2>

  <p
    style={{
      fontSize: "18px",
      opacity: "0.9",
    }}
  >
    Limited Time Offer — Grab your favorite
    books now!
  </p>
  
<Link  to ="/books">
  <button
    style={{
      marginTop: "20px",
      padding: "12px 25px",
      backgroundColor: "white",
      color: "#7C3AED",
      border: "none",
      borderRadius: "10px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    Shop Now
  </button>
</Link>
</div>
      {/* Featured Books */}
      <div style={{ padding: "40px" }}>
        <h2
          style={{
            textAlign: "center",
            color: "#7C3AED",
            marginBottom: "30px",
          }}
        >
          📚 Featured Books
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "25px",
            flexWrap: "wrap",
          }}
        >
          {/* Book 1 */}
          <div style={bookCard}>
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg"
              alt="Atomic Habits"
              style={bookImage}
            />

            <h3>Atomic Habits</h3>
            <p>James Clear</p>

            <p
              style={{
                color: "#7C3AED",
                fontWeight: "bold",
              }}
            >
              ₹499
            </p>
            <button
  onClick={() => {
    addToCart({ id: 1, title: "Atomic Habits", price: 499 });
    toast.success("Added to cart", { position: "bottom-right" });
  }}
  style={{
    backgroundColor: "#7C3AED",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  }}
>
  🛒 Add to Cart
</button>

<button
  onClick={() => toast.info("Added to wishlist", { position: "bottom-right" })}
  style={{
    backgroundColor: "white",
    color: "#7C3AED",
    border: "2px solid #7C3AED",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  ❤️ Wishlist
</button>
          </div>

          {/* Book 2 */}
          <div style={bookCard}>
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg"
              alt="Rich Dad Poor Dad"
              style={bookImage}
            />

            <h3>Rich Dad Poor Dad</h3>
            <p>Robert Kiyosaki</p>

            <p
              style={{
                color: "#7C3AED",
                fontWeight: "bold",
              }}
            >
              ₹399
            </p>
            <button
  onClick={() => {
    addToCart({ id: 2, title: "Rich Dad Poor Dad", price: 399 });
    toast.success("Added to cart", { position: "bottom-right" });
  }}
  style={{
    backgroundColor: "#7C3AED",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  }}
>
  🛒 Add to Cart
</button>

<button
  onClick={() => toast.info("Added to wishlist", { position: "bottom-right" })}
  style={{
    backgroundColor: "white",
    color: "#7C3AED",
    border: "2px solid #7C3AED",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  ❤️ Wishlist
</button>
          </div>

          {/* Book 3 */}
          <div style={bookCard}>
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg"
              alt="Harry Potter"
              style={bookImage}
            />

            <h3>Harry Potter</h3>
            <p>J.K. Rowling</p>

            <p
              style={{
                color: "#7C3AED",
                fontWeight: "bold",
              }}
            >
              ₹599
            </p>
            <button
  onClick={() => {
    addToCart({ id: 3, title: "Harry Potter", price: 599 });
    toast.success("Added to cart", { position: "bottom-right" });
  }}
  style={{
    backgroundColor: "#7C3AED",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  }}
>
  🛒 Add to Cart
</button>

<button
  onClick={() => toast.info("Added to wishlist", { position: "bottom-right" })}
  style={{
    backgroundColor: "white",
    color: "#7C3AED",
    border: "2px solid #7C3AED",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  }}
>
  ❤️ Wishlist
</button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div
        style={{
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#7C3AED" }}>
          ⭐ Book Reviews
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div style={reviewCard}>
            <h3>Atomic Habits</h3>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Amazing self-help book!"</p>
          </div>

          <div style={reviewCard}>
            <h3>Harry Potter</h3>
            <p>⭐⭐⭐⭐☆</p>
            <p>"Magical and fun to read."</p>
          </div>

          <div style={reviewCard}>
            <h3>Rich Dad Poor Dad</h3>
            <p>⭐⭐⭐⭐⭐</p>
            <p>"Must read for finance."</p>
          </div>
        </div>
      </div>
      Mee{/* Floating Chat Button */}
<button
  onClick={() => alert("Support coming soon! 😊")}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#7C3AED",
    color: "white",
    border: "none",
    borderRadius: "50px",
    padding: "15px 20px",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 4px 15px rgba(124,58,237,0.4)",
    zIndex: "1000",
  }}
>
  💬 Need Help?
</button>

      {/* Footer */}
      <footer
        style={{
          marginTop: "50px",
          backgroundColor: "#7C3AED",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p>📚 BookStore © 2026</p>
        <p>About | Contact | Help</p>
      </footer>
    </div>
  );
}

/* Styles */

const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const reviewCard = {
  backgroundColor: "white",
  padding: "20px",
  width: "220px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const bookCard = {
  backgroundColor: "white",
  width: "220px",
  padding: "15px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const bookImage = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "8px",
};