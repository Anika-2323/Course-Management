const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();

const app = express();

// -------------------------
// Middleware
// -------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -------------------------
// Test & Health Check Routes
// -------------------------
app.get("/", (req, res) => {
  res.json({
    message: "Student Course Management API is running"
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
    timestamp: new Date().toISOString()
  });
});

// -------------------------
// API Routes
// -------------------------
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");

// Mount course routes under both /api/courses and /api/v1/courses for compatibility
app.use("/api/courses", courseRoutes);
app.use("/api/v1/courses", courseRoutes);

// Mount authentication routes under /api/v1/auth
app.use("/api/v1/auth", authRoutes);
app.use("/enrolledTracks", enrollmentRoutes);

// -------------------------
// Global Error Handler
// -------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error"
  });
});

// -------------------------
// Server
// -------------------------
const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;