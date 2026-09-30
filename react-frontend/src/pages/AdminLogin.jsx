import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import PageCss from "../components/PageCss";

export default function AdminLogin() {
    const { loginAdmin } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        if (email !== "admin@institute.edu" || password !== "password") {
            setError("Access denied: invalid administrator credentials.");
            return;
        }

        loginAdmin({ email, role: "admin" });
        navigate("/admin-dashboard", { replace: true });
    }

    return (
        <>
            <PageCss href="/css/style.css" />
                        <div className="auth-page">
                <aside className="auth-side admin-side">
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
                            Administrator access
                        </p>
                        <h2>
                            The full record, under your custody.
                        </h2>
                        <p>
                            Manage courses, oversee enrollments, and review completion reports for every student on the platform.
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
                        <p className="section-eyebrow" style={{color: "var(--burgundy)"}}>
                            Administrator
                        </p>
                        <h1>
                            Secure login
                        </h1>
                        <p>
                            This area is restricted to authorized administrators only.
                        </p>
                        {/* Notice box styled to display error or success messages */}
                        {error && <div className="notice show error" role="alert">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <label htmlFor="admin-email">
                                    Admin email
                                </label>
                                <input id="admin-email" name="email" type="email" placeholder="admin@institute.edu" required />
                            </div>
                            <div className="field">
                                <label htmlFor="admin-password">
                                    Password
                                </label>
                                <input id="admin-password" name="password" type="password" placeholder="Your password" required />
                            </div>
                            <div className="field-aux">
                                <a href="#" style={{color: "var(--burgundy)"}}>
                                    Forgot password?
                                </a>
                            </div>
                            <button className="btn btn-burgundy btn-block" type="submit">
                                Login securely
                            </button>
                        </form>
                        <p className="form-foot">
                            Administrator accounts are issued by SkillTrack, not self-registered.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
