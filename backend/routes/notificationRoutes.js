const express = require("express");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.sub || req.user.id;
    const notifications = await Notification.find({ recipient: userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ notifications });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/read", authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.sub || req.user.id;
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, recipient: userId },
      { $set: { isRead: true } },
      { new: true }
    );
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }
    res.json({ notification });
  } catch (error) {
    next(error);
  }
});

module.exports = router;