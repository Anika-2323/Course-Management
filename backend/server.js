require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const http = require("http");
const connectDB = require("./config/db");
const initializeSocket = require("./config/socket");

const app = express();
const server = http.createServer(app);
initializeSocket(server);

// -------------------------
// Security & Core Middleware
// -------------------------
app.use(helmet());

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const cleanOrigin = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(cleanOrigin)) {
      return callback(null, true);
    }
    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options(/(.*)/, cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// -------------------------
// Test & Health Check Routes
// -------------------------
app.get("/", (req, res) => {
  res.json({ message: "Student Course Management API is running" });
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
const studentRoutes = require("./routes/studentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const messageRoutes = require("./routes/messageRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const errorHandler = require("./middleware/errorHandler");

app.use("/api/v1/profile", profileRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/v1/enrollments", enrollmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/students", studentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/v1/messages", messageRoutes);

// Unknown API Route Handler (Task 14, Activity 14.4)
app.use((req, res) => {
  res.status(404).json({
    message: "API endpoint not found"
  });
});
// Centralized Error Handling Middleware
app.use(errorHandler);

// -------------------------
// Process-Level Exception Handlers (Task 14, Activity 14.10)
// -------------------------
process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
  process.exit(1);
});

// -------------------------
// Start Server with Database
// -------------------------
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  (async () => {
    try {
      await connectDB();
      server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  })();
}

module.exports = app;