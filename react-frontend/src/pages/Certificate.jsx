import { Link } from "react-router-dom";
import PageCss from "../components/PageCss";
import LegacyScript from "../components/LegacyScript";

export default function Certificate() {
    return (
        <>
            <PageCss href="/css/style.css" />
                        <header className="site-header">
                <div className="wrap">
                    <Link to="/student-dashboard" className="brand">
                        SkillTrack Portal
                    </Link>
                    <nav className="header-nav">
                        <Link to="/student-dashboard">
                            My Dashboard
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="stage" id="stage-root">
                {/* View states render inside here */}
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
