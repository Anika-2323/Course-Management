const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");
const connectDB = require("../config/db");

jest.setTimeout(15000);

describe("Core API Health & Authentication Integration Suite", () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  // 1. Health Check Test
  test("GET /api/health should return 200 with healthy status", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Backend is healthy");
  });

  // 2. Auth Rejection Test
  test("POST /api/v1/auth/login with invalid credentials returns 401", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "nonexistent_student@institute.edu",
        password: "IncorrectPassword123"
      });
    expect(res.statusCode).toBe(401);
  });

  // 3. Protected Route Without Token Test
  test("GET /api/v1/enrollments without Bearer token returns 401", async () => {
    const res = await request(app).get("/api/v1/enrollments");
    expect(res.statusCode).toBe(401);
  });
});