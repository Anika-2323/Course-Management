import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CourseContext = createContext(null);

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentsLoading, setEnrollmentsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCourses() {
    try {
      setLoading(true);
      const response = await api.get("/courses");
      setCourses(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch courses:", err);
      setError("Unable to load courses.");
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
      const response = await api.get("/enrolledTracks");
      setEnrollments(response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch enrollments:", err);
      return [];
    } finally {
      setEnrollmentsLoading(false);
    }
  }

  async function addCourse(course) {
    const response = await api.post("/courses", course);
    setCourses((prev) => [...prev, response.data]);
  }

  async function updateCourse(id, updatedCourse) {
    const response = await api.put(`/courses/${id}`, updatedCourse);
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? response.data : c))
    );
  }

  async function deleteCourse(id) {
    await api.delete(`/courses/${id}`);
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  async function enrollInCourse(courseId, studentId, studentName, rollNumber) {
    const { data: existingEnrollments } = await api.get("/enrolledTracks", {
      params: { courseId, studentId }
    });

    if (existingEnrollments.length > 0) {
      const existing = existingEnrollments[0];
      const updated = await api.patch(`/enrolledTracks/${existing.id}`, {
        studentName,
        rollNumber
      });
      setEnrollments((prev) => prev.some((item) => item.id === existing.id)
        ? prev.map((item) => item.id === existing.id ? updated.data : item)
        : [...prev, updated.data]
      );
      return updated.data;
    }

    const response = await api.post("/enrolledTracks", {
      courseId,
      studentId,
      studentName,
      rollNumber,
      completedModules: [],
      progress: 0,
      enrolledAt: new Date().toISOString()
    });
    setEnrollments((prev) => [...prev, response.data]);
    return response.data;
  }

  async function updateEnrollmentProgress(enrollment, course, completedModules) {
    const progress = course.modules?.length
      ? Math.round((completedModules.length / course.modules.length) * 100)
      : 0;
    const response = await api.patch(`/enrolledTracks/${enrollment.id}`, {
      completedModules,
      progress,
      status: progress === 100 ? "completed" : "active"
    });
    setEnrollments((prev) => prev.map((item) => item.id === enrollment.id ? response.data : item));
    return response.data;
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