import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import { useAuth } from "../auth/AuthContext";
import { loginStudent as authenticateStudent } from "../services/authApi";

export default function StudentLogin() {
  const navigate = useNavigate();
  const { loginStudent } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const result = await authenticateStudent(formData);

      // Store token in sessionStorage as required by Task 10
      if (result.token) {
        sessionStorage.setItem("token", result.token);
      }
      if (result.student) {
        sessionStorage.setItem("studentUser", JSON.stringify(result.student));
        loginStudent(result.student);
      }

      setMessage(result.message || "Login successful");
      setFormData((prev) => ({ ...prev, password: "" }));

      navigate("/student-dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

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
              <span className="brand-name">SkillTrack</span>
              <span className="brand-sub">Course & Progress System</span>
            </span>
          </Link>
          <div className="auth-side-copy">
            <p className="section-eyebrow">Welcome back</p>
            <h2>Pick up exactly where you left off.</h2>
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
            <p className="section-eyebrow">Student</p>
            <h1>Log in</h1>
            <p>Enter your registered email and password to continue.</p>

            {message && <div className="notice success show">{message}</div>}
            {error && <div className="notice error show">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="log-email">Email address</label>
                <input
                  id="log-email"
                  name="email"
                  type="email"
                  placeholder="student@institute.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="log-password">Password</label>
                <input
                  id="log-password"
                  name="password"
                  type="password"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field-aux">
                <a href="#">Forgot password?</a>
              </div>

              <button className="btn btn-gold btn-block" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="form-foot">
              New to SkillTrack?{" "}
              <Link to="/student-register">Create an account</Link>
            </p>
          </div>
        </section>
      </div>
      <LegacyScript src="/legacy/js/main.js" module={true} />
    </>
  );
}