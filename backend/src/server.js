const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */

// CORS configuration (IMPORTANT for Vercel frontend)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend (Vite)
      "https://sweet-shop-frontend.vercel.app", // deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Parse JSON body
app.use(express.json());

/* -------------------- ROUTES -------------------- */

app.get("/", (req, res) => {
  res.send("Sweet Shop API is running 🍬");
});

// Auth routes
app.use("/api/auth", require("./routes/authRoutes"));

// Sweet routes
app.use("/api/sweets", require("./routes/sweetRoutes"));

app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use("/api/orders", require("./routes/orderRoutes"));

app.use("/api/admin/orders", require("./routes/adminOrderRoutes"));
app.use("/api/orders/my", require("./routes/userOrderRoutes"));
app.use("/api/admin/dashboard", require("./routes/adminDashboardRoutes"));






/* -------------------- ERROR HANDLING -------------------- */

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Server error",
    error: err.message,
  });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
