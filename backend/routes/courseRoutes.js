const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require("../controllers/courseController");

router.route("/")
  .get(getCourses)
  .post(authMiddleware, createCourse);

router.route("/:id")
  .get(getCourseById)
  .put(authMiddleware, updateCourse)
  .delete(authMiddleware, deleteCourse);

module.exports = router;