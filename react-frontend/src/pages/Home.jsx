import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Home() {
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
                        <a className="nav-item" href="#modules">
                            Modules
                        </a>
                        <a className="nav-item" href="#how">
                            How it works
                        </a>
                        <Link to="/courses" className="nav-item">
                            Courses
                        </Link>
                        <Link to="/role" className="nav-item btn btn-primary">
                            Login / Register
                        </Link>
                    </nav>
                </div>
            </header>
            <main>
                <section className="hero">
                    <div className="wrap">
                        <p className="hero-eyebrow">
                            Academic Records, Reimagined
                        </p>
                        <h1>
                            Every course, every milestone, kept in
                            <em>
                                one ledger.
                            </em>
                        </h1>
                        <p>
                            SkillTrack brings enrollment, course materials, and progress tracking together — so students always know where they stand, and administrators always know who's ahead.
                        </p>
                        <div className="hero-actions">
                            <Link to="/role" className="btn btn-primary">
                                Login or Register
                            </Link>
                            <a className="btn btn-ghost" href="#how">
                                See how it works
                            </a>
                        </div>
                    </div>
                    <svg className="hero-mark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                        {/* shoulders / bust */}
                        <path className="mark-ink" d="M32 36c-12 0-20 7-20 16v6h40v-6c0-9-8-16-20-16z"></path>
                        {/* head */}
                        <circle className="mark-ink" cx="32" cy="20" r="11"></circle>
                        {/* mortarboard cap */}
                        <path className="mark-gold" d="M32 4 L54 12 L32 20 L10 12 Z"></path>
                        <path className="mark-gold" d="M18 14.5 V23 c0 3.5 6.5 6.5 14 6.5 s14 -3 14 -6.5 V14.5 L32 19.5 Z"></path>
                        {/* tassel */}
                        <line className="mark-gold" x1="54" y1="12" x2="54" y2="24"></line>
                        <circle className="mark-gold-fill" cx="54" cy="26" r="1.6"></circle>
                    </svg>
                </section>
                <section className="ledger" id="how">
                    <div className="wrap">
                        <div className="ledger-item">
                            <span className="ledger-num">
                                01 — Enroll
                            </span>
                            <h3>
                                Browse and register
                            </h3>
                            <p>
                                Search the catalog by category, review the syllabus, and enroll in a single confirmed step.
                            </p>
                        </div>
                        <div className="ledger-item">
                            <span className="ledger-num">
                                02 — Track
                            </span>
                            <h3>
                                Watch progress accrue
                            </h3>
                            <p>
                                Modules are marked complete as you finish them, building an honest, real-time progress bar.
                            </p>
                        </div>
                        <div className="ledger-item">
                            <span className="ledger-num">
                                03 — Achieve
                            </span>
                            <h3>
                                Report and certify
                            </h3>
                            <p>
                                Completion reports and certificates are generated automatically once a course is finished.
                            </p>
                        </div>
                    </div>
                </section>
                <section className="section" id="modules">
                    <div className="wrap">
                        <div className="section-head">
                            <p className="section-eyebrow">
                                What's inside
                            </p>
                            <h2>
                                One system, two perspectives.
                            </h2>
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
                                    For students
                                </h2>
                                <p>
                                    Enroll in courses, access learning material, and track completion percentage across every course you take.
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
                                    For administrators
                                </h2>
                                <p>
                                    Manage courses and students, monitor enrollments, and review completion reports from a single dashboard.
                                </p>
                                <div className="role-actions">
                                    <Link to="/admin-login" className="btn btn-burgundy">
                                        Secure login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
                        © 2026 SkillTrack Course & Progress System. Built for learning, not for show.
                    </p>
                </div>
            </footer>
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
