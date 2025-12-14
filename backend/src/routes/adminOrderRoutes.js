const express = require("express");
const router = express.Router();

const { getAllOrders } = require("../controllers/adminOrderController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

// Admin only: view all orders
router.get("/", protect, isAdmin, getAllOrders);

module.exports = router;
