import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import { getEnrollmentProgress } from "../utils/enrollment";
import PageCss from "../components/PageCss";

export default function AdminDashboard() {
    const { logoutAdmin } = useAuth();
    const { courses, enrollments, loading, deleteCourse } = useCourses();
    const [error, setError] = useState("");
    const completedEnrollments = enrollments.filter((enrollment) =>
        getEnrollmentProgress(enrollment, courses.find((course) => String(course.id) === String(enrollment.courseId))) === 100
    );
    const enrolledStudentCount = new Set(enrollments.map((enrollment) => enrollment.studentId)).size;

    async function handleDelete(course) {
        if (!window.confirm(`Delete ${course.courseName}? This cannot be undone.`)) return;
        try {
            setError("");
            await deleteCourse(course.id);
        } catch (deleteError) {
            console.error("Failed to delete course:", deleteError);
            setError("Unable to delete the course. Please try again.");
        }
    }

    function handleSignOut() {
        logoutAdmin();
        window.location.assign("/");
    }

    return (
        <>
            <PageCss href="/css/style.css" />
                        {/* Dashboard Navigation Header */}
            <header className="site-header">
                <div className="wrap">
                    <div className="brand">
                        <svg className="crest" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="21"></circle>
                            <circle cx="24" cy="24" r="16"></circle>
                            <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                            <line x1="24" y1="31" x2="24" y2="37"></line>
                            <line x1="20" y1="37" x2="28" y2="37"></line>
                        </svg>
                        <div>
                            <span className="brand-name">
                                SkillTrack
                            </span>
                            <span className="brand-sub">
                                Admin Panel
                            </span>
                        </div>
                    </div>
                    <nav className="nav-links">
                        <Link to="/courses" className="btn btn-ghost">
                            Go to Courses
                        </Link>
                        <Link to="/add-course" className="btn btn-burgundy">
                            Add Course
                        </Link>
                        <button onClick={handleSignOut} className="btn btn-ghost">
                            Sign Out
                        </button>
                    </nav>
                </div>
            </header>
            {/* Workspace Shell */}
            <main className="wrap">
                <div className="db-header">
                    <div className="section-eyebrow">
                        Admin Panel
                    </div>
                    <h1 className="db-title">
                        Dashboard Overview
                    </h1>
                    <p style={{margin: "0", opacity: "0.7", fontSize: "0.95rem"}}>
                        Track student registrations, total courses, active enrollments, and course completion rates.
                    </p>
                </div>
                {/* Analytics Dashboard Metrics Row */}
                <section className="metrics-grid">
                    {/* Metric 1: Total Students */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Students With Enrollments
                        </div>
                        <div className="metric-value">
                            {enrolledStudentCount}
                        </div>
                        <p className="metric-desc">
                            Distinct students with at least one course enrollment.
                        </p>
                    </div>
                    {/* Metric 2: Total Courses */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Total Courses
                        </div>
                        <div className="metric-value" id="course-count-display">
                            {courses.length}
                        </div>
                        <p className="metric-desc">
                            Total active courses published in the course catalog.
                        </p>
                    </div>
                    {/* Metric 3: Active Enrollments */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Total Enrollments
                        </div>
                        <div className="metric-value">
                            {enrollments.length}
                        </div>
                        <p className="metric-desc">
                            Total course enrollments across all student accounts.
                        </p>
                    </div>
                    {/* Metric 4: Completion Reports */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Completed Courses
                        </div>
                        <div className="metric-value">
                            {completedEnrollments.length}
                        </div>
                        <p className="metric-desc">
                            Total number of courses completed by students.
                        </p>
                    </div>
                </section>
                <section className="section" style={{paddingTop: "20px", paddingBottom: "60px"}}>
                    <div className="workspace-header">
                        <div>
                            <h2 className="workspace-title">Course Registry</h2>
                            <p style={{margin: 0, opacity: "0.7"}}>Manage courses stored in the mock API database.</p>
                        </div>
                    </div>
                    {error && <p className="notice show error" role="alert">{error}</p>}
                    {loading ? <p>Loading courses...</p> : courses.length === 0 ? <p>No courses have been added yet.</p> : (
                        <div className="course-grid">
                            {courses.map((course) => (
                                <article className="course-card" key={course.id}>
                                    <div>
                                        <div className="course-meta">{course.courseCode} • {course.category}</div>
                                        <h3>{course.courseName}</h3>
                                        <p className="course-desc">{course.overview}</p>
                                        <div className="course-details-row">
                                            <span><strong>Duration:</strong> {course.duration}</span>
                                            <span><strong>Level:</strong> {course.level}</span>
                                        </div>
                                        <p className="course-meta">
                                            {enrollments.filter((enrollment) => String(enrollment.courseId) === String(course.id)).length} student enrollments
                                        </p>
                                    </div>
                                    <div className="course-actions">
                                        <Link to={`/edit-course?id=${encodeURIComponent(course.id)}`} className="btn btn-ghost">Edit</Link>
                                        <button className="btn btn-ghost" onClick={() => handleDelete(course)}>Delete</button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    <span style={{fontSize: "0.9rem", fontWeight: "500"}}>
                        SkillTrack
                    </span>
                    <div className="footer-note">
                        © 2026 Admin Dashboard Environment.
                    </div>
                </div>
            </footer>
        </>
    );
}
