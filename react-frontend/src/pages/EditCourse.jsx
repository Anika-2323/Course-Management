import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function EditCourse() {
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
                    <Link to="/courses" className="btn btn-ghost" style={{padding: "10px 20px", fontSize: "0.8rem"}}>
                        Back to Courses
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
                    <form id="edit-course-form" onSubmit={() => window.eval("updateCourseData(event)")}>
                        <div className="field-row">
                            <div className="field-group">
                                <label htmlFor="edit-course-id">
                                    Course Code (Cannot Change)
                                </label>
                                <input type="text" id="edit-course-id" placeholder="e.g. CS-101" readOnly="" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="edit-course-meta">
                                    Category Tag
                                </label>
                                <input type="text" id="edit-course-meta" placeholder="Enter category (e.g. Module 01 • Automation)" required="" />
                            </div>
                        </div>
                        <div className="field-group">
                            <label htmlFor="edit-course-title">
                                Course Title
                            </label>
                            <input type="text" id="edit-course-title" placeholder="Enter course title..." required="" />
                        </div>
                        <div className="field-group">
                            <label htmlFor="edit-course-desc">
                                Course Description
                            </label>
                            <textarea id="edit-course-desc" placeholder="Enter course description..." required=""></textarea>
                        </div>
                        <div className="field-row">
                            <div className="field-group">
                                <label htmlFor="edit-course-duration">
                                    Course Duration
                                </label>
                                <input type="text" id="edit-course-duration" placeholder="Enter duration (e.g. 8 Weeks)..." required="" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="edit-course-track">
                                    Difficulty Level
                                </label>
                                <select id="edit-course-track" required="">
                                    <option value="" disabled="" selected="">
                                        Select level
                                    </option>
                                    <option value="Foundational">
                                        Beginner
                                    </option>
                                    <option value="Advanced">
                                        Advanced
                                    </option>
                                    <option value="Specialized">
                                        Specialized
                                    </option>
                                    <option value="Labs">
                                        Practical / Labs
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="form-actions" style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px"}}>
                            <button type="button" className="btn-danger-text" onClick={() => window.eval("deleteCourseSchema()")}>
                                Delete Course
                            </button>
                            <div className="action-right" style={{display: "flex", gap: "12px"}}>
                                <Link to="/courses" className="btn btn-ghost">
                                    Cancel
                                </Link>
                                <button type="submit" className="btn btn-burgundy">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </form>
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
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
