import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCourses } from "../context/CourseContext";
import CourseForm from "../components/CourseForm";
import PageCss from "../components/PageCss";

export default function AddCourse() {
    const { addCourse } = useCourses();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleSubmit(course) {
        try {
            setError("");
            await addCourse(course);
            navigate("/admin-dashboard");
        } catch (saveError) {
            console.error("Failed to add course:", saveError);
            setError("Unable to publish the course. Please try again.");
        }
    }

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
                        <div className="section-eyebrow">
                            Course Management
                        </div>
                        <h1 className="config-title">
                            Add New Course
                        </h1>
                        <p style={{margin: "0", opacity: "0.7", fontSize: "0.95rem"}}>
                            Fill out the course information below to publish it to the student catalog.
                        </p>
                    </div>
                    <CourseForm submitLabel="Publish Course" onSubmit={handleSubmit} error={error} />
                </div>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    <span style={{fontSize: "0.9rem", fontWeight: "500"}}>
                        SkillTrack Authority System
                    </span>
                    <div className="footer-note">
                        © 2026 SkillTrack. All rights reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
