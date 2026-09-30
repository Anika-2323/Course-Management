export function getEnrollmentProgress(enrollment, course) {
  if (course?.modules?.length && Array.isArray(enrollment.completedModules)) {
    return Math.round((enrollment.completedModules.length / course.modules.length) * 100);
  }
  return Math.max(0, Math.min(100, Number(enrollment.progress) || 0));
}