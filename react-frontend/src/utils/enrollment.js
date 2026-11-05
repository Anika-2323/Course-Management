export function getCourseModules(course) {
  const modules = Array.isArray(course?.modules) ? course.modules : [];
  const lessons = Array.isArray(course?.lessons) ? course.lessons : [];
  const items = modules.length ? modules : lessons;

  return items
    .map((item) => (typeof item === "string" ? item : item?.title))
    .filter((title) => typeof title === "string" && title.trim().length > 0)
    .map((title) => title.trim());
}

export function getEnrollmentCourse(enrollment, courses) {
  const enrolledCourse = enrollment?.course;
  const courseId = enrollment?.courseId ||
    (typeof enrolledCourse === "object" ? enrolledCourse?._id || enrolledCourse?.id : enrolledCourse);

  return courses.find((course) => String(course._id || course.id) === String(courseId)) ||
    (typeof enrolledCourse === "object" ? enrolledCourse : null);
}

export function getCompletedCourseModules(enrollment, course) {
  const modules = getCourseModules(course);
  const completedModules = Array.isArray(enrollment?.completedModules)
    ? new Set(enrollment.completedModules.filter((module) => typeof module === "string").map((module) => module.trim()))
    : new Set();

  return modules.filter((module) => completedModules.has(module.trim()));
}

export function getEnrollmentProgress(enrollment, course) {
  const modules = getCourseModules(course);
  if (modules.length && Array.isArray(enrollment?.completedModules)) {
    const completedModules = getCompletedCourseModules(enrollment, course);
    return Math.min(100, Math.round((completedModules.length / modules.length) * 100));
  }
  return Math.max(0, Math.min(100, Number(enrollment.progress) || 0));
}