import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import { getEnrollmentProgress } from "../utils/enrollment";
import PageCss from "../components/PageCss";

export default function MyCourses() {
    const { loggedInStudent } = useAuth();
    const { courses, enrollments } = useCourses();
    const studentId = loggedInStudent?.academicId || loggedInStudent?.studentId;
    const myEnrollments = enrollments.filter((enrollment) => String(enrollment.studentId) === String(studentId));

    return (
        <>
            <PageCss href="/css/style.css" />
                        <header className="site-header">
                <div className="wrap">
                    <div className="brand">
                        <div>
                            <span className="brand-name">
                                SkillTrack
                            </span>
                            <span className="brand-sub">
                                Student Academic Ledger
                            </span>
                        </div>
                    </div>
                    <Link to="/student-dashboard" className="btn btn-ghost" style={{padding: "10px 20px", fontSize: "0.8rem"}}>
                        ← Back to Dashboard
                    </Link>
                </div>
            </header>
            <main className="wrap">
                <div className="workspace-container">
                    <div className="workspace-header">
                        <div>
                            <h1 className="workspace-title">
                                My Academic Modules
                            </h1>
                            <p style={{margin: "0", opacity: "0.65", fontSize: "0.95rem"}}>
                                Review textbook content paths, monitor section completions, and continue your active study paths.
                            </p>
                        </div>
                        <span style={{fontSize: "0.82rem", fontWeight: "700", background: "rgba(16,25,43,0.06)", padding: "6px 14px", borderRadius: "30px", textTransform: "uppercase", letterSpacing: "0.05em"}}>
                            {myEnrollments.length} Active Modules
                        </span>
                    </div>
                    <div className="modules-grid">
                        {myEnrollments.length === 0 ? (
                            <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "48px 20px", border: "1px dashed var(--line)"}}>
                                <p>You are not enrolled in any courses yet.</p>
                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                            </div>
                        ) : myEnrollments.map((enrollment) => {
                            const course = courses.find((item) => String(item.id) === String(enrollment.courseId));
                            const progress = getEnrollmentProgress(enrollment, course);
                            return (
                                <article className="course-card" key={enrollment.id}>
                                    <div className="course-meta">{course?.courseCode || enrollment.courseId} | {course?.category || "Course"}</div>
                                    <h3>{course?.courseName || "Course details unavailable"}</h3>
                                    <p className="course-desc">{course?.overview || "Your enrollment is active."}</p>
                                    <div className="progress-track" role="progressbar" aria-label={`${course?.courseName || "Course"} progress`} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-fill" style={{width: `${progress}%`}} />
                                    </div>
                                    <p>{progress}% complete</p>
                                    <Link to={`/course-content?id=${encodeURIComponent(enrollment.courseId)}`} className="btn btn-primary">
                                        {progress > 0 ? "Continue Course" : "Start Course"}
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </main>
            <footer className="site-footer">
                <div className="wrap" style={{display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.82rem", opacity: "0.5"}}>
                    <span>
                        SkillTrack Learning Environment
                    </span>
                    <span>
                        © 2026 Academic Catalog Matrix.
                    </span>
                </div>
            </footer>
        </>
    );
}
