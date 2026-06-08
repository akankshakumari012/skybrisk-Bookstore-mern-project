import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Books() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Help",
      price: "₹499",
      priceValue: 499,
      pdfPrice: 149,
      subscriptionMonthly: 99,
      subscriptionDaily: 5,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      genre: "Finance",
      price: "₹399",
      priceValue: 399,
      pdfPrice: 129,
      subscriptionMonthly: 89,
      subscriptionDaily: 4,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81bsw6fnUiL.jpg",
    },
    {
      id: 3,
      title: "Harry Potter",
      author: "J.K. Rowling",
      genre: "Fiction",
      price: "₹599",
      priceValue: 599,
      pdfPrice: 199,
      subscriptionMonthly: 119,
      subscriptionDaily: 6,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg",
    },
  ];

  const filteredBooks = books.filter(
    (book) =>
      (selectedGenre === "" || book.genre === selectedGenre) &&
      (selectedAuthor === "" || book.author === selectedAuthor) &&
      book.title.toLowerCase().includes(search.toLowerCase())
  );

  const booksPerPage = 2;
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / booksPerPage));
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGenre, selectedAuthor, search]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const requireLogin = (callback, successMessage) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login first!", { position: "bottom-right" });
      navigate("/login");
      return;
    }

    callback();
    if (successMessage) {
      toast.success(successMessage, { position: "bottom-right" });
    }
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
      <h1 style={{ color: "#7C3AED", textAlign: "center" }}>
        📚 Our Books
      </h1>

      {/* Search */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <option value="">All Genres</option>
          <option value="Self Help">Self Help</option>
          <option value="Finance">Finance</option>
          <option value="Fiction">Fiction</option>
        </select>

        <select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <option value="">All Authors</option>
          <option value="James Clear">James Clear</option>
          <option value="Robert Kiyosaki">Robert Kiyosaki</option>
          <option value="J.K. Rowling">J.K. Rowling</option>
        </select>
      </div>

      {/* Book Cards */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {currentBooks.map((book) => (
          <div key={book.id} style={bookCard}>
            <div style={{ position: "relative" }}>
              <div style={wishlistIcon}>♡</div>
              <div style={bestSellerBadge}>BEST SELLER</div>
              <div style={newBadge}>NEW</div>
              <img src={book.image} alt={book.title} style={bookImage} />
            </div>

            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <p>⭐⭐⭐⭐☆</p>

            <p style={priceText}>{book.price}</p>
            <p style={metaText}>
              PDF: ₹{book.pdfPrice} | Subscribe: ₹{book.subscriptionMonthly}/mo or ₹{book.subscriptionDaily}/day
            </p>

            <div style={buttonColumn}>
              <button
                onClick={() =>
                  requireLogin(
                    () =>
                      addToCart({
                        id: `${book.id}-pdf`,
                        title: `${book.title} PDF`,
                        price: book.pdfPrice,
                      }),
                    `${book.title} PDF added to cart`
                  )
                }
                style={buttonStyle}
              >
                📄 Buy PDF ₹{book.pdfPrice}
              </button>

              <button
                onClick={() =>
                  requireLogin(
                    () =>
                      addToCart({
                        id: `${book.id}-pdf-sub`,
                        title: `${book.title} PDF Subscription`,
                        price: book.subscriptionMonthly,
                      }),
                    `${book.title} PDF subscription added`
                  )
                }
                style={{ ...buttonStyle, backgroundColor: "#F59E0B" }}
              >
                📅 Subscribe ₹{book.subscriptionMonthly}/mo
              </button>

              <button
                onClick={() =>
                  requireLogin(() => {}, `${book.title} added to wishlist`)
                }
                style={wishlistButtonStyle}
              >
                ❤️ Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={paginationContainer}>
        <button
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={currentPage === 1}
          style={{
            ...paginationButton,
            opacity: currentPage === 1 ? 0.5 : 1,
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
              style={{
                ...paginationButton,
                backgroundColor:
                  pageNumber === currentPage ? "#7C3AED" : "white",
                color: pageNumber === currentPage ? "white" : "#333",
                border:
                  pageNumber === currentPage
                    ? "1px solid #7C3AED"
                    : "1px solid #ddd",
              }}
            >
              {pageNumber}
            </button>
          )
        )}

        <button
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          disabled={currentPage === totalPages}
          style={{
            ...paginationButton,
            opacity: currentPage === totalPages ? 0.5 : 1,
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
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

const bookCard = {
  background: "white",
  width: "240px",
  padding: "15px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
};

const bookImage = {
  width: "100%",
  height: "280px",
  objectFit: "cover",
  borderRadius: "8px",
};

const buttonStyle = {
  backgroundColor: "#7C3AED",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const wishlistButtonStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "10px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};

const paginationContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  marginTop: "30px",
  flexWrap: "wrap",
};

const paginationButton = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "8px 14px",
  backgroundColor: "white",
  color: "#333",
  cursor: "pointer",
  minWidth: "70px",
};

const wishlistIcon = {
  position: "absolute",
  top: "10px",
  left: "10px",
  backgroundColor: "white",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "18px",
};

const bestSellerBadge = {
  position: "absolute",
  top: "10px",
  left: "55px",
  backgroundColor: "orange",
  color: "white",
  padding: "5px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "bold",
};

const newBadge = {
  position: "absolute",
  top: "45px",
  left: "55px",
  backgroundColor: "#22C55E",
  color: "white",
  padding: "5px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: "bold",
};

const priceText = {
  color: "#7C3AED",
  fontWeight: "bold",
  fontSize: "20px",
};

const metaText = {
  marginTop: "8px",
  color: "#444",
  fontSize: "14px",
};

const buttonColumn = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
  marginTop: "10px",
};