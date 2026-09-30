import React from "react";
import { Link } from "react-router-dom";
import { useCourses } from "../context/CourseContext";
import { useAuth } from "../auth/AuthContext";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const { courses, loading, error } = useCourses();
  const { loggedInStudent } = useAuth();

  return (
    <>
      {/* Header Bar */}
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
              <span className="brand-name">SkillTrack</span>
              <span className="brand-sub">Curriculum & Learning</span>
            </div>
          </Link>

          <nav className="nav-links">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/courses" className="nav-item" style={{ opacity: 1, fontWeight: 600 }}>Courses</Link>
            <div id="nav-actions-wrapper" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Link to={loggedInStudent ? "/student-dashboard" : "/student-login"} className="btn btn-ghost">
                {loggedInStudent ? "Student Dashboard" : "Portal Login"}
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Catalog Body */}
      <main className="wrap section">
        <div className="catalog-hero">
          <div className="section-eyebrow">Academic Catalog</div>
          <h1 className="catalog-title">Available Courses</h1>
          <p className="catalog-subtitle">
            Select architectures engineered for advanced technological design, technical optimization, and high-performance framework design.
          </p>
        </div>

        {/* Status Indicators */}
        {loading && <p style={{ textAlign: "center", opacity: 0.7 }}>Loading academic catalog from ledger...</p>}
        {error && <p className="notice error show">{error}</p>}

        {/* Dynamic Catalog Grid */}
        {!loading && !error && (
          <div className="course-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="wrap">
          <div className="footer-brand">
            <span>SkillTrack</span>
          </div>
          <div className="footer-note">© 2026 SkillTrack. All rights reserved.</div>
        </div>
      </footer>
    </>
  );
}