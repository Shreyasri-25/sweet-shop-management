const Order = require("../models/Order");

// ADMIN: Get all orders with user + sweet info
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.sweet", "name category")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllOrders };
