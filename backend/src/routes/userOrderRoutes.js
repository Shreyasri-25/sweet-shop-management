const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("sweet", "name category price")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

module.exports = router;
