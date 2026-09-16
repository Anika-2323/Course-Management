import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function CourseContent() {
    return (
        <>
            <PageCss href="/css/style.css" />
                        <header className="site-header">
                <div className="wrap">
                    <Link to="/courses" className="brand">
                        SkillTrack Portal
                    </Link>
                    <Link to="/student-dashboard" className="btn btn-ghost">
                        My Dashboard
                    </Link>
                </div>
            </header>
            {/* Centered and Balanced Classroom Workspace */}
            <main className="wrap classroom-container" style={{maxWidth: "1200px", margin: "0 auto", padding: "40px 20px 80px"}}>
                {/* Course Header: Centered & Simplified */}
                <div style={{marginBottom: "40px", borderBottom: "1px solid var(--line)", paddingBottom: "24px"}}>
                    <div className="section-eyebrow" id="course-code-meta" style={{color: "var(--gold)", fontWeight: "600", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em"}}>
                        Loading...
                    </div>
                    <h1 id="course-title-display" style={{fontFamily: "var(--display)", color: "var(--ink)", fontSize: "2.5rem", margin: "8px 0 12px 0", fontWeight: "500"}}>
                        Classroom Framework
                    </h1>
                    <p id="course-desc-display" style={{margin: "0", opacity: "0.75", fontSize: "1rem", lineHeight: "1.6", maxWidth: "85ch"}}></p>
                </div>
                {/* Balanced Two-Column Main Grid */}
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start"}}>
                    {/* LEFT COLUMN: Syllabus Core Modules & Progress */}
                    <div>
                        <section className="progress-panel" style={{background: "rgba(255,255,255,0.5)", border: "1px solid var(--line)", padding: "20px", borderRadius: "var(--radius)", marginBottom: "30px"}}>
                            <div className="progress-meta" style={{display: "flex", justifyContent: "space-between", fontSize: "0.88rem", fontWeight: "600", marginBottom: "8px"}}>
                                <span>
                                    Your Progress
                                </span>
                                <span id="progress-percentage-label" style={{color: "var(--gold)"}}>
                                    0% Complete
                                </span>
                            </div>
                            <div className="progress-bar-bg" style={{width: "100%", height: "8px", background: "rgba(16,25,43,0.06)", borderRadius: "4px", overflow: "hidden"}}>
                                <div className="progress-bar-fill" id="progress-bar-fill" style={{width: "0%", height: "100%", background: "var(--ink)", transition: "width 0.4s ease"}}></div>
                            </div>
                        </section>
                        <h3 style={{fontFamily: "var(--display)", fontSize: "1.6rem", margin: "0 0 20px 0", fontWeight: "500", color: "var(--ink)"}}>
                            Syllabus Core Milestones
                        </h3>
                        <div className="modules-stack" id="modules-root" style={{display: "flex", flexDirection: "column", gap: "14px"}}>
                            {/* Interactive Checkboxes Inject Here */}
                        </div>
                    </div>
                    {/* RIGHT COLUMN: Centered & Balanced Step-by-Step Lesson Workspace */}
                    <div style={{background: "rgba(255, 255, 255, 0.4)", border: "1px solid var(--line)", padding: "35px", borderRadius: "var(--radius)", display: "flex", flexDirection: "column", height: "680px"}}>
                        {/* Right Column Tab Switching Controls */}
                        <div style={{display: "flex", gap: "20px", borderBottom: "1px solid var(--line)", marginBottom: "24px", flexShrink: "0"}}>
                            <button onClick={() => window.eval("switchLMSTab('reading')")} className="tab-btn" id="tab-reading" style={{fontFamily: "var(--body)", fontWeight: "600", fontSize: "0.9rem", padding: "8px 0 12px", background: "transparent", border: "none", borderBottom: "2px solid var(--ink)", cursor: "pointer", color: "var(--ink)"}}>
                                Course Handbook Text
                            </button>
                            <button onClick={() => window.eval("switchLMSTab('materials')")} className="tab-btn" id="tab-materials" style={{fontFamily: "var(--body)", fontWeight: "600", fontSize: "0.9rem", padding: "8px 0 12px", background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", opacity: "0.5"}}>
                                Study Materials
                            </button>
                        </div>
                        {/* RIGHT PANEL 1: SCROLLABLE HANDBOOK TEXT COMPONENT */}
                        <div id="panel-reading" className="lms-panel" style={{display: "flex", flexDirection: "column", flexGrow: "1", overflow: "hidden"}}>
                            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px"}}>
                                <h4 id="reading-article-title" style={{fontFamily: "var(--display)", fontSize: "1.4rem", margin: "0", color: "var(--ink)", fontWeight: "500"}}>
                                    Lesson Article
                                </h4>
                                <span id="module-step-counter" style={{fontSize: "0.82rem", fontWeight: "600", background: "rgba(16,25,43,0.06)", padding: "4px 10px", borderRadius: "20px"}}>
                                    Module 1 of 4
                                </span>
                            </div>
                            {/* Clean, scrollable study interface frame box */}
                            <div id="reading-scroll-box" style={{flexGrow: "1", overflowY: "auto", background: "rgba(255,255,255,0.6)", border: "1px solid var(--line)", borderRadius: "var(--radius)", padding: "24px", lineHeight: "1.7", fontSize: "0.98rem", color: "var(--charcoal)", marginBottom: "20px"}}>
                                <div id="reading-article-body">
                                    {/* Structured handbook textbook chapters print dynamically directly inside here */}
                                </div>
                                {/* Hidden marker at the absolute bottom of the text to catch scroll completions */}
                                <div id="reading-bottom-marker" style={{height: "2px", marginTop: "20px"}}></div>
                            </div>
                            {/* NEW: Dynamic Navigation & Auto-Complete Control Center */}
                            <div id="lesson-action-bar" style={{display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--line)", paddingTop: "16px", flexShrink: "0"}}>
                                <button id="next-module-btn" disabled="" onClick={() => window.eval("navigateToNextLessonModule()")} style={{fontFamily: "var(--body)", fontWeight: "600", fontSize: "0.85rem", padding: "12px 24px", background: "var(--ink)", color: "#fff", border: "none", borderRadius: "var(--radius)", cursor: "not-allowed", opacity: "0.4", transition: "all 0.2s ease"}}>
                                    Complete & Proceed →
                                </button>
                            </div>
                        </div>
                        {/* RIGHT PANEL 2: MATERIALS DOWNLOAD LIST COMPONENT */}
                        <div id="panel-materials" className="lms-panel" style={{display: "none", overflowY: "auto", flexGrow: "1"}}>
                            <div id="materials-list-root" style={{display: "flex", flexDirection: "column", gap: "12px"}}>
                                {/* Download items print here */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="site-footer">
                <div className="wrap">
                    © 2026 Student Learning Environment Management Layer.
                </div>
            </footer>
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
