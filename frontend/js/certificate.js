const knownCourseTitles = {
  "CS-101": "Foundations of Programming",
  "CS-204": "Introduction to Computer Vision",
  "CS-309": "Autonomous Robotics Fundamentals",
  "CS-401": "Generative AI & Prompt Engineering",
  "CS-403": "Agentic AI Systems & Autonomous Frameworks"
};

export function initializeCertificateEngine() {
  const stageRoot = document.getElementById("stage-root");
  if (!stageRoot) return;

  const courseId = new URLSearchParams(window.location.search).get("id") || "CS-101";
  const studentId = localStorage.getItem("studentAcademicId") || "default";
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};
  const percent = allProgressStats[studentId]?.[courseId] || 0;
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  const customCourse = globalCourses.find(course => course.id === courseId);
  const courseTitle = customCourse?.title || knownCourseTitles[courseId] || courseId;

  if (percent < 100) {
    stageRoot.innerHTML = `
      <div class="locked-card">
        <div class="glyph">&#128274;</div>
        <h2>Certificate not yet unlocked</h2>
        <p>You're <strong>${percent}%</strong> through <strong>${courseTitle}</strong>. Finish every module to unlock your certificate.</p>
        <div class="locked-progress-bg"><div class="locked-progress-fill" style="width:${percent}%;"></div></div>
        <a class="btn btn-primary" href="course-content.html?id=${courseId}">Resume Course</a>
      </div>`;
    return;
  }

  const checklist = JSON.parse(localStorage.getItem(`checklist_${studentId}_${courseId}`)) || [];
  const studentName = localStorage.getItem("student_backup_name") || localStorage.getItem("studentName") || "Student";
  const rawHash = `${studentId}::${courseId}::skilltrack`;
  let hash = 0;
  for (let index = 0; index < rawHash.length; index += 1) {
    hash = (hash * 31 + rawHash.charCodeAt(index)) >>> 0;
  }
  const certificateId = `SKT-${hash.toString(36).toUpperCase()}`;
  const completionDate = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  stageRoot.innerHTML = `
  <div class="stage-actions">
    <button class="btn btn-primary" onclick="window.print()">Download / Print Certificate</button>
    <a class="btn btn-ghost" href="course-content.html?id=${courseId}">Back to Course</a>
  </div>
  <div class="certificate" id="certificate-card">
    <!-- Frame Borders -->
    <div class="cert-border-outer"></div>
    <div class="cert-border-middle"></div>
    <div class="cert-border-inner"></div>

    <!-- Corner Accents -->
    <svg class="flourish tl" viewBox="0 0 64 64" fill="none"><path d="M4 60 V20 Q4 4 20 4 H60" stroke="#B8893E" stroke-width="2"/><circle cx="20" cy="20" r="3.5" fill="#B8893E"/></svg>
    <svg class="flourish tr" viewBox="0 0 64 64" fill="none"><path d="M4 60 V20 Q4 4 20 4 H60" stroke="#B8893E" stroke-width="2"/><circle cx="20" cy="20" r="3.5" fill="#B8893E"/></svg>
    <svg class="flourish bl" viewBox="0 0 64 64" fill="none"><path d="M4 60 V20 Q4 4 20 4 H60" stroke="#B8893E" stroke-width="2"/><circle cx="20" cy="20" r="3.5" fill="#B8893E"/></svg>
    <svg class="flourish br" viewBox="0 0 64 64" fill="none"><path d="M4 60 V20 Q4 4 20 4 H60" stroke="#B8893E" stroke-width="2"/><circle cx="20" cy="20" r="3.5" fill="#B8893E"/></svg>

    <!-- Certificate Body -->
    <div class="cert-inner">
      <svg class="crest" viewBox="0 0 40 40" style="color: var(--gold); width: 44px; height: 44px; margin-bottom: 6px;">
        <circle cx="20" cy="20" r="18" stroke="currentColor" fill="none" stroke-width="1.2"/>
        <circle cx="20" cy="20" r="14" stroke="currentColor" fill="none" stroke-width="0.8"/>
        <path d="M12 28 L20 12 L28 28 Z" stroke="currentColor" fill="rgba(184,137,62,0.15)" stroke-width="1.2"/>
        <line x1="15" y1="23" x2="25" y2="23" stroke="currentColor" stroke-width="1.2"/>
      </svg>

      <div class="cert-eyebrow">Certificate of Completion</div>
      <div class="cert-lede">This certifies that</div>
      <div class="cert-name-wrap"><span class="cert-name">${studentName}</span></div>
      
      <svg class="cert-underline" viewBox="0 0 260 8" style="width: 240px; height: 8px; margin: 4px auto 14px; display: block;">
        <line x1="0" y1="4" x2="105" y2="4" stroke="#D9B97C" stroke-width="1.2"/>
        <circle cx="120" cy="4" r="3" fill="#B8893E"/>
        <line x1="135" y1="4" x2="240" y2="4" stroke="#D9B97C" stroke-width="1.2"/>
      </svg>

      <p class="cert-body-text">has successfully completed all requirements of the course</p>
      <div class="cert-course-title">${courseTitle}</div>
      <div class="cert-course-code">Course ${courseId} &middot; ${checklist.length} modules completed</div>
      
      <div class="cert-meta-row">
        <div class="cert-meta-item"><div class="cert-meta-label">Date Completed</div><div class="cert-meta-value">${completionDate}</div></div>
        <div class="cert-meta-item"><div class="cert-meta-label">Certificate ID</div><div class="cert-meta-value">${certificateId}</div></div>
        <div class="cert-meta-item"><div class="cert-meta-label">Issued By</div><div class="cert-meta-value">SkillTrack Portal</div></div>
      </div>
      
      <div class="cert-sign-row">
        <div class="cert-sign"><div class="cert-sign-name">A. Whitfield</div><div class="cert-sign-line"></div><div class="cert-sign-role">Program Director</div></div>
        <div class="cert-sign"><div class="cert-sign-name">R. Okafor</div><div class="cert-sign-line"></div><div class="cert-sign-role">Dean of Academics</div></div>
      </div>
    </div>
  </div>`;
}