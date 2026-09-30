import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import { getEnrollmentProgress } from "../utils/enrollment";
import PageCss from "../components/PageCss";

export default function CourseContent() {
    const [searchParams] = useSearchParams();
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const { loggedInStudent } = useAuth();
    const { courses, enrollments, enrollmentsLoading, updateEnrollmentProgress } = useCourses();
    const courseId = searchParams.get("id");
    const course = courses.find((item) => String(item.id) === String(courseId));
    const studentId = loggedInStudent?.academicId || loggedInStudent?.studentId;
    const enrollment = enrollments.find((item) =>
        String(item.courseId) === String(courseId) && String(item.studentId) === String(studentId)
    );
    const completedModules = Array.isArray(enrollment?.completedModules) ? enrollment.completedModules : [];
    const progress = course ? getEnrollmentProgress(enrollment || {}, course) : 0;

    async function toggleModule(moduleName) {
        if (!enrollment || !course) return;
        const nextModules = completedModules.includes(moduleName)
            ? completedModules.filter((item) => item !== moduleName)
            : [...completedModules, moduleName];
        try {
            setSaving(true);
            setError("");
            await updateEnrollmentProgress(enrollment, course, nextModules);
        } catch (saveError) {
            console.error("Failed to update course progress:", saveError);
            setError("Unable to save your progress. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <PageCss href="/css/style.css" />
            <header className="site-header">
                <div className="wrap">
                    <Link to="/courses" className="brand">SkillTrack Portal</Link>
                    <Link to="/student-dashboard" className="btn btn-ghost">My Dashboard</Link>
                </div>
            </header>
            <main className="wrap classroom-container" style={{maxWidth: "1100px", margin: "0 auto", padding: "40px 20px 80px"}}>
                {!course ? <p>Course not found. <Link to="/courses">Browse courses</Link></p> : (
                    <>
                        <div style={{marginBottom: "32px", borderBottom: "1px solid var(--line)", paddingBottom: "24px"}}>
                            <div className="section-eyebrow">{course.courseCode || "Course"} | {course.category}</div>
                            <h1 style={{fontFamily: "var(--display)", color: "var(--ink)", fontSize: "2.5rem", margin: "8px 0 12px 0", fontWeight: "500"}}>{course.courseName}</h1>
                            <p style={{margin: 0, opacity: "0.75", lineHeight: "1.6"}}>{course.overview}</p>
                        </div>
                        {enrollmentsLoading ? <p>Loading your enrollment...</p> : !enrollment ? (
                            <p>This course is not enrolled under your account. <Link to="/courses">Return to the course catalog</Link>.</p>
                        ) : (
                            <>
                                <section className="progress-panel">
                                    <div className="progress-meta"><span>Your Progress</span><span>{progress}% Complete</span></div>
                                    <div className="progress-bar-bg" role="progressbar" aria-label="Course progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                        <div className="progress-bar-fill" style={{width: `${progress}%`}} />
                                    </div>
                                </section>
                                {error && <p className="notice error show" role="alert">{error}</p>}
                                <h2 className="workspace-title">Course Modules</h2>
                                <div className="modules-stack">
                                    {(course.modules || []).map((moduleName, index) => {
                                        const complete = completedModules.includes(moduleName);
                                        return (
                                            <label className={`module-card${complete ? " completed" : ""}`} key={moduleName}>
                                                <span className="module-info">
                                                    <h3>{moduleName}</h3>
                                                    <p>Module {index + 1} of {course.modules.length}</p>
                                                </span>
                                                <input type="checkbox" checked={complete} disabled={saving} onChange={() => toggleModule(moduleName)} aria-label={`Mark ${moduleName} complete`} />
                                            </label>
                                        );
                                    })}
                                </div>
                                <p style={{marginTop: "20px"}}>{saving ? "Saving progress..." : `${completedModules.length} of ${course.modules?.length || 0} modules completed`}</p>
                            </>
                        )}
                    </>
                )}
            </main>
            <footer className="site-footer"><div className="wrap">© 2026 Student Learning Environment.</div></footer>
        </>
    );
}
