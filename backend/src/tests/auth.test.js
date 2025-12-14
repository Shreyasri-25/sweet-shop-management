const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("../routes/authRoutes");

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Auth API Tests", () => {
  const user = {
    name: "Test User",
    email: "testuser_unique@example.com",
    password: "password123",
  };

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(user);

    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(user.email);
  });

  it("should login the registered user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: user.email,
        password: user.password,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
