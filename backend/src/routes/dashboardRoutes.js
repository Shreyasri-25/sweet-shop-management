const express = require("express");
const router = express.Router();

const { getAdminDashboard } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

router.get("/", protect, isAdmin, getAdminDashboard);

module.exports = router;
