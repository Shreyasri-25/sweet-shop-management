const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("../routes/authRoutes");
const sweetRoutes = require("../routes/sweetRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

let adminToken = "";
let sweetId = "";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // 1️⃣ Register admin via API
  await request(app).post("/api/auth/register").send({
    name: "Admin User",
    email: "admin_unique@example.com",
    password: "password123",
  });

  // 2️⃣ Login admin
  const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
      email: "admin_unique@example.com",
      password: "password123",
    });

  adminToken = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet API Tests", () => {
  it("should NOT allow non-admin to add sweet", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "Barfi",
        category: "Indian",
        price: 15,
        quantity: 10,
      });

    // Because user is not admin yet
    expect(res.statusCode).toBe(403);
  });
});
