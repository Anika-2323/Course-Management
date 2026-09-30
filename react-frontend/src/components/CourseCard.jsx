import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";

export default function CourseCard({ course }) {
  const navigate = useNavigate();
  const { loggedInStudent, loggedInAdmin } = useAuth();
  const { enrollments, enrollInCourse } = useCourses();
  const [enrolling, setEnrolling] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [studentName, setStudentName] = useState(loggedInStudent?.name || "");
  const [rollNumber, setRollNumber] = useState(loggedInStudent?.academicId || loggedInStudent?.studentId || "");
  const [error, setError] = useState("");
  const {
    id,
    courseCode,
    courseName,
    overview,
    duration,
    level,
    category
  } = course;
  const studentId = loggedInStudent?.academicId || loggedInStudent?.studentId;
  const alreadyEnrolled = enrollments.some((enrollment) =>
    String(enrollment.courseId) === String(id) && String(enrollment.studentId) === String(studentId)
  );

  function handleEnroll() {
    if (!loggedInStudent) {
      navigate(`/student-login?redirect=${encodeURIComponent("/courses")}`);
      return;
    }

    if (!studentId) {
      setError("Your student ID is missing. Please sign in again.");
      return;
    }

    setError("");
    setStudentName(loggedInStudent.name || "");
    setRollNumber(loggedInStudent.academicId || loggedInStudent.studentId || "");
    setConfirming(true);
  }

  async function confirmEnrollment(event) {
    event.preventDefault();
    setEnrolling(true);
    setError("");
    try {
      await enrollInCourse(id, studentId, studentName.trim(), rollNumber.trim());
      navigate("/enrollment-success", { state: { courseId: id, courseName } });
    } catch (enrollError) {
      console.error("Failed to enroll in course:", enrollError);
      setError("Unable to save your enrollment. Please try again.");
    } finally {
      setEnrolling(false);
    }
  }

  return (
    <div className="course-card" data-course-id={courseCode || id}>
      <div>
        <div className="course-meta">
          {courseCode || "CS-101"} • {category || "Core Track"}
        </div>
        <h3>{courseName}</h3>
        <p className="course-desc">{overview}</p>
        <div className="course-details-row">
          <span>
            <strong>Duration:</strong> {duration}
          </span>
          <span>
            <strong>Track:</strong> {level}
          </span>
        </div>
      </div>
      <div className="course-actions">
        <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling || alreadyEnrolled}>
          {alreadyEnrolled ? "Enrolled" : "Enroll"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => navigate(loggedInAdmin ? "/admin-dashboard" : `/admin-login?courseId=${encodeURIComponent(id)}`)}
        >
          Edit Schema
        </button>
      </div>
      {error && <p className="notice error show" role="alert">{error}</p>}
      {confirming && (
        <div className="modal-overlay open" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget && !enrolling) setConfirming(false);
        }}>
          <section className="modal-content" role="dialog" aria-modal="true" aria-labelledby={`enroll-title-${id}`}>
            <button className="modal-close" type="button" aria-label="Close enrollment form" onClick={() => setConfirming(false)}>×</button>
            <h3 id={`enroll-title-${id}`}>Confirm enrollment</h3>
            <p>{courseName}</p>
            <form onSubmit={confirmEnrollment}>
              <div className="form-group">
                <label htmlFor={`student-name-${id}`}>Student name</label>
                <input id={`student-name-${id}`} value={studentName} onChange={(event) => setStudentName(event.target.value)} required autoComplete="name" />
              </div>
              <div className="form-group">
                <label htmlFor={`roll-number-${id}`}>Roll number</label>
                <input id={`roll-number-${id}`} value={rollNumber} onChange={(event) => setRollNumber(event.target.value)} required />
              </div>
              {error && <p className="notice error show" role="alert">{error}</p>}
              <div className="modal-actions">
                <button className="btn btn-ghost" type="button" onClick={() => setConfirming(false)} disabled={enrolling}>Cancel</button>
                <button className="btn btn-primary" type="submit" disabled={enrolling}>{enrolling ? "Enrolling..." : "Enroll"}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}