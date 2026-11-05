import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { getCompletedCourseModules, getCourseModules } from "../utils/enrollment";

const CourseContext = createContext(null);

function resolveEndpoint(path) {
  const base = api.defaults.baseURL || "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (base.endsWith("/api/v1")) {
    return cleanPath.replace(/^\/?(api\/)?v1\//, "/").replace(/^\/api\//, "/");
  }
  if (base.endsWith("/api")) {
    return cleanPath.replace(/^\/api\//, "/");
  }
  return cleanPath.startsWith("/api") ? cleanPath : `/api${cleanPath}`;
}

function normalizeEnrollment(enrollment) {
  const course = enrollment.course;
  const student = enrollment.student;

  return {
    ...enrollment,
    id: enrollment._id || enrollment.id,
    courseId: enrollment.courseId || (typeof course === "object" ? course?._id : course),
    studentId: enrollment.studentId || (typeof student === "object" ? student?._id : student),
    completedModules: Array.isArray(enrollment.completedModules) ? enrollment.completedModules : []
  };
}

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCourses() {
    try {
      setLoading(true);
      const endpoint = resolveEndpoint("/courses");
      const response = await api.get(endpoint);
      setCourses(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Unable to load courses from database.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, []);

  async function fetchEnrollments() {
    try {
      const endpoint = resolveEndpoint("/enrollments");
      const response = await api.get(endpoint);
      const enrollmentsData = Array.isArray(response.data)
        ? response.data
        : response.data?.enrollments;
      const data = Array.isArray(enrollmentsData) ? enrollmentsData.map(normalizeEnrollment) : [];
      setEnrollments(data);
      return data;
    } catch (err) {
      setEnrollments([]);
      return [];
    } finally {
      setEnrollmentsLoading(false);
    }
  }

  async function addCourse(course) {
    const endpoint = resolveEndpoint("/courses");
    const response = await api.post(endpoint, course);
    setCourses((prev) => [...prev, response.data]);
    return response.data;
  }

  async function updateCourse(id, updatedCourse) {
    const endpoint = resolveEndpoint(`/courses/${id}`);
    const response = await api.put(endpoint, updatedCourse);
    setCourses((prev) =>
      prev.map((c) => (String(c._id || c.id) === String(id) ? response.data : c))
    );
    return response.data;
  }

  async function deleteCourse(id) {
    const endpoint = resolveEndpoint(`/courses/${id}`);
    await api.delete(endpoint);
    setCourses((prev) => prev.filter((c) => String(c._id || c.id) !== String(id)));
  }

  async function enrollInCourse(courseId, studentId, studentName, rollNumber) {
    const endpoint = resolveEndpoint("/enrollments");
    const response = await api.post(endpoint, {
      courseId,
      studentId,
      studentName,
      rollNumber,
      enrolledAt: new Date().toISOString()
    });
    const enrollment = normalizeEnrollment(response.data?.enrollment || response.data);
    setEnrollments((prev) => [...prev, enrollment]);
    return enrollment;
  }

  async function updateEnrollmentProgress(enrollment, course, completedModules) {
    const courseModules = getCourseModules(course);
    const validCompletedModules = getCompletedCourseModules({ completedModules }, course);
    const totalModules = courseModules.length || 1;
    const progress = Math.round((validCompletedModules.length / totalModules) * 100);
    const enrollmentId = enrollment._id || enrollment.id;

    const endpoint = resolveEndpoint(`/enrollments/${enrollmentId}`);
    const response = await api.put(endpoint, {
      completedModules: validCompletedModules,
      progress,
      status: progress === 100 ? "completed" : "active"
    });
    const updatedEnrollment = normalizeEnrollment(response.data?.enrollment || response.data);
    setEnrollments((prev) =>
      prev.map((item) => ((item._id || item.id) === enrollmentId ? updatedEnrollment : item))
    );
    return updatedEnrollment;
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        enrollments,
        enrollmentsLoading,
        loading,
        error,
        fetchCourses,
        addCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        fetchEnrollments,
        updateEnrollmentProgress
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  return useContext(CourseContext);
}