import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Notifications() {
    return (
        <>
            <PageCss href="/css/style.css" />
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
                        <Link to="/courses" className="nav-item">
                            Courses
                        </Link>
                        {/* Dynamic Portal Interface Container Elements */}
                        <div id="nav-actions-wrapper" style={{display: "flex", alignItems: "center", gap: "12px"}}>
                            <Link to="/role" className="btn btn-ghost" id="nav-auth-btn">
                                Portal Login
                            </Link>
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
                    <div className="catalog-title-row">
                        <div>
                            <div className="section-eyebrow">
                                Stay in the loop
                            </div>
                            <h1 className="catalog-title">
                                Notifications
                            </h1>
                        </div>
                        <button className="btn btn-ghost" onClick={() => window.eval("markAllAsRead()")}>
                            Mark all as read
                        </button>
                    </div>
                    <p className="catalog-subtitle">
                        Monitor historical system messages, real-time tracking streams, configuration updates, and academic module distributions.
                    </p>
                </div>
                <div className="filter-tabs" id="filter-tabs"></div>
                <div className="notif-list" id="notif-list"></div>
                <details className="demo-panel">
                    <summary>
                        Testing helpers (no backend yet — simulate incoming notifications)
                    </summary>
                    <div className="demo-buttons">
                        <button className="btn btn-ghost" onClick={() => window.eval("simulate('new_course')")}>
                            Simulate new course alert
                        </button>
                        <button className="btn btn-ghost" onClick={() => window.eval("simulate('enrollment')")}>
                            Simulate enrollment
                        </button>
                        <button className="btn btn-ghost" onClick={() => window.eval("simulate('assignment_reminder')")}>
                            Simulate assignment reminder
                        </button>
                        <button className="btn btn-ghost" onClick={() => window.eval("simulate('certificate')")}>
                            Simulate certificate ready
                        </button>
                    </div>
                </details>
            </main>
            {/* Modal Context Overlays */}
            <div className="modal-overlay" id="email-modal-overlay" onClick={() => window.eval("if(event.target===this) closeEmailPreview()")}>
                <div className="email-modal">
                    <div className="email-modal-head">
                        <span>
                            Email preview
                        </span>
                        <button onClick={() => window.eval("closeEmailPreview()")}>
                            ✕
                        </button>
                    </div>
                    <div className="email-meta">
                        <div>
                            <strong>
                                To:
                            </strong>
                            <span id="email-to"></span>
                        </div>
                        <div>
                            <strong>
                                From:
                            </strong>
                            SkillTrack Portal &lt;notifications@skilltrack.app&gt;
                        </div>
                    </div>
                    <div className="email-subject" id="email-subject"></div>
                    <div className="email-body" id="email-body"></div>
                    <div className="email-footnote">
                        This is a local preview only. Actual email delivery will go live once the backend is connected.
                    </div>
                </div>
            </div>
            {/* Footer */}
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
            {/* Single safe conditional loader check path for nesting levels */}
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
