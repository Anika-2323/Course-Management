const Course = require("../models/Course");

const normalizeCoursePayload = (payload = {}) => {
  const normalized = { ...payload };

  if (typeof normalized.instructor === "string") {
    normalized.instructorName = normalized.instructor.trim();
  }
  if (normalized.courseName !== undefined) {
    normalized.title = normalized.courseName;
  }
  if (normalized.overview !== undefined) {
    normalized.description = normalized.overview;
  }

  delete normalized.id;
  delete normalized._id;
  delete normalized.__v;
  delete normalized.createdAt;
  delete normalized.updatedAt;
  delete normalized.courseName;
  delete normalized.overview;
  delete normalized.instructor;

  return normalized;
};

// @desc    Get all courses from MongoDB Atlas
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate({ path: 'instructor', select: 'name email', strictPopulate: false })
      .sort({ createdAt: -1 });

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate({ path: 'instructor', select: 'name email', strictPopulate: false });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Private
const createCourse = async (req, res) => {
  try {
    const instructorId = req.user?._id || req.user?.sub || req.user?.id;
    if (!instructorId) {
      return res.status(401).json({ message: "Authenticated user ID is missing" });
    }

    const newCourse = await Course.create({
      ...normalizeCoursePayload(req.body),
      instructor: instructorId,
    });

    return res.status(201).json(newCourse);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private
const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: normalizeCoursePayload(req.body) },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(400).json({
      message: "Failed to update course",
      error: error.message,
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};