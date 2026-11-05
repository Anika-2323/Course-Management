const express = require("express");
const router = express.Router();
const authModule = require("../middleware/authMiddleware");
const authMiddleware = authModule.protect || authModule;

const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

router.route("/")
  .get(getCourses)
  .post(authMiddleware, createCourse);

router.route("/:id")
  .get(getCourseById)
  .put(authMiddleware, updateCourse)
  .delete(authMiddleware, deleteCourse);

module.exports = router;