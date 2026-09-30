import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useCourses } from "../context/CourseContext";
import CourseForm from "../components/CourseForm";
import PageCss from "../components/PageCss";

export default function EditCourse() {
    const [searchParams] = useSearchParams();
    const courseId = searchParams.get("id");
    const { courses, loading, updateCourse, deleteCourse } = useCourses();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const course = courses.find((item) => String(item.id) === courseId);

    async function handleSubmit(updatedCourse) {
        try {
            setError("");
            await updateCourse(course.id, updatedCourse);
            navigate("/admin-dashboard");
        } catch (saveError) {
            console.error("Failed to update course:", saveError);
            setError("Unable to save course changes. Please try again.");
        }
    }

    async function handleDelete() {
        if (!window.confirm(`Delete ${course.courseName}? This cannot be undone.`)) return;
        try {
            await deleteCourse(course.id);
            navigate("/admin-dashboard");
        } catch (deleteError) {
            console.error("Failed to delete course:", deleteError);
            setError("Unable to delete the course. Please try again.");
        }
    }

    if (loading) return <main className="wrap section">Loading course...</main>;
    if (!course) return <main className="wrap section"><p className="notice show error">Course not found.</p><Link to="/admin-dashboard">Back to Admin Dashboard</Link></main>;

    return (
        <>
            <PageCss href="/css/style.css" />
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
                    <Link to="/admin-dashboard" className="btn btn-ghost" style={{padding: "10px 20px", fontSize: "0.8rem"}}>
                        Admin Dashboard
                    </Link>
                </div>
            </header>
            <main className="wrap">
                <div className="config-container">
                    <div className="config-header">
                        <div className="section-eyebrow" id="edit-eyebrow">
                            Course Settings
                        </div>
                        <h1 className="config-title" id="edit-title">
                            Edit Course Details
                        </h1>
                        <p style={{margin: "0", opacity: "0.7", fontSize: "0.95rem"}}>
                            Update the title, description, duration, or category for this course.
                        </p>
                    </div>
                    <CourseForm course={course} submitLabel="Save Changes" onSubmit={handleSubmit} onDelete={handleDelete} error={error} />
                </div>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    <span style={{fontSize: "0.9rem", fontWeight: "500"}}>
                        SkillTrack Portal
                    </span>
                    <div className="footer-note">
                        © 2026 SkillTrack. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
