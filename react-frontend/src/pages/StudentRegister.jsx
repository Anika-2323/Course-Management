import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function StudentRegister() {
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
                            New student
                        </p>
                        <h2>
                            Your record starts the moment you register.
                        </h2>
                        <p>
                            One profile carries every course you enroll in, every module you complete, and every percentage point of progress.
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
                            Create your account
                        </h1>
                        <p>
                            It takes less than a minute. Your Student ID is generated automatically once you submit.
                        </p>
                        <div className="notice"></div>
                        <form data-mock-submit="" data-success-message="Account created — your Student ID will be emailed shortly.">
                            <div className="field-row">
                                <div className="field">
                                    <label htmlFor="reg-name">
                                        Full name
                                    </label>
                                    <input id="reg-name" name type="text" placeholder="e.g. Anjali Raghavan" required="" />
                                </div>
                                <div className="field">
                                    <label htmlFor="reg-dept">
                                        Department
                                    </label>
                                    <select id="reg-dept" name="department" data-placeholder-select="" required="">
                                        <option value="" disabled="" selected="">
                                            Select department
                                        </option>
                                        <option value="cse">
                                            Computer Science
                                        </option>
                                        <option value="ece">
                                            Electronics & Communication
                                        </option>
                                        <option value="mech">
                                            Mechanical Engineering
                                        </option>
                                        <option value="civil">
                                            Civil Engineering
                                        </option>
                                        <option value="business">
                                            Business Administration
                                        </option>
                                        <option value="other">
                                            Other
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="reg-email">
                                    Email address
                                </label>
                                <input id="reg-email" name="email" type="email" placeholder="you@university.edu" required="" />
                            </div>
                            <div className="field">
                                <label htmlFor="reg-password">
                                    Password
                                </label>
                                <input id="reg-password" name="password" type="password" placeholder="At least 8 characters" minLength="8" required="" />
                            </div>
                            <button className="btn btn-gold btn-block" type="submit">
                                Register
                            </button>
                        </form>
                        <div className="divider-or">
                            Already enrolled
                        </div>
                        <p className="form-foot">
                            Have an account already?
                            <Link to="/student-login">
                                Login instead
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
