import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AddCourse() {
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
                    {/* Fixed link: Points directly to courses.html */}
                    <Link to="/courses" className="btn btn-ghost" style={{padding: "10px 20px", fontSize: "0.8rem"}}>
                        Return to Courses
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
                    <form id="add-course-form" onSubmit={() => window.eval("verifyAndCommitCourse(event)")}>
                        <div className="field-row">
                            <div className="field-group">
                                <label htmlFor="course-id">
                                    Course Code
                                </label>
                                <input type="text" id="course-id" required="" placeholder="e.g. CS-402" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="course-meta">
                                    Category Tag
                                </label>
                                <input type="text" id="course-meta" required="" placeholder="e.g. Module 04 • Artificial Intelligence" />
                            </div>
                        </div>
                        <div className="field-group">
                            <label htmlFor="course-title">
                                Course Title
                            </label>
                            <input type="text" id="course-title" required="" placeholder="e.g. Deep Learning and Neural Networks" />
                        </div>
                        <div className="field-group">
                            <label htmlFor="course-desc">
                                Course Description
                            </label>
                            <textarea id="course-desc" required="" placeholder="Enter course description..."></textarea>
                        </div>
                        <div className="field-row">
                            <div className="field-group">
                                <label htmlFor="course-duration">
                                    Course Duration
                                </label>
                                <input type="text" id="course-duration" required="" placeholder="e.g. 8 Weeks" />
                            </div>
                            <div className="field-group">
                                <label htmlFor="course-track">
                                    Difficulty Level
                                </label>
                                <select id="course-track" required="">
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
                        <div className="field-group">
                            <label htmlFor="course-tasks">
                                Syllabus Modules (Comma-Separated)
                            </label>
                            <textarea id="course-tasks" placeholder="e.g. Introduction to Neural Networks, CNNs, Transformers, Final Project" style={{minHeight: "80px"}} required=""></textarea>
                            <small style={{opacity: "0.6", display: "block", marginTop: "4px"}}>
                                Separate module titles with a comma (,). These form your course checklist.
                            </small>
                        </div>
                        <div className="form-actions" style={{display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px"}}>
                            {/* Fixed link: Points directly to courses.html */}
                            <Link to="/courses" className="btn btn-ghost">
                                Cancel
                            </Link>
                            <button type="submit" className="btn btn-burgundy">
                                Publish Course
                            </button>
                        </div>
                    </form>
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
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
