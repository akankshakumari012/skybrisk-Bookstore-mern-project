const express = require("express");
const Cart = require("../models/Cart");
const Book = require("../models/Book");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.book");
  res.json(cart ? cart.items : []);
});

router.post("/", auth, async (req, res) => {
  const { bookId, quantity = 1 } = req.body;

  if (!bookId) {
    return res.status(400).json({ message: "Book ID is required" });
  }

  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (book.stock < 1) {
    return res.status(400).json({ message: "Book is out of stock" });
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
    });
  }

  const itemIndex = cart.items.findIndex((item) => item.book.toString() === bookId);

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      book: book._id,
      title: book.title,
      price: book.price,
      image: book.image,
      quantity,
    });
  }

  await cart.save();

  res.status(200).json(cart.items);
});

router.put("/", auth, async (req, res) => {
  const { bookId, quantity } = req.body;

  if (!bookId || quantity == null) {
    return res.status(400).json({ message: "Book ID and quantity are required" });
  }

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.items.findIndex((item) => item.book.toString() === bookId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  if (quantity < 1) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
  }

  await cart.save();

  res.json(cart.items);
});

router.delete("/:bookId", auth, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  const itemIndex = cart.items.findIndex((item) => item.book.toString() === req.params.bookId);

  if (itemIndex === -1) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  res.json(cart.items);
});

module.exports = router;
