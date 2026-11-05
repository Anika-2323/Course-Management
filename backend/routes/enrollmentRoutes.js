const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  updateProgress,
  getProgressByCourse
} = require("../controllers/enrollmentController");

router.use(authMiddleware);

router.get("/", getEnrollments);
router.post("/", createEnrollment);
router.put("/progress", updateProgress);
router.get("/progress/:courseId", getProgressByCourse);
router.put("/:id", updateEnrollment);

module.exports = router;