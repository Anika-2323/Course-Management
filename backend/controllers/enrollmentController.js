const { randomUUID } = require("crypto");
const enrollments = require("../data/enrollments");

const getEnrollments = (req, res) => {
  const filteredEnrollments = enrollments.filter((enrollment) =>
    Object.entries(req.query).every(([key, value]) =>
      String(enrollment[key]) === String(value)
    )
  );

  return res.status(200).json(filteredEnrollments);
};

const createEnrollment = (req, res) => {
  const { courseId, studentId } = req.body || {};

  if (!courseId || !studentId) {
    return res.status(400).json({
      message: "courseId and studentId are required"
    });
  }

  const enrollment = {
    ...req.body,
    id: randomUUID(),
    courseId: String(courseId),
    studentId: String(studentId)
  };

  enrollments.push(enrollment);
  return res.status(201).json(enrollment);
};

const updateEnrollment = (req, res) => {
  const enrollment = enrollments.find((item) => String(item.id) === req.params.id);

  if (!enrollment) {
    return res.status(404).json({ message: "Enrollment not found" });
  }

  Object.assign(enrollment, req.body, { id: enrollment.id });
  return res.status(200).json(enrollment);
};

module.exports = {
  getEnrollments,
  createEnrollment,
  updateEnrollment
};
