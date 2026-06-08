import { useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";

export default function BookDetails() {
  const { addToCart } = useContext(CartContext);
  const book = {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    price: 499,
    pdfPrice: 149,
    subscriptionMonthly: 99,
    subscriptionDaily: 5,
    image: "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", backgroundColor: "#F8F7FF", minHeight: "100vh" }}>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <img
          src={book.image}
          alt={book.title}
          width="300"
          style={{ borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
        />

        <div style={{ maxWidth: "540px" }}>
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p>⭐⭐⭐⭐⭐</p>

          <p>
            Atomic Habits is a practical guide to building
            good habits and breaking bad ones.
          </p>

          <p style={{ color: "green" }}>🟢 In Stock</p>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <button
              onClick={() => {
                addToCart({ id: `${book.id}-pdf`, title: `${book.title} PDF`, price: book.pdfPrice });
                toast.success("PDF added to cart", { position: "bottom-right" });
              }}
              style={detailButton}
            >
              📄 Buy PDF ₹{book.pdfPrice}
            </button>

            <button
              onClick={() => {
                addToCart({ id: `${book.id}-pdf-sub`, title: `${book.title} PDF Subscription`, price: book.subscriptionMonthly });
                toast.success("Monthly PDF subscription added", { position: "bottom-right" });
              }}
              style={{ ...detailButton, backgroundColor: "#F59E0B" }}
            >
              📅 Subscribe ₹{book.subscriptionMonthly}/mo
            </button>

            <p style={{ color: "#666", fontSize: "14px", marginTop: "6px" }}>
              Or use daily access for ₹{book.subscriptionDaily}/day with automatic PDF access.
            </p>

            <button
              onClick={() => toast.info("Added to wishlist", { position: "bottom-right" })}
              style={{ ...detailButton, backgroundColor: "black" }}
            >
              ❤️ Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const detailButton = {
  backgroundColor: "#7C3AED",
  color: "white",
  border: "none",
  padding: "12px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};