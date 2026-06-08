const express = require("express");
const Book = require("../models/Book");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed test book (temporary)
router.get("/seed", async (req, res) => {
  try {
    const book = await Book.create({
      title: "Atomic Habits",
      author: "James Clear",
      genre: "Self Help",
      price: 499,
      description: "Best self improvement book",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
      stock: 10,
    });

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single book
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add book (Admin Only)
router.post("/", auth, admin, async (req, res) => {
  try {
    const { title, author, genre, price, description, image, stock } =
      req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      description,
      image,
      stock,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book
router.put("/:id", auth, admin, async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
