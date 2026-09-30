import { Link, useLocation } from "react-router-dom";
import PageCss from "../components/PageCss";

export default function EnrollmentSuccess() {
    const { state } = useLocation();
    const courseId = state?.courseId;

    return (
        <>
            <PageCss href="/css/style.css" />
                        <div className="success-container">
                {/* Verified Institutional Seal Logo Mark */}
                <svg className="success-crest" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="21"></circle>
                    <circle cx="24" cy="24" r="16"></circle>
                    <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
                    <line x1="24" y1="31" x2="24" y2="37"></line>
                    <line x1="20" y1="37" x2="28" y2="37"></line>
                </svg>
                <div className="section-eyebrow">
                    Registry Complete
                </div>
                <h1>
                    Seat Allocated Successfully
                </h1>
                <p>Your enrollment in {state?.courseName || "the course"} is complete. You can begin learning now or return to your dashboard.</p>
                <div className="actions-stack">
                    {courseId && <Link to={`/course-content?id=${encodeURIComponent(courseId)}`} className="btn btn-primary">Go to Course Content</Link>}
                    <Link to="/my-courses" className="btn btn-ghost">Go to My Courses</Link>
                    <Link to="/student-dashboard" className="btn btn-ghost">Go to Student Dashboard</Link>
                </div>
                <div className="footer-stamp">
                    SkillTrack Ledger Authority
                </div>
            </div>
        </>
    );
}
