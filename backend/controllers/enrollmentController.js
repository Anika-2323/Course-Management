const mongoose = require("mongoose");
const Enrollment = require("../models/Enrollment");
const LearningProgress = require("../models/LearningProgress");
const Course = require("../models/Course");

async function getEnrollments(req, res, next) {
  try {
    const filter = { status: { $ne: "withdrawn" } };
    if (req.user.role !== "admin") {
      filter.student = req.user.sub || req.user.id;
    }

    const enrollments = await Enrollment.find(filter)
      .populate("course")
      .populate("student")
      .lean();
    res.json({ enrollments });
  } catch (error) {
    next(error);
  }
}

async function createEnrollment(req, res, next) {
  try {
    const studentId = req.user.sub || req.user.id;
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    let enrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (enrollment) {
      if (enrollment.status === "withdrawn") {
        enrollment.status = "active";
        await enrollment.save();
        return res.json({ message: "Enrollment reactivated", enrollment });
      }
      return res.status(409).json({ message: "Already enrolled in this course" });
    }

    enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
      status: "active"
    });

    await LearningProgress.findOneAndUpdate(
      { student: studentId, course: courseId },
      { $setOnInsert: { completedLessons: [], progressPercentage: 0 } },
      { upsert: true, new: true }
    );

    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (error) {
    next(error);
  }
}

async function updateEnrollment(req, res, next) {
  try {
    const { id } = req.params;
    const { status, completedModules } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid enrollment ID" });
    }

    const updates = {};
    if (status !== undefined) updates.status = status;
    if (completedModules !== undefined) {
      if (!Array.isArray(completedModules) || completedModules.some((module) => typeof module !== "string")) {
        return res.status(400).json({ message: "Completed modules must be an array of titles" });
      }

      const existingEnrollment = await Enrollment.findById(id).populate("course");
      if (!existingEnrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      const course = existingEnrollment.course;
      if (!course) {
        return res.status(404).json({ message: "Course not found for this enrollment" });
      }
      const courseModules = (course.modules?.length ? course.modules : course.lessons || [])
        .map((module) => (typeof module === "string" ? module : module?.title))
        .filter((title) => typeof title === "string" && title.trim().length > 0)
        .map((title) => title.trim());
      const availableModules = new Set(courseModules);
      updates.completedModules = [...new Set(completedModules.map((module) => module.trim()).filter((module) => availableModules.has(module)))];
      const totalModules = courseModules.length;
      updates.progress = totalModules
        ? Math.min(100, Math.round((updates.completedModules.length / totalModules) * 100))
        : 0;
      if (status === undefined) {
        updates.status = updates.progress === 100 ? "completed" : "active";
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No enrollment updates provided" });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.json({ message: "Enrollment updated", enrollment });
  } catch (error) {
    next(error);
  }
}

async function updateProgress(req, res, next) {
  try {
    const studentId = req.user.sub || req.user.id;
    const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({ message: "Course ID and Lesson ID are required" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const totalLessons = course.lessons?.length || 1;

    let progress = await LearningProgress.findOne({ student: studentId, course: courseId });
    if (!progress) {
      progress = new LearningProgress({
        student: studentId,
        course: courseId,
        completedLessons: [],
        totalLessons,
        progressPercentage: 0
      });
    }

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }

    progress.totalLessons = totalLessons;
    progress.progressPercentage = Math.round((progress.completedLessons.length / totalLessons) * 100);
    await progress.save();

    if (progress.progressPercentage === 100) {
      await Enrollment.findOneAndUpdate(
        { student: studentId, course: courseId },
        { $set: { status: "completed" } }
      );
    }

    res.json({ message: "Progress updated", progress });
  } catch (error) {
    next(error);
  }
}

async function getProgressByCourse(req, res, next) {
  try {
    const studentId = req.user.sub || req.user.id;
    const { courseId } = req.params;

    if (!mongoose.isValidObjectId(courseId)) {
      return res.status(400).json({ message: "Invalid Course ID" });
    }

    const progress = await LearningProgress.findOne({ student: studentId, course: courseId }).lean();
    res.json({ progress: progress || { completedLessons: [], progressPercentage: 0 } });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEnrollments,
  createEnrollment,
  updateEnrollment,
  updateProgress,
  getProgressByCourse
};