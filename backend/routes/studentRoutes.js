const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/directory", authMiddleware, async (req, res, next) => {
  try {
    const currentUserId = req.user.sub || req.user.id;
    // Find all users with role 'student' except the requester
    const students = await User.find({
      _id: { $ne: currentUserId },
      role: "student"
    })
      .select("_id name email")
      .sort({ name: 1 })
      .lean();

    res.json({ students });
  } catch (error) {
    next(error);
  }
});

module.exports = router;