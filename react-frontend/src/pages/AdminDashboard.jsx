import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function AdminDashboard() {
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
                        <button onClick={() => window.eval("logoutAdmin()")} className="btn btn-burgundy">
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
                            Total Students
                        </div>
                        <div className="metric-value">
                            0
                        </div>
                        <p className="metric-desc">
                            Registered student accounts saved in the database.
                        </p>
                    </div>
                    {/* Metric 2: Total Courses */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Total Courses
                        </div>
                        <div className="metric-value" id="course-count-display">
                            0
                        </div>
                        <p className="metric-desc">
                            Total active courses published in the course catalog.
                        </p>
                    </div>
                    {/* Metric 3: Active Enrollments */}
                    <div className="metric-card">
                        <div className="metric-label">
                            Active Enrollments
                        </div>
                        <div className="metric-value">
                            0
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
                            0
                        </div>
                        <p className="metric-desc">
                            Total number of courses completed by students.
                        </p>
                    </div>
                </section>
                {/* Course Enrollment Breakdown */}
                <section className="panel-box" style={{background: "rgba(255, 255, 255, 0.4)", border: "1px solid var(--line)", padding: "40px", borderRadius: "var(--radius)", marginTop: "40px", marginBottom: "60px"}}>
                    <h3 style={{fontFamily: "var(--display)", fontSize: "1.8rem", color: "var(--ink)", margin: "0 0 8px 0", fontWeight: "500"}}>
                        Course Enrollment Breakdown
                    </h3>
                    <p style={{margin: "0 0 28px 0", fontSize: "0.9rem", opacity: "0.7"}}>
                        Number of enrolled students for each course.
                    </p>
                    <div id="course-enrollment-bars-root" style={{display: "flex", flexDirection: "column", gap: "24px"}}>
                        {/* Programmatic course tracking bars render here */}
                    </div>
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
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
