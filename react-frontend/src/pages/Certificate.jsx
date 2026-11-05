import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import { getEnrollmentCourse, getEnrollmentProgress } from "../utils/enrollment";
import PageCss from "../components/PageCss";

export default function Certificate() {
    const [searchParams] = useSearchParams();
    const { loggedInStudent } = useAuth();
    const { courses, enrollments } = useCourses();
    const courseId = searchParams.get("courseId");
    const studentIds = [
        loggedInStudent?._id,
        loggedInStudent?.academicId,
        loggedInStudent?.studentId,
        loggedInStudent?.id,
        loggedInStudent?.email
    ].filter(Boolean).map(String);
    const enrollment = enrollments.find((item) =>
        String(item.courseId) === String(courseId) &&
        studentIds.includes(String(item.studentId))
    );
    const course = enrollment ? getEnrollmentCourse(enrollment, courses) : null;
    const progress = enrollment ? getEnrollmentProgress(enrollment, course) : 0;
    const courseName = course?.courseName || course?.title || "Course";
    const completionDate = enrollment?.updatedAt
        ? new Date(enrollment.updatedAt).toLocaleDateString()
        : new Date().toLocaleDateString();

    return (
        <>
            <PageCss href="/css/style.css" />
            <header className="site-header">
                <div className="wrap">
                    <Link to="/student-dashboard" className="brand">SkillTrack Portal</Link>
                    <Link to="/my-courses" className="btn btn-ghost">My Courses</Link>
                </div>
            </header>
            <main className="stage" id="stage-root">
                {!enrollment ? (
                    <section className="locked-card" role="status">
                        <h2>Enrollment not found</h2>
                        <p>This certificate is not associated with an enrollment under your account.</p>
                        <Link to="/my-courses" className="btn btn-primary">Back to My Courses</Link>
                    </section>
                ) : progress < 100 ? (
                    <section className="locked-card" role="status">
                        <h2>Certificate not available yet</h2>
                        <p>Complete all course modules to earn your certificate.</p>
                        <div className="locked-progress-bg" role="progressbar" aria-label="Course progress" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                            <div className="locked-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                        <p>{progress}% complete</p>
                        <Link to={`/course-content?id=${encodeURIComponent(courseId)}`} className="btn btn-primary">Continue Course</Link>
                    </section>
                ) : (
                    <>
                        <div className="stage-actions">
                            <button type="button" className="btn btn-primary" onClick={() => window.print()}>Print Certificate</button>
                            <Link to="/my-courses" className="btn btn-ghost">Back to My Courses</Link>
                        </div>
                        <article className="certificate">
                            <div className="cert-border-outer" />
                            <div className="cert-border-middle" />
                            <div className="cert-border-inner" />
                            <div className="cert-inner">
                                <svg className="crest" viewBox="0 0 48 48" aria-hidden="true">
                                    <circle cx="24" cy="24" r="21" />
                                    <circle cx="24" cy="24" r="16" />
                                    <path d="M24 13 L29 22 L24 31 L19 22 Z" />
                                </svg>
                                <p className="cert-eyebrow">SkillTrack Learning Portal</p>
                                <p className="cert-lede">Certificate of Completion</p>
                                <p className="cert-body-text">This certificate is awarded to</p>
                                <div className="cert-name-wrap">
                                    <span className="cert-name">{loggedInStudent?.name || "Student"}</span>
                                </div>
                                <p className="cert-body-text">for successfully completing</p>
                                <h1 className="cert-course-title">{courseName}</h1>
                                <p className="cert-course-code">{course?.courseCode || course?.category || "Course"}</p>
                                <div className="cert-meta-row">
                                    <div className="cert-meta-item">
                                        <div className="cert-meta-label">Completed</div>
                                        <div className="cert-meta-value">{completionDate}</div>
                                    </div>
                                </div>
                                <div className="cert-sign-row">
                                    <div className="cert-sign">
                                        <div className="cert-sign-name">SkillTrack</div>
                                        <div className="cert-sign-line" />
                                        <div className="cert-sign-role">Learning Portal</div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </>
                )}
            </main>
            <footer className="site-footer">
                <div className="wrap">© 2026 Student Learning Environment.</div>
            </footer>
        </>
    );
}
