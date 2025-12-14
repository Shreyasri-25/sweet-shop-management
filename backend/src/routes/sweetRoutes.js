const express = require("express");
const router = express.Router();

const {
  getSweets,
  createSweet,
  updateSweet,
  deleteSweet,
  restockSweet,
} = require("../controllers/sweetController");

const { protect } = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/isAdmin");

// Public
router.get("/", getSweets);

// Admin
router.post("/", protect, isAdmin, createSweet);
router.put("/:id", protect, isAdmin, updateSweet);
router.delete("/:id", protect, isAdmin, deleteSweet);
router.post("/:id/restock", protect, isAdmin, restockSweet);

module.exports = router;
