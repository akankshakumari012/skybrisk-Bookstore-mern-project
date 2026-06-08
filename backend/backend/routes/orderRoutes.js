const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { paymentMethod = "Cash on Delivery" } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.book");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Your cart is empty" });
  }

  const orderItems = cart.items.map((item) => ({
    book: item.book._id,
    title: item.title,
    price: item.price,
    image: item.image,
    quantity: item.quantity,
  }));

  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    orderItems,
    totalPrice,
    paymentMethod,
    status: "Processing",
    isPaid: true,
    paidAt: new Date(),
  });

  cart.items = [];
  await cart.save();

  res.status(201).json({ message: "Order placed successfully", order });
});

router.get("/", auth, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.book");
  res.json(orders);
});

router.get("/all", auth, admin, async (req, res) => {
  const orders = await Order.find().populate("user", "name email").populate("orderItems.book");
  res.json(orders);
});

module.exports = router;
// Get Single Order
router.get("/:id", auth, async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("orderItems.book");

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.json(order);
});

// Update Order Status (Admin)
router.put("/:id/status", auth, admin, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  order.status = req.body.status || order.status;

  const updatedOrder = await order.save();

  res.json(updatedOrder);
});
