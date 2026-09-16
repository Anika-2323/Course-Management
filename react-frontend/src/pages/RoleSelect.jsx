import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function RoleSelect() {
    return (
        <>
            <PageCss href="/css/style.css" />
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
                        <span>
                            <span className="brand-name">
                                SkillTrack
                            </span>
                            <span className="brand-sub">
                                Course & Progress System
                            </span>
                        </span>
                    </Link>
                    <nav className="nav-links">
                        <Link to="/" className="nav-item">
                            ← Back to home
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="role-main">
                <div className="wrap">
                    <div className="role-intro">
                        <p className="section-eyebrow" style={{display: "flex"}}>
                            Continue as
                        </p>
                        <h1>
                            Who's signing in today?
                        </h1>
                        <p>
                            Choose your role to reach the right login or registration form.
                        </p>
                    </div>
                    <div className="role-grid">
                        <div className="role-card role-student">
                            <span className="role-tag">
                                Student
                            </span>
                            <svg className="crest" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="21"></circle>
                                <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                            </svg>
                            <h2>
                                Student
                            </h2>
                            <p>
                                Browse courses, enroll, access materials, and track your learning progress.
                            </p>
                            <div className="role-actions">
                                <Link to="/student-login" className="btn btn-gold">
                                    Login
                                </Link>
                                <Link to="/student-register" className="btn btn-ghost">
                                    Register
                                </Link>
                            </div>
                        </div>
                        <div className="role-card role-admin">
                            <span className="role-tag">
                                Administrator
                            </span>
                            <svg className="crest" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="24" cy="24" r="21"></circle>
                                <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                            </svg>
                            <h2>
                                Administrator
                            </h2>
                            <p>
                                Manage courses, students, and enrollments from the admin dashboard.
                            </p>
                            <div className="role-actions">
                                <Link to="/admin-login" className="btn btn-burgundy">
                                    Secure login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    <div className="footer-brand">
                        <svg className="crest" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="24" cy="24" r="21"></circle>
                            <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                        </svg>
                        <span className="brand-name" style={{fontSize: "1rem"}}>
                            SkillTrack
                        </span>
                    </div>
                    <p className="footer-note">
                        © 2026 SkillTrack Course & Progress System.
                    </p>
                </div>
            </footer>
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
