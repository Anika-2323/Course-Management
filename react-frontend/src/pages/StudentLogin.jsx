import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentLogin() {
    return (
        <>
            <PageCss href="/css/style.css" />
                        <div className="auth-page">
                <aside className="auth-side">
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
                    <div className="auth-side-copy">
                        <p className="section-eyebrow">
                            Welcome back
                        </p>
                        <h2>
                            Pick up exactly where you left off.
                        </h2>
                        <p>
                            Your enrolled courses, completed modules, and progress bars are waiting in your dashboard.
                        </p>
                    </div>
                    <Link to="/role" className="auth-side-back">
                        ← Choose a different role
                    </Link>
                    <svg className="auth-side-mark" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="21"></circle>
                        <circle cx="24" cy="24" r="16"></circle>
                        <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                    </svg>
                </aside>
                <section className="auth-form-col">
                    <div className="auth-form-inner">
                        <p className="section-eyebrow">
                            Student
                        </p>
                        <h1>
                            Log in
                        </h1>
                        <p>
                            Enter your registered email and password to continue.
                        </p>
                        {/* Target notice box element for displaying validation states */}
                        <div className="notice" id="login-notice"></div>
                        <form id="student-login-form">
                            <div className="field">
                                <label htmlFor="log-email">
                                    Email address
                                </label>
                                <input id="log-email" name="email" type="email" placeholder="student@institute.edu" required="" />
                            </div>
                            <div className="field">
                                <label htmlFor="log-password">
                                    Password
                                </label>
                                <input id="log-password" name="password" type="password" placeholder="Your password" required="" />
                            </div>
                            <div className="field-aux">
                                <a href="#">
                                    Forgot password?
                                </a>
                            </div>
                            <button className="btn btn-gold btn-block" type="submit">
                                Login
                            </button>
                        </form>
                        <p className="form-foot">
                            New to SkillTrack?
                            <Link to="/student-register">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
