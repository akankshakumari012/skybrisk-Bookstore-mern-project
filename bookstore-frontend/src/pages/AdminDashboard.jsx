import { useState } from "react";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      customer: "Akanksha",
      book: "Atomic Habits",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Aditi",
      book: "Harry Potter",
      status: "Shipped",
    },
    {
      id: 3,
      customer: "Rahul",
      book: "Rich Dad Poor Dad",
      status: "Delivered",
    },
  ]);

  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      price: "₹499",
    },
    {
      id: 2,
      title: "Harry Potter",
      author: "J.K. Rowling",
      price: "₹599",
    },
    {
      id: 3,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: "₹399",
    },
  ]);

  const [editingBookId, setEditingBookId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const updateStatus = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? { ...order, status: newStatus }
        : order
    );

    setOrders(updatedOrders);
  };

  const startEdit = (book) => {
    setEditingBookId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditPrice(book.price);
  };

  const saveBook = () => {
    if (!editingBookId) return;

    const updatedBooks = books.map((book) =>
      book.id === editingBookId
        ? { ...book, title: editTitle, author: editAuthor, price: editPrice }
        : book
    );

    setBooks(updatedBooks);
    setEditingBookId(null);
    setEditTitle("");
    setEditAuthor("");
    setEditPrice("");
  };

  const cancelEdit = () => {
    setEditingBookId(null);
    setEditTitle("");
    setEditAuthor("");
    setEditPrice("");
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
      <div
        style={{
          backgroundColor: "#7C3AED",
          color: "white",
          padding: "15px 30px",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h2>👨‍💼 Admin Panel</h2>

        <div style={{ display: "flex", gap: "20px" }}>
          <a href="/" style={navLink}>
            Home
          </a>

          <a href="/books" style={navLink}>
            Books
          </a>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={dashboardCard}>
          <h2>📚 Total Books</h2>
          <h1>120</h1>
        </div>

        <div style={dashboardCard}>
          <h2>📦 Orders</h2>
          <h1>{orders.length}</h1>
        </div>

        <div style={dashboardCard}>
          <h2>👥 Users</h2>
          <h1>45</h1>
        </div>
      </div>

      {/* Manage Books */}
      <div style={sectionCard}>
        <h2 style={{ color: "#7C3AED" }}>
          📚 Manage Books
        </h2>

        {books.map((book) => (
          <div key={book.id} style={bookCard}>
            <div>
              <p><b>{book.title}</b></p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                {book.author}
              </p>
              <p style={{ margin: 0, color: "#7C3AED" }}>
                {book.price}
              </p>
            </div>

            <div>
              <button
                type="button"
                style={editBtn}
                onClick={() => startEdit(book)}
              >
                Edit
              </button>

              <button
                type="button"
                style={deleteBtn}
                onClick={() => setBooks(books.filter((item) => item.id !== book.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {editingBookId !== null && (
          <div
            style={{
              marginTop: "20px",
              padding: "20px",
              backgroundColor: "#EEF2FF",
              borderRadius: "12px",
            }}
          >
            <h3>Edit Book</h3>

            <div style={{ display: "grid", gap: "15px", maxWidth: "500px" }}>
              <label style={{ display: "flex", flexDirection: "column" }}>
                Title
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                Author
                <input
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                Price
                <input
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  style={inputStyle}
                />
              </label>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  style={editBtn}
                  onClick={saveBook}
                >
                  Save
                </button>

                <button
                  type="button"
                  style={deleteBtn}
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Orders */}
      <div style={sectionCard}>
        <h2 style={{ color: "#7C3AED" }}>
          📦 Orders
        </h2>

        {orders.map((order) => (
          <div key={order.id} style={orderCard}>
            <p>
              <b>Customer:</b> {order.customer}
            </p>

            <p>
              <b>Book:</b> {order.book}
            </p>

            <p>
              <b>Status:</b> {order.status}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              <button
                style={statusBtn}
                onClick={() =>
                  updateStatus(order.id, "Shipped")
                }
              >
                Shipped
              </button>

              <button
                style={statusBtn}
                onClick={() =>
                  updateStatus(
                    order.id,
                    "Out for Delivery"
                  )
                }
              >
                Out for Delivery
              </button>

              <button
                style={statusBtn}
                onClick={() =>
                  updateStatus(order.id, "Delivered")
                }
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Styles */

const navLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

const dashboardCard = {
  flex: "1",
  minWidth: "200px",
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const sectionCard = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "12px",
  marginBottom: "30px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const bookCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #ddd",
};

const orderCard = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginTop: "20px",
};

const editBtn = {
  padding: "8px 15px",
  backgroundColor: "#7C3AED",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "10px",
};

const deleteBtn = {
  padding: "8px 15px",
  backgroundColor: "#EF4444",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const statusBtn = {
  padding: "8px 15px",
  backgroundColor: "#7C3AED",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #CBD5E1",
  fontSize: "16px",
};