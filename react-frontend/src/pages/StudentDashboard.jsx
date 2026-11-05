import { useState } from "react";
import Chat from "../components/Chat";
import Notifications from "../components/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCourses } from "../context/CourseContext";
import { getEnrollmentCourse, getEnrollmentProgress } from "../utils/enrollment";
import PageCss from "../components/PageCss";

export default function StudentDashboard() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeChatRecipient, setActiveChatRecipient] = useState(null);

    const { courses, enrollments } = useCourses();
    const { loggedInStudent, logoutStudent } = useAuth();
    const navigate = useNavigate();

    const studentId = loggedInStudent?._id || loggedInStudent?.academicId || loggedInStudent?.studentId || loggedInStudent?.id;
    const myEnrollments = enrollments.filter((enrollment) => String(enrollment.studentId) === String(studentId));
    const completedCourses = myEnrollments.filter((enrollment) => getEnrollmentProgress(enrollment, getEnrollmentCourse(enrollment, courses)) === 100).length;
    const averageProgress = myEnrollments.length
        ? Math.round(myEnrollments.reduce((total, enrollment) => total + getEnrollmentProgress(enrollment, getEnrollmentCourse(enrollment, courses)), 0) / myEnrollments.length)
        : 0;

    function handleSignOut() {
        logoutStudent();
        navigate("/student-login", { replace: true });
    }

    function handleReplyFromNotification(sender) {
        const targetId = typeof sender === "object" ? (sender?._id || sender?.id) : sender;
        setActiveChatRecipient(targetId || null);
        setIsChatOpen(true);
    }

    return (
        <>
            <PageCss href="/css/style.css" />
            {/* Top Portal Navigation Frame */}
            <header className="site-header">
                <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Link to="/courses" className="brand">
                        <svg style={{width: "32px", height: "32px"}} viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="21"></circle>
                            <circle cx="24" cy="24" r="16"></circle>
                            <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                        </svg>
                        <span>SkillTrack Portal</span>
                    </Link>
                    <nav style={{display: "flex", gap: "12px", alignItems: "center"}}>
                        <Notifications onReply={handleReplyFromNotification} />
                        <Link to="/courses" className="btn btn-ghost">
                            Browse Modules
                        </Link>
                        <button className="btn btn-ghost" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </nav>
                </div>
            </header>

            {/* Central Workspace Shell */}
            <main className="wrap">
                <div className="db-intro">
                    <div className="section-eyebrow">
                        Student Terminal Workspace
                    </div>
                    <h1 id="welcome-heading">
                        Welcome Back{loggedInStudent?.name ? `, ${loggedInStudent.name}` : ""}
                    </h1>
                    <p style={{margin: "0", opacity: "0.7", fontSize: "0.95rem"}}>
                        Track structural timeline metrics, analyze completion ratios, and access registered academic modules.
                    </p>
                </div>

                {/* Gateway Card with Chat Button */}
                <section className="wrap" style={{marginTop: "32px", marginBottom: "40px"}}>
                    <div style={{background: "rgba(255, 255, 255, 0.4)", border: "1px solid var(--line)", padding: "36px", borderRadius: "var(--radius)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "24px"}}>
                        <div>
                            <h3 style={{fontFamily: "var(--display)", fontSize: "1.8rem", color: "var(--ink)", margin: "0 0 8px 0", fontWeight: "500"}}>
                                My Academic Modules
                            </h3>
                            <p style={{margin: "0", fontSize: "0.92rem", opacity: "0.7"}}>
                                Track active timelines, communicate with peers, and resume active learning pipelines.
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                            <button
                                type="button"
                                onClick={() => {
                                    setActiveChatRecipient(null);
                                    setIsChatOpen(true);
                                }}
                                className="btn btn-ghost"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "14px 22px",
                                    fontWeight: "600",
                                    fontSize: "0.88rem"
                                }}
                            >
                                💬 Student Chat
                            </button>
                            <Link to="/my-courses" className="btn btn-primary" style={{whiteSpace: "nowrap", fontFamily: "var(--body)", fontWeight: "600", fontSize: "0.88rem", padding: "14px 28px", background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--radius)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px"}}>
                                Go to My Courses ↗
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Real-Time Chat Modal */}
                <Chat
                    isOpen={isChatOpen}
                    onClose={() => {
                        setIsChatOpen(false);
                        setActiveChatRecipient(null);
                    }}
                    initialRecipientId={activeChatRecipient}
                />

                {/* Analytics Dashboard Metrics Row */}
                <section className="metrics-grid">
                    <div className="metric-card">
                        <div className="metric-label">Total Courses Enrolled</div>
                        <div className="metric-value">{myEnrollments.length}</div>
                        <p className="metric-desc">Total modules systematically mapped and cataloged onto your institutional registry ledger.</p>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Courses Completed</div>
                        <div className="metric-value">{completedCourses}</div>
                        <p className="metric-desc">Modules containing verified graduation flags, finalized targets, and archived transcripts.</p>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Ongoing Courses</div>
                        <div className="metric-value">{myEnrollments.length - completedCourses}</div>
                        <p className="metric-desc">Active module blueprints currently allocated onto your computational learning timeline path.</p>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Progress Statistics</div>
                        <div className="metric-value">{averageProgress}%</div>
                        <p className="metric-desc">Aggregated structural metric completion percentage across all assigned curricular tracking lines.</p>
                    </div>
                </section>

                <section className="section" style={{paddingBottom: "60px"}}>
                    <div className="workspace-header">
                        <div>
                            <h2 className="workspace-title">Course Progress</h2>
                            <p style={{margin: 0, opacity: "0.7"}}>Your enrolled courses and current completion.</p>
                        </div>
                        <Link to="/my-courses" className="btn btn-ghost">View My Courses</Link>
                    </div>
                    {myEnrollments.length === 0 ? <p>No enrolled courses yet. <Link to="/courses">Browse courses</Link></p> : (
                        <div className="course-grid">
                            {myEnrollments.map((enrollment) => {
                                const course = getEnrollmentCourse(enrollment, courses);
                                const courseName = course?.courseName || course?.title || "Course";
                                const progress = getEnrollmentProgress(enrollment, course);
                                return (
                                    <article className="course-card" key={enrollment.id}>
                                        <div className="course-meta">{course?.courseCode || enrollment.courseId}</div>
                                        <h3>{courseName}</h3>
                                        <div className="progress-track" role="progressbar" aria-label={`${courseName} progress`} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
                                            <div className="progress-fill" style={{width: `${progress}%`}} />
                                        </div>
                                        <p>{progress}% complete</p>
                                        {progress === 100 ? (
                                            <Link to={`/certificate?courseId=${encodeURIComponent(course?._id || course?.id || enrollment.courseId)}`} className="btn btn-primary">View Certificate</Link>
                                        ) : (
                                            <Link to={`/course-content?id=${encodeURIComponent(course?._id || course?.id || enrollment.courseId)}`} className="btn btn-primary">Continue Course</Link>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    © 2026 Student Registry Core Environment. Secure Verification Architecture active.
                </div>
            </footer>
        </>
    );
}