import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";
import { registerStudent } from "../services/authApi";

export default function StudentRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    department: "",
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
      const result = await registerStudent(formData);
      setMessage(result.message || "Student registered successfully");
      setFormData({
        name: "",
        department: "",
        email: "",
        password: "",
      });
      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate("/student-login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
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
            <p className="section-eyebrow">New student</p>
            <h2>Your record starts the moment you register.</h2>
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
            <p className="section-eyebrow">Student</p>
            <h1>Create your account</h1>
            <p>It takes less than a minute. Your Student ID is generated automatically once you submit.</p>

            {message && <div className="notice success show">{message}</div>}
            {error && <div className="notice error show">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="reg-name">Full name</label>
                  <input
                    id="reg-name"
                    name="name"
                    type="text"
                    placeholder="e.g. Anjali Raghavan"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="reg-dept">Department</label>
                  <select
                    id="reg-dept"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electronics & Communication">Electronics & Communication</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="reg-email">Email address</label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="reg-password">Password</label>
                <input
                  id="reg-password"
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  minLength="8"
                  maxLength="72"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-gold btn-block" type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>
            </form>

            <div className="divider-or">Already enrolled</div>
            <p className="form-foot">
              Have an account already?{" "}
              <Link to="/student-login">Login instead</Link>
            </p>
          </div>
        </section>
      </div>
      <LegacyScript src="/legacy/js/main.js" module={true} />
    </>
  );
}