import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Courses() {
    return (
        <>
            <PageCss href="/css/style.css" />
                        {/* Sticky Top Navigation */}
            {/* Sticky Top Navigation */}
            <header className="site-header">
                <div className="wrap">
                    <Link to="/" className="brand">
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
                                Curriculum & Learning
                            </span>
                        </div>
                    </Link>
                    <nav className="nav-links">
                        <Link to="/" className="nav-item">
                            Home
                        </Link>
                        <Link to="/courses" className="nav-item" style={{opacity: "1", fontWeight: "600"}}>
                            Courses
                        </Link>
                        {/* Dynamic Portal Interface Container Elements */}
                        <div id="nav-actions-wrapper" style={{display: "flex", alignItems: "center", gap: "12px"}}>
                            <Link to="/student-dashboard" id="nav-auth-btn" className="btn btn-ghost">
                                Portal Login
                            </Link>
                            {/* Pointing to the self-contained session wiper */}
                            <button onClick={() => window.eval("handleGlobalSessionLogout()")} className="btn btn-ghost" id="nav-logout-btn" style={{display: "none", opacity: "0.7"}}>
                                Sign Out
                            </button>
                        </div>
                        {/* Notification Bell Placed To the Right of Sign Out Wrapper */}
                        <Link to="/notifications" className="notif-bell-btn" title="View Notifications" style={{textDecoration: "none", marginLeft: "12px"}}>
                            <span>
                                🔔
                            </span>
                            <span id="header-notif-badge" className="notif-badge">
                                0
                            </span>
                        </Link>
                    </nav>
                </div>
            </header>
            {/* Core Content Container */}
            <main className="wrap section">
                <div className="catalog-hero">
                    <div className="section-eyebrow">
                        Academic Catalog
                    </div>
                    <h1 className="catalog-title">
                        Available Courses
                    </h1>
                    <p className="catalog-subtitle">
                        Select architectures engineered for advanced technological design, technical optimization, and high-performance framework design.
                    </p>
                </div>
                {/* Administrative Quick-Action Controller Strip */}
                {/* Administrative Quick-Action Controller Strip */}
                <div className="admin-bar" id="admin-bar" style={{display: "none"}}>
                    <div className="admin-bar-info">
                        <h4>
                            Administrative Operations Active
                        </h4>
                        <p>
                            System credentials verified. Authorization clear for direct schema modification.
                        </p>
                    </div>
                    <div>
                        <Link to="/add-course" className="btn btn-burgundy">
                            Add New Course
                        </Link>
                        {/* Point this to handleGlobalSessionLogout directly */}
                        <button onClick={() => window.eval("handleGlobalSessionLogout()")} className="btn btn-ghost" style={{color: "var(--parchment)", borderColor: "var(--parchment)", padding: "10px 16px", marginLeft: "10px"}}>
                            Log Out Admin
                        </button>
                    </div>
                </div>
                {/* Courses Grid Matrix */}
                <div className="course-grid">
                    {/* Course 1 */}
                    <div className="course-card" data-course-id="CS-101">
                        <div>
                            <div className="course-meta">
                                Module 01 • Advanced Automation
                            </div>
                            <h3>
                                Python and Java Architecture Systems
                            </h3>
                            <p className="course-desc">
                                A deep dive study focused on systemic structural testing, enterprise architectural design implementation, and optimization patterns.
                            </p>
                            <div className="course-details-row">
                                <span>
                                    <strong>
                                        Duration:
                                    </strong>
                                    8 Weeks
                                </span>
                                <span>
                                    <strong>
                                        Track:
                                    </strong>
                                    Advanced
                                </span>
                            </div>
                        </div>
                        <div className="course-actions">
                            <button className="btn btn-primary" onClick={() => window.eval("handleEnrollment('CS-101', 'Python and Java Architecture Systems')")}>
                                Enroll
                            </button>
                            <button className="btn btn-ghost" onClick={() => window.eval("handleAdminEdit('CS-101')")}>
                                Edit Schema
                            </button>
                        </div>
                    </div>
                    {/* Course 2 */}
                    <div className="course-card" data-course-id="CS-204">
                        <div>
                            <div className="course-meta">
                                Module 02 • Artificial Intelligence
                            </div>
                            <h3>
                                Computer Vision Systems
                            </h3>
                            <p className="course-desc">
                                Real-time object mapping arrays, spatial processing architecture, and pixel structural identification methods inside 30-second cycles.
                            </p>
                            <div className="course-details-row">
                                <span>
                                    <strong>
                                        Duration:
                                    </strong>
                                    10 Weeks
                                </span>
                                <span>
                                    <strong>
                                        Track:
                                    </strong>
                                    Specialized
                                </span>
                            </div>
                        </div>
                        <div className="course-actions">
                            <button className="btn btn-primary" onClick={() => window.eval("handleEnrollment('CS-204', 'Computer Vision Systems')")}>
                                Enroll
                            </button>
                            <button className="btn btn-ghost" onClick={() => window.eval("handleAdminEdit('CS-204')")}>
                                Edit Schema
                            </button>
                        </div>
                    </div>
                    {/* Course 3 */}
                    <div className="course-card" data-course-id="CS-309">
                        <div>
                            <div className="course-meta">
                                Module 03 • Robotics & Hardware
                            </div>
                            <h3>
                                Autonomous Line Follower Design
                            </h3>
                            <p className="course-desc">
                                Hardware integration covering ultrasonic structural sensor calculation arrays, operational driver modules, and autonomous motion control.
                            </p>
                            <div className="course-details-row">
                                <span>
                                    <strong>
                                        Duration:
                                    </strong>
                                    6 Weeks
                                </span>
                                <span>
                                    <strong>
                                        Track:
                                    </strong>
                                    Labs
                                </span>
                            </div>
                        </div>
                        <div className="course-actions">
                            <button className="btn btn-primary" onClick={() => window.eval("handleEnrollment('CS-309', 'Autonomous Line Follower Design')")}>
                                Enroll
                            </button>
                            <button className="btn btn-ghost" onClick={() => window.eval("handleAdminEdit('CS-309')")}>
                                Edit Schema
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            {/* Context Overlays (Student Detail Collection Form Modal) */}
            <div className="modal" id="enrollment-modal">
                <div className="modal-content">
                    <button className="modal-close" onClick={() => window.eval("closeModal('enrollment-modal')")}>
                        ×
                    </button>
                    <div className="section-eyebrow" id="enroll-modal-meta">
                        Verification Required
                    </div>
                    <h3 id="enroll-modal-title">
                        Complete Enrollment
                    </h3>
                    <p>
                        Confirm your academic profile identity to map this module allocation to your transcript.
                    </p>
                    <form id="enrollment-form" onSubmit={() => window.eval("executeEnrollment(event)")}>
                        <input type="hidden" id="enroll-course-id" />
                        <div className="form-group">
                            <label htmlFor="student-fullname">
                                Full Name
                            </label>
                            <input type="text" id="student-fullname" required="" placeholder="Alex" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="student-academic-id">
                                Roll no.
                            </label>
                            <input type="text" id="student-academic-id" required="" placeholder="XXXXXX" />
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-ghost" onClick={() => window.eval("closeModal('enrollment-modal')")}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Context Overlays (Administrative Authorization Access Gate) */}
            <div className="modal" id="admin-gate-modal">
                <div className="modal-content" style={{borderColor: "var(--burgundy)"}}>
                    <button className="modal-close" onClick={() => window.eval("closeModal('admin-gate-modal')")}>
                        ×
                    </button>
                    <div className="section-eyebrow" style={{color: "var(--burgundy)"}}>
                        Security Protocol
                    </div>
                    <h3>
                        Admin Credentials
                    </h3>
                    <p>
                        Modifying core blueprints requires immediate administrative clearance authentication.
                    </p>
                    <form id="admin-gate-form" onSubmit={() => window.eval("verifyAdminClearance(event)")}>
                        <input type="hidden" id="edit-target-course-id" />
                        <div className="form-group">
                            <label htmlFor="admin-email">
                                Admin Email Address
                            </label>
                            <input type="email" id="admin-email" required="" placeholder="admin@institute.edu" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="admin-pass">
                                Password
                            </label>
                            <input type="password" id="admin-pass" required="" placeholder="••••••••" />
                        </div>
                        <div className="modal-actions">
                            <button type="button" className="btn btn-ghost" onClick={() => window.eval("closeModal('admin-gate-modal')")}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-burgundy">
                                Verify Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <footer className="site-footer">
                <div className="wrap">
                    <div className="footer-brand">
                        <span>
                            SkillTrack
                        </span>
                    </div>
                    <div className="footer-note">
                        © 2026 SkillTrack . All rights reserved.
                    </div>
                </div>
            </footer>
            {/* Application Interaction Logic Script */}
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
