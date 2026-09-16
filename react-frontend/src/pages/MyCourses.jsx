import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function MyCourses() {
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
                        <span id="workspace-counter-pill" style={{fontSize: "0.82rem", fontWeight: "700", background: "rgba(16,25,43,0.06)", padding: "6px 14px", borderRadius: "30px", textTransform: "uppercase", letterSpacing: "0.05em"}}>
                            0 Active Modules
                        </span>
                    </div>
                    {/* MASTER INJECTION PORTAL GRID */}
                    <div id="workspace-modules-container" className="modules-grid">
                        {/* Enrolled course matrices render dynamically inside here */}
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
            <LegacyScript src="/legacy/js/main.js" module={true} />
        </>
    );
}
