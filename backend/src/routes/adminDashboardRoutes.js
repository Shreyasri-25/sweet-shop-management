const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/isAdmin");
const {
  getAdminDashboardStats,
} = require("../controllers/adminDashboardController");

router.get("/", authMiddleware, isAdmin, getAdminDashboardStats);

module.exports = router;
