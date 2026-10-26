const courses = require("../data/courses");

const normalizeCourse = (course = {}) => ({
  id: String(course.id ?? ""),
  courseCode: course.courseCode || "",
  courseName: course.courseName || "",
  category: course.category || "General",
  level: course.level || "Beginner",
  duration: course.duration || "8 Weeks",
  overview: course.overview || "",
  modules: Array.isArray(course.modules) ? course.modules : [],
  instructor: course.instructor || "TBA",
  status: course.status || "Active"
});

const getCourses = (req, res) => {
  res.status(200).json(courses);
};

const getCourseById = (req, res) => {
  const { id } = req.params;
  const course = courses.find((item) => String(item.id) === String(id));

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  return res.status(200).json(course);
};

const createCourse = (req, res) => {
  const payload = req.body || {};

  if (!payload.courseName || !payload.courseCode) {
    return res.status(400).json({ message: "courseName and courseCode are required" });
  }

  const nextId = String(
    courses.length ? Number(courses[courses.length - 1].id) + 1 : 1
  );

  const newCourse = normalizeCourse({
    ...payload,
    id: payload.id || nextId,
    status: payload.status || "Active"
  });

  courses.push(newCourse);
  return res.status(201).json(newCourse);
};

const updateCourse = (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((course) => String(course.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  const updatedCourse = normalizeCourse({
    ...courses[index],
    ...req.body,
    id: id
  });

  courses[index] = updatedCourse;
  return res.status(200).json(updatedCourse);
};

const deleteCourse = (req, res) => {
  const { id } = req.params;
  const index = courses.findIndex((course) => String(course.id) === String(id));

  if (index === -1) {
    return res.status(404).json({ message: "Course not found" });
  }

  const [deletedCourse] = courses.splice(index, 1);
  return res.status(200).json(deletedCourse);
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};