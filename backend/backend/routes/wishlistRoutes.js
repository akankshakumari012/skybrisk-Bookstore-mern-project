const express = require("express");
const User = require("../models/User");
const Book = require("../models/Book");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.json(user.wishlist);
});

router.post("/", auth, async (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const user = await User.findById(req.user._id);

  if (user.wishlist.some((item) => item.toString() === bookId)) {
    return res.status(400).json({ message: "Book already in wishlist" });
  }

  user.wishlist.push(book._id);
  await user.save();

  res.status(201).json(user.wishlist);
});

router.delete("/:bookId", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((item) => item.toString() !== req.params.bookId);
  await user.save();
  res.json(user.wishlist);
});

module.exports = router;
