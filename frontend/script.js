/**
 * Academic Architecture — Unified Application Blueprint
 * Consolidates generic UI behaviors, course instantiation nodes, and analytics computation.
 */

// ============================================================================
// 1. GLOBAL INTERACTION ROUTINES & SECURITY ROUTING (Runs on DOM Load)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {

  // --- Workspace Security Interceptor Guard ---
  // If the current window environment is the admin dashboard dashboard shell, inspect security keys
  if (window.location.pathname.includes('admin-dashboard.html')) {
    if (localStorage.getItem("isAdminVerified") !== "true") {
      alert("Access Denied: Administrative credential signatures required.");
      window.location.href = "admin-login.html";
      return; // Stop further thread execution
    }
    // Hydrate the visual dashboard statistics layout matrix
    hydrateAdminMetrics();
  }

  // --- Generic Form Mock Submission Engine ---
  // Intercepts forms marked with [data-mock-submit] to simulate network latency
  document.querySelectorAll('form[data-mock-submit]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const notice = form.querySelector('.notice');
      if (!notice) return;

      notice.classList.remove('error');
      notice.classList.add('success', 'show');
      notice.textContent = form.dataset.successMessage || 'Submitted successfully.';

      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const original = btn.textContent;
        btn.disabled = true;
        btn.textContent = 'Please wait…';
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = original;
        }, 1200);
      }
    });
  });

  // --- Dynamic Placeholder Dropdown Stylist ---
  // Keeps select element text muted until a valid option is actively selected
  document.querySelectorAll('select[data-placeholder-select]').forEach((select) => {
    const update = () => {
      select.style.color = select.value ? 'var(--charcoal)' : 'rgba(42,38,32,0.45)';
    };
    select.addEventListener('change', update);
    update();
  });

});

// ============================================================================
// 2. ADMIN BLUEPRINT INSTANTIATION MATRIX (Global Scope Routing)
// ============================================================================

/**
 * Triggers the modal gate configuration wrapper for security validation.
 */
function promptAdminSecurityVerification(event) {
  event.preventDefault(); 
  const modal = document.getElementById('admin-gate-modal');
  if (modal) modal.classList.add('active');
}

/**
 * Safely removes the activation anchor class from UI modal frames.
 */
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

/**
 * Validates administrative input parameters, constructs dynamic curriculum 
 * node clusters, and commits the unified layout directly into localStorage.
 */
function verifyAndCommitCourse(event) {
  event.preventDefault();

  const emailEl = document.getElementById('admin-email');
  const passEl = document.getElementById('admin-pass');
  if (!emailEl || !passEl) return;

  const email = emailEl.value;
  const pass = passEl.value;

  if (email === "admin@institute.edu" && pass === "password") {
    const courseId = document.getElementById('course-id')?.value.trim() || ""; 
    const trackMeta = document.getElementById('course-meta')?.value.trim() || ""; 
    const courseTitle = document.getElementById('course-title')?.value.trim() || "";
    const courseDesc = document.getElementById('course-desc')?.value.trim() || "";
    const duration = document.getElementById('course-duration')?.value.trim() || "";
    const complexityTrack = document.getElementById('course-track')?.value || "";
    const sourceUrl = document.getElementById('course-source-url')?.value.trim() || "https://www.geeksforgeeks.org";
    
    let domainLabel = "educational repository";
    try {
      domainLabel = new URL(sourceUrl).hostname.replace('www.', '');
    } catch(e) {
      domainLabel = "reference library";
    }

    const rawTasksString = document.getElementById('course-tasks')?.value || "";
    const rawTasks = rawTasksString.split(',');
    
    const tasksArray = rawTasks.map((taskLabel, index) => {
      const cleanLabel = taskLabel.trim();
      const topicFocus = cleanLabel.toLowerCase().includes('ai') || cleanLabel.toLowerCase().includes('agent')
        ? "autonomous system behaviors, state machine execution workflows, and decision-tree logic architecture"
        : "data normalization processes, algorithmic efficiency metrics, and implementation blueprints";

      return { 
        id: `task${index + 1}`, 
        label: cleanLabel,
        title: `${index + 1}. ${cleanLabel}`,
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Welcome to the core curriculum study review for <strong>${cleanLabel}</strong>. This instructional segment explores the primary operational theories governing this domain, pulling framework contexts directly from the referenced architecture archives over at <strong>${domainLabel}</strong>.</p>
          <p>Students will investigate the foundational parameters required to initialize, test, and validate core components under real-world production constraints.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Deep-Dive Operational Analysis</h5>
          <p>When implementing <strong>${cleanLabel}</strong> workflows, standard engineering practices suggest isolating execution routines across distinct phases. The primary focus centers on <em>${topicFocus}</em>.</p>
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Phase 1 (Ingestion & Normalization):</strong> Streamlining incoming raw variables to fit expected execution structures cleanly.</li>
            <li><strong>Phase 2 (Logic Evaluation):</strong> Processing the refined dataset through sequential algorithmic validation loops to guarantee output stability.</li>
          </ul>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Practical Field Application</h5>
          <p>In modern software engineering and enterprise applications, mastering the mechanics of <strong>${cleanLabel}</strong> ensures high system reliability. Teams leverage these exact patterns to mitigate scaling bottlenecks and sustain continuous integration pipelines fluidly.</p>
          <div style="margin-top: 24px; padding: 12px 16px; background: rgba(16,25,43,0.04); border-left: 3px solid var(--gold); font-size: 0.88rem; opacity: 0.85;">
            🌐 <strong>Curriculum Citation Node:</strong> Extended technical laboratory guides and primary reference documentation assets can be audited via the verified admin source link: <a href="${sourceUrl}" target="_blank" style="color: var(--burgundy); text-decoration: underline; font-weight: 600;">Open Reference Portal (${domainLabel})</a>
          </div>
        `
      };
    }).filter(t => t.label !== "");

    const newCourseBlueprint = {
      id: courseId,
      meta: trackMeta || `Module ${courseId} • ${complexityTrack}`,
      title: courseTitle,
      desc: courseDesc,
      duration: duration,
      track: complexityTrack,
      tasks: tasksArray,
      materials: [
        { name: `${courseId}_Syllabus_Overview.pdf`, size: "1.2 MB", type: "Curriculum Plan" }
      ]
    };

    let globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
    globalCourses.push(newCourseBlueprint);
    localStorage.setItem("globalCourses", JSON.stringify(globalCourses));

    alert("New structural course blueprint deployed directly into catalog matrix database layer.");
    closeModal('admin-gate-modal'); 
    window.location.href = "edit-course.html";
  } else {
    alert("Invalid Security Password. Database record entry request rejected.");
  }
}

// ============================================================================
// 3. ADMIN ANALYTICS INTELLIGENCE CORE ENGINE
// ============================================================================

/**
 * Interrogates local identity registries and computing states to paint live
 * institutional data analytics maps across the UI layer panels.
 */
function hydrateAdminMetrics() {
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || []; //
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {}; //

  let totalActiveEnrollments = 0; //
  let completedCoursesCount = 0; //
  let uniqueStudents = new Set(); //

  let courseEnrollmentCounts = {}; //
  globalCourses.forEach(course => {
    courseEnrollmentCounts[course.id] = 0; //
  });

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i); //
    
    if (key && key.startsWith("enrolledTracks_")) { //
      const studentId = key.replace("enrolledTracks_", ""); //
      uniqueStudents.add(studentId);  //

      const studentEnrollments = JSON.parse(localStorage.getItem(key)) || []; //
      totalActiveEnrollments += studentEnrollments.length; //

      studentEnrollments.forEach(track => {
        if (courseEnrollmentCounts.hasOwnProperty(track.courseId)) { //
          courseEnrollmentCounts[track.courseId]++; //
        }
      });

      const studentProgress = allProgressStats[studentId] || {}; //
      for (const courseId in studentProgress) {
        if (studentProgress[courseId] === 100) { //
          completedCoursesCount++; //
        }
      }
    }
  }

  const cards = document.querySelectorAll('.metric-value'); //
  if (cards.length >= 4) {
    cards[0].innerText = uniqueStudents.size;       //
    cards[1].innerText = globalCourses.length;       //
    cards[2].innerText = totalActiveEnrollments;     //
    cards[3].innerText = completedCoursesCount;      //
  }

  const barsRoot = document.getElementById('course-enrollment-bars-root'); //
  if (!barsRoot) return; //
  
  barsRoot.innerHTML = ""; //

  if (globalCourses.length === 0) {
    barsRoot.innerHTML = `<p style="opacity:0.5; text-align:center; padding: 20px 0;">No active courses found inside storage registers.</p>`; //
    return; //
  }

  const maxPrototypeCapacity = 10; //

  globalCourses.forEach(course => {
    const count = courseEnrollmentCounts[course.id] || 0; //
    const calculatedWidth = Math.min((count / maxPrototypeCapacity) * 100, 100); //

    const rowHTML = `
      <div style="border-bottom: 1px solid var(--line); padding-bottom: 20px; margin-bottom: 12px;">
        <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
          <div>
            <strong style="color: var(--ink); font-size: 1.05rem;">${course.title}</strong>
            <span style="font-size: 0.78rem; opacity: 0.6; margin-left: 8px; font-weight: 600; letter-spacing:0.05em;">[${course.id}]</span>
          </div>
          <span style="font-size: 0.88rem; font-weight: 700; color: var(--gold);">
            ${count} ${count === 1 ? 'Student' : 'Students'} Enrolled
          </span>
        </div>
        <div style="width: 100%; height: 14px; background: rgba(16,25,43,0.06); border-radius: 1px; overflow: hidden;">
          <div style="
            width: ${calculatedWidth === 0 ? '4px' : calculatedWidth + '%'}; 
            height: 100%; 
            background: ${calculatedWidth === 0 ? 'rgba(16,25,43,0.15)' : 'var(--ink)'}; 
            transition: width 0.5s ease-out;
          "></div>
        </div>
      </div>
    `; //
    barsRoot.insertAdjacentHTML('beforeend', rowHTML); //
  });
}

/**
 * Destroys validation credentials securely across system layers and cleanses navigation windows.
 */
function logoutAdmin() {
  localStorage.removeItem("isAdminVerified"); //
  localStorage.removeItem("isStudentLoggedIn"); //
  localStorage.removeItem("studentName"); //
  localStorage.removeItem("studentAcademicId"); //
  
  alert("Administrative session closed safely."); //
  window.location.href = "index.html"; //
}
// ============================================================================
// 4. ADMIN AUTHENTICATION CONTROLLER
// ============================================================================

/**
 * Attaches the login interceptor logic if the admin login form is present on the page.
 */
function initializeAdminLogin() {
  const loginForm = document.getElementById('admin-login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from submitting normally

    const emailEl = document.getElementById('admin-email');
    const passEl = document.getElementById('admin-password');
    const notice = document.getElementById('login-notice');
    if (!emailEl || !passEl || !notice) return;

    const email = emailEl.value;
    const password = passEl.value;

    // Perform validation check against required mock credentials
    if (email === "admin@institute.edu" && password === "password") {
      // Clear out student contexts to prevent session bleeding
      localStorage.removeItem("isStudentLoggedIn");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentAcademicId");

      // Save admin verification flag to memory
      localStorage.setItem("isAdminVerified", "true");

      // Display success feedback layout parameters
      notice.className = "notice show success";
      notice.innerText = "Login successful — redirecting to the administrative registry.";

      // Smooth redirect back to courses system panel after a split second
      setTimeout(function() {
        window.location.href = "courses.html";
      }, 1000);
      
    } else {
      // Display alert block when credential properties misalign
      notice.className = "notice show error";
      notice.innerText = "Access Denied: Invalid credentials.";
    }
  });
}

// Wire the listener execution inside our global DOMContentLoaded routine
document.addEventListener('DOMContentLoaded', initializeAdminLogin);

// ============================================================================
// 5. ACADEMIC CERTIFICATE & CREDENTIAL ROUTINES
// ============================================================================

/**
 * Hardcoded initial catalog index registry for fallback queries
 */
const KNOWN_COURSE_TITLES = {
  "CS-101": "Foundations of Programming",
  "CS-204": "Introduction to Computer Vision",
  "CS-309": "Autonomous Robotics Fundamentals",
  "CS-401": "Generative AI & Prompt Engineering",
  "CS-403": "Agentic AI Systems & Autonomous Frameworks"
};

/**
 * Attaches the document parser logic if the certificate engine stage frame is detected.
 */
function initializeCertificateEngine() {
  const stageRoot = document.getElementById('stage-root');
  if (!stageRoot) return;

  const urlParams = new URLSearchParams(window.location.search);
  const courseId = urlParams.get('id') || "CS-101";
  
  const studentId = localStorage.getItem("studentAcademicId") || "default";
  
  // Calculate specific course progress vectors
  const stats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};
  const percent = (stats[studentId] && stats[studentId][courseId]) || 0;

  // Retrieve matching course architectural blueprints
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  const custom = globalCourses.find(c => c.id === courseId);
  const courseInfo = {
    title: (custom && custom.title) || KNOWN_COURSE_TITLES[courseId] || courseId,
    totalModules: custom && custom.tasks ? custom.tasks.length : null
  };

  if (percent >= 100) {
    renderCertificateView(stageRoot, courseId, courseInfo, studentId);
  } else {
    renderLockedStateView(stageRoot, courseId, courseInfo, percent);
  }
}

/**
 * Paints the access denied structural card when parameters fall short of graduation benchmarks.
 */
function renderLockedStateView(target, courseId, courseInfo, percent) {
  target.innerHTML = `
    <div class="locked-card">
      <div class="glyph">🔒</div>
      <h2>Certificate not yet unlocked</h2>
      <p>You're <strong>${percent}%</strong> through <strong>${courseInfo.title}</strong>. Finish every module to unlock your certificate of completion.</p>
      <div class="locked-progress-bg"><div class="locked-progress-fill" style="width:${percent}%;"></div></div>
      <a class="btn btn-primary" href="course-content.html?id=${courseId}">Resume course</a>
    </div>
  `;
}

/**
 * Compiles dynamic profile assets and prints the high-fidelity graduation credential card wrapper.
 */
function renderCertificateView(target, courseId, courseInfo, studentId) {
  const studentName = localStorage.getItem("student_backup_name") || "";
  const checklist = JSON.parse(localStorage.getItem(`checklist_${studentId}_${courseId}`)) || [];
  const completedCount = checklist.length;
  
  // Generate secure credential hashing indices
  const rawHashString = `${studentId}::${courseId}::skilltrack`;
  let hash = 0;
  for (let i = 0; i < rawHashString.length; i++) {
    hash = (hash * 31 + rawHashString.charCodeAt(i)) >>> 0;
  }
  const certId = "SKT-" + hash.toString(36).toUpperCase();
  const dateStr = new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  target.innerHTML = `
    <div class="stage-actions">
      <button class="btn btn-primary" onclick="window.print()">Download / Print Certificate</button>
      <a class="btn btn-ghost" href="course-content.html?id=${courseId}">Back to course</a>
    </div>

    <div class="certificate" id="certificate-card">
      <svg class="cert-watermark" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <path class="mark-ink" d="M32 36c-12 0-20 7-20 16v6h40v-6c0-9-8-16-20-16z"></path>
        <circle class="mark-ink" cx="32" cy="20" r="11"></circle>
        <path class="mark-gold" d="M32 4 L54 12 L32 20 L10 12 Z"></path>
        <path class="mark-gold" d="M18 14.5 V23 c0 3.5 6.5 6.5 14 6.5 s14 -3 14 -6.5 V14.5 L32 19.5 Z"></path>
        <line class="mark-gold-line" x1="54" y1="12" x2="54" y2="24"></line>
        <circle class="mark-gold-fill" cx="54" cy="26" r="1.6"></circle>
      </svg>
      
      <div class="cert-border-outer"></div>
      <div class="cert-border-middle"></div>
      <div class="cert-border-inner"></div>
      
      <svg class="flourish tl" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"></svg>
      <svg class="flourish tr" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="transform: scaleX(-1);"></svg>
      <svg class="flourish bl" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="transform: scaleY(-1);"></svg>
      <svg class="flourish br" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style="transform: scale(-1,-1);"></svg>

      <div class="cert-inner">
        <svg class="crest" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="21"></circle>
          <circle cx="24" cy="24" r="16"></circle>
          <path d="M24 13 L29 22 L24 31 L19 22 Z"></path>
          <line x1="24" y1="31" x2="24" y2="37"></line>
          <line x1="20" y1="37" x2="28" y2="37"></line>
        </svg>
        
        <div class="cert-eyebrow">Certificate of Completion</div>
        <div class="cert-lede">This certifies that</div>

        <div class="cert-name-wrap">
          <span class="cert-name" id="student-name-field" contenteditable="${studentName ? 'false' : 'true'}"
                onblur="saveStudentName(this)">${studentName || "Click to enter your name"}</span>
        </div>
        <svg class="cert-underline" viewBox="0 0 300 10" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 5 C 60 -2, 100 12, 150 5 C 200 -2, 240 12, 298 5" fill="none" stroke="var(--gold)" stroke-width="1.4"/>
        </svg>

        <p class="cert-body-text">has successfully completed all requirements of the course</p>
        <div class="cert-course-title">${courseInfo.title}</div>
        <div class="cert-course-code">Course ${courseId}${courseInfo.totalModules ? ` · ${completedCount} of ${courseInfo.totalModules} modules` : ''}</div>

        <div class="cert-meta-row">
          <div class="cert-meta-item">
            <div class="cert-meta-label">Date Completed</div>
            <div class="cert-meta-value">${dateStr}</div>
          </div>
          <div class="cert-meta-item">
            <div class="cert-meta-label">Certificate ID</div>
            <div class="cert-meta-value">${certId}</div>
          </div>
          <div class="cert-meta-item">
            <div class="cert-meta-label">Issued By</div>
            <div class="cert-meta-value">SkillTrack Portal</div>
          </div>
        </div>

        <div class="cert-sign-row">
          <div class="cert-sign">
            <div class="cert-sign-name">A. Whitfield</div>
            <div class="cert-sign-line"></div>
            <div class="cert-sign-role">Program Director</div>
          </div>
          <div class="cert-sign">
            <div class="cert-sign-name">R. Okafor</div>
            <div class="cert-sign-line"></div>
            <div class="cert-sign-role">Dean of Academics</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Commits the custom user input string back into the local application state layer.
 */
function saveStudentName(el) {
  const name = el.innerText.trim();
  if (!name || name === "Click to enter your name") return;
  
  localStorage.setItem("student_backup_name", name);
  el.setAttribute('contenteditable', 'false');
}

// Wire the listener execution inside our global DOMContentLoaded routine
document.addEventListener('DOMContentLoaded', initializeCertificateEngine);

// ============================================================================
// 6. CLASSROOM HUB & REFERENCE EXTRACTOR SYSTEM
// ============================================================================

// Global operational state buffers for the classroom context layer
let activeCourseId = "";
let activeStudentId = "";
let currentLoadedTaskIndex = 0; 
let scrollTrackerObserver = null;

// Dynamic textbook content fallback catalog for core static syllabus elements
const defaultMaterialsDatabase = {
  "CS-101": {
    materials: [
      { name: "Python Basics Reference Manual.pdf", size: "1.8 MB", type: "PDF Guide" },
      { name: "Java Setup & Hello World Lab.zip", size: "2.1 MB", type: "Code Template" }
    ],
    tasks: [
      { 
        id: "task1", 
        label: "Learn basic coding rules and data types in Python and Java",
        title: "1. Basic Coding Rules & Core Data Types",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Computer software programs operate by converting human-readable files into linear instructions that a central processing unit can execute sequentially. Python and Java tackle this environment using two distinct philosophies. Python is a dynamically-typed, interpreted language optimized for clean speed and rapid prototyping, utilizing strict structural indentation spacing rules rather than brackets to segregate blocks. Java, conversely, is a compiled, statically-typed object-oriented language running inside a virtual environment (JVM), prioritizing maximum system safety, strict variable types, and explicitly bound bracket constraints.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Variables serve as named memory storage blocks allocated within your system hardware. Before processing data, compilers must know how much storage a variable requires. In Python, typing happens automatically behind the scenes when a value is assigned. In Java, you must explicitly declare the data scale up front:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Integers (int):</strong> Custom memory slots designed exclusively to carry whole mathematical digits without fractional remainders.</li>
            <li><strong>Strings:</strong> Ordered character arrays handled as immutable text objects for labels, messages, and descriptors.</li>
            <li><strong>Booleans:</strong> Singular binary flags reading exclusively as True or False, acting as structural truth metrics.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>In global finance platforms, banking data tracks require strict variable separation. Account balances are anchored within precise data designations to prevent precision loss errors, while user identification tags utilize character strings to route transaction histories across web interfaces securely.</p>
        `
      },
      { 
        id: "task2", 
        label: "Write simple conditional statements using If-Else logic",
        title: "2. Conditional Logic & If-Else Logic Paths",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>A software layout remains flat and non-functional unless it possesses the ability to make logical choices during runtime execution. Conditional logic gates empower platforms to analyze dynamic input criteria, compare them against set boundary rules, and split the program execution down completely separate functional paths based on the evaluation result.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>The system evaluates parameters using comparison operators (such as equal-to, greater-than, or not-equal) to generate a clear truth state. The engine routes inputs through standard conditional steps:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>The If Gate:</strong> The primary gateway checkpoint framework. If the incoming dataset meets the requirements, the system executes this block and skips all alternative options.</li>
            <li><strong>The Else-If Chain:</strong> Secondary filter rules that catch variations when the primary condition fails, keeping logic precise.</li>
            <li><strong>The Else Fallback:</strong> The final safety net container that catches any remaining data configurations automatically.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>E-commerce checkout pipelines run entirely on conditional gates. The system screens incoming shopping carts: IF user inputs a valid discount code, deduct the promotional value; ELSE IF the delivery location is international, inject standard global shipping premiums; ELSE process standard order baseline parameters.</p>
        `
      },
      { 
        id: "task3", 
        label: "Use standard For and While loops to repeat tasks automatically",
        title: "3. Loop Iterations & Task Automation",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>One of computers' greatest strengths is their ability to execute identical calculations millions of times without fatigue or deviation. Iteration loops allow developers to pack repetitive work cycles into single concise instructions, preventing manual code duplication and keeping code footprints minimal and maintainable.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Programs manage loop structures through two standard operational models:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>For Loops (Count-Driven):</strong> Ideal when the precise scope size is known in advance. The loop counts upward systematically through a fixed dataset array or range map from a designated index start to a defined boundary.</li>
            <li><strong>While Loops (Condition-Driven):</strong> Designed to run continuously as long as a target state remains active, perfect for persistent listeners.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Social media feeds utilize loop streams to construct user pages. When a user opens their profile dashboard, a dedicated loop scans their database cache, loops through the post objects sequentially, and prints the layout cards on-screen from newest to oldest automatically.</p>
        `
      },
      { 
        id: "task4", 
        label: "Find common mistakes in your code and practice simple debugging",
        title: "4. Code Debugging & Finding Errors",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Writing code is an iterative conversation with a language compiler; errors and bugs are normal stepping stones in software development. Debugging is the tactical, structured method of reading runtime terminal feedback, tracing performance exceptions, identifying logical contradictions, and stabilizing execution paths.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Errors generally sort into three primary handling bins:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Syntax Violations:</strong> Grammar failures (like missing commas or unclosed quotes) that block interpretation.</li>
            <li><strong>Runtime Exceptions:</strong> Valid code configurations that encounter impossible data environments, like trying to divide by zero.</li>
            <li><strong>Logic Flaws:</strong> Programs that execute without errors but produce incorrect results because a calculation rule is wrong.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Software test pipelines run debugging monitors continuously. By using console logger outputs and checking breakpoints step-by-step, engineers can isolate failing network parameters inside sandboxed environments before shipping features to global user spaces.</p>
        `
      }
    ]
  },
  "CS-204": {
    materials: [
      { name: "Introduction to Computer Vision Slides.pdf", size: "3.5 MB", type: "Lecture Notes" },
      { name: "Image Processing Sample Files.zip", size: "8.4 MB", type: "Practice Images" }
    ],
    tasks: [
      { 
        id: "task1", 
        label: "Learn what Computer Vision is and how it is used in real life",
        title: "1. Introduction to Computer Vision",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Computer Vision is a branch of Artificial Intelligence that allows digital systems to extract meaningful, actionable context from visual inputs like images and videos. While biological sight interprets shapes effortlessly, a computer must translate pixel patterns using mathematical transformations to comprehend visual structure.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>The core pipeline splits into three key visual processing steps:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Acquisition:</strong> Grabbing digital input from cameras, sensors, or storage files.</li>
            <li><strong>Feature Extraction:</strong> Running math filters to find structural anchors like edges, corners, and color gradients.</li>
            <li><strong>Classification:</strong> Matching extracted patterns against database tables to label the identified object accurately.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Autonomous vehicle networks rely entirely on this framework. Front-facing cameras scan road paths continuously, passing video frames to classification models that isolate lane markings, identify red light changes, and track pedestrian movements to manage steering decisions safely.</p>
        `
      },
      { 
        id: "task2", 
        label: "Understand how computers read images as grids of tiny colored pixels",
        title: "2. Pixels & Digital Color Matrices",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>To a computer framework, an image does not exist as an artistic canvas; it is read as a structured mathematical matrix grid. Every tiny square block inside this array is a pixel containing numerical coordinate descriptors that map light intensity and color values.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Image dimensions translate directly into matrix width and height arrays:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Grayscale Layouts:</strong> Single-layer matrices where every cell contains a value between 0 (pure black) and 255 (pure white).</li>
            <li><strong>RGB Channels:</strong> Three overlapping matrix layers representing Red, Green, and Blue, blending values to display millions of colors.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Medical imaging systems like X-Rays use pixel intensity filters to assist doctors. By screening grayscale matrix fields for bright areas where tissue density is high, automated tools can flag structural anomalies or bone fractures for review.</p>
        `
      },
      { 
        id: "task3", 
        label: "Explore basic image editing filters and edge detection tools",
        title: "3. Image Filters & Finding Object Boundaries",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Image filters let software extract structural shapes by transforming pixel values. The most foundational task is isolating boundaries, which helps models map where an item ends and its surrounding background begins.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Edge identification software uses kernel operators—small mathematical blocks that slide across the image matrix pixel-by-pixel:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Gradient Calculation:</strong> The system compares a target pixel with its neighbors. A sharp change in brightness signals a structural edge.</li>
            <li><strong>Sobel/Canny Filtering:</strong> Standard mathematical filters that isolate vertical and horizontal lines, converting photos into clean line-art outlines.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Industrial sorting factories use edge lines to manage automated assembly lines. Overhead scanners compute product outlines to verify consistency, checking that products match standard shapes and sorting packaging errors instantly.</p>
        `
      },
      { 
        id: "task4", 
        label: "See how smart AI models track and locate items in a live video",
        title: "4. Real-Time Object Tracking Frameworks",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>While analyzing single static images is useful, modern applications require systems that can track moving targets across continuous video streams by combining spatial coordinates and motion tracking vectors.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Real-time processing algorithms split tracking work across specialized cycles:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Bounding Box Estimation:</strong> The model draws precise pixel borders around a targeted object.</li>
            <li><strong>Vector Interception:</strong> The algorithm compares current tracking locations with previous frames to map speed and trajectory, anticipating where the object will move next.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Sports analytics programs deploy tracking frameworks to follow player movements on the field. The software processes live camera feeds to evaluate spatial position metrics, sprint velocities, and ball trajectories instantly.</p>
        `
      }
    ]
  },
  "CS-309": {
    materials: [
      { name: "Line Follower Wiring Blueprint.pdf", size: "4.2 MB", type: "Circuit Diagram" },
      { name: "Basic Robot Steering Sketch.ino", size: "12 KB", type: "Arduino Source" }
    ],
    tasks: [
      { 
        id: "task1", 
        label: "Connect and test simple distance sensors on your prototype board",
        title: "1. Proximity Sensors & Distance Tracking",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Autonomous mobile robotics rely on sensory feedback loops to safely navigate physical spaces. Proximity modules provide distance telemetry, allowing a microcontroller to detect obstacles and map its surroundings dynamically.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Ultrasonic sensors calculate distance using sonar acoustic transit time equations:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>The Trigger Pin:</strong> Fires a high-frequency sound wave burst outward into the environment.</li>
            <li><strong>The Echo Pin:</strong> Listens for the returning sound reflection bounce. The board measures this duration in microseconds to calculate distance.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Automotive backup warning alarms rely on this exact framework. Bumper-mounted proximity sensors map wall distances during parking maneuvers, sounding audible chimes that scale in frequency as obstacles get closer.</p>
        `
      },
      { 
        id: "task2", 
        label: "Learn how to control motor speeds and change wheel directions",
        title: "2. Motor Controls & H-Bridge Integration",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Microcontrollers cannot supply the high electrical currents needed to drive mechanical motors directly. To bridge this gap, robotics platforms use dedicated motor driver circuits that handle heavy current delivery safely.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Motor drivers route power through an arrangement of electrical switches called an H-Bridge:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Direction Controls:</strong> Toggling positive and negative voltage paths alters current flow, switching wheel spin direction instantly.</li>
            <li><strong>Pulse Width Modulation (PWM):</strong> Rapidly cycling motor power on and off at high frequencies controls wheel speed smoothly.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Automated warehouse vehicles deploy heavy-duty H-Bridge drivers. These controllers allow automated carts to precisely adjust wheel power and direction, maneuvering safely through tight warehouse inventory aisles.</p>
        `
      },
      { 
        id: "task3", 
        label: "Write a simple program to read sensor data and steer a robot smoothly",
        title: "3. Building Autonomous Navigation Logic",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Connecting sensors and motors is only half the battle; software acts as the intelligent core that links them. Navigation program loops gather real-time tracking data and convert it into steering actions instantly.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Line followers keep track of their path by monitoring infrared array arrays:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Reflective Monitoring:</strong> Dark surfaces absorb infrared rays, while bright floors bounce light back into the receiver.</li>
            <li><strong>Steering Corrections:</strong> If the left sensor shifts off the line, the program slows the left wheel to turn the chassis back onto its track safely.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Modern printing facilities use autonomous vehicles to transport heavy paper rolls. These carts follow painted paths on factory floors, using infrared sensor arrays to stay perfectly aligned with delivery routes.</p>
        `
      },
      { 
        id: "task4", 
        label: "Assemble the basic robot body frame and plug in the batteries",
        title: "4. Complete Chassis Mechanical Assembly",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Mechanical assembly links code parameters with physical reality. Proper structural design ensures balanced weight distribution, stable sensor mounting alignment, and smooth power delivery across all systems.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Assembly involves stacking structural layers carefully:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Chassis Stabilization:</strong> Aligning drive motors symmetrically to prevent unintended veering.</li>
            <li><strong>Sensors & Power Isolation:</strong> Shielding sensitive logic boards from motor electrical noise using clean, separated wiring paths.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Consumer robotic vacuums use this integrated structural blueprint. Their design combines low-profile physical frames, spring-loaded wheels, and isolated internal battery packs to maximize cleaning runtime and maneuverability.</p>
        `
      }
    ]
  },
  "CS-401": {
    materials: [
      { name: "Generative_AI_Foundations.pdf", size: "2.8 MB", type: "Lecture Notes" },
      { name: "Prompt_Engineering_Guidebook.txt", size: "45 KB", type: "Cheat Sheet" }
    ],
    tasks: [
      { 
        id: "task1", 
        label: "Learn what Generative AI is and how it creates text and images",
        title: "1. Introduction to Generative Models",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Generative Artificial Intelligence is a branch of machine learning focused on creating entirely new original content. Unlike traditional AI models that analyze data to make predictions, generative architectures capture complex data patterns to generate structured text summaries, clean computer code, or realistic images from simple user prompts.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>Generative networks rely on deep learning structures:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Pattern Processing:</strong> The AI maps statistical relationships across massive datasets to learn how ideas connect.</li>
            <li><strong>Content Synthesis:</strong> When given a prompt, the system builds an original output from scratch by selecting the most logical next piece in a sequence.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Modern ideation programs deploy generative networks to automate corporate design tasks. Marketing platforms use these models to instantly turn basic feature outlines into tailored ad copy variations across multiple channels.</p>
        `
      },
      { 
        id: "task2", 
        label: "Understand how smart AI models are trained on large datasets",
        title: "2. Large Language Model Training Frameworks",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Large Language Models (LLMs) require massive computing pipelines to develop conversational abilities. This capability is built through deep neural training cycles that map contextual connections between phrases.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>The core training framework scales across two primary processing phases:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Unsupervised Pre-training:</strong> Models read web scale book datasets to learn language structures, grammar patterns, and factual connections.</li>
            <li><strong>Fine-Tuning (RLHF):</strong> Human trainers grade AI responses, guiding the model to remain helpful, safe, and accurate.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Customer service software companies leverage fine-tuned text models to power automated helpdesks. By training models on company product manuals, platforms can resolve customer questions automatically with high accuracy.</p>
        `
      },
      { 
        id: "task3", 
        label: "Master clear prompt writing techniques to get high-quality answers",
        title: "3. Prompt Engineering Strategies",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Prompt engineering is the art and science of structuring text inputs precisely so that generative models produce accurate, relevant, and useful responses while avoiding generic or incorrect answers.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>High-quality prompt architecture relies on clear structural components:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>Context Definitions:</strong> Explicitly assigning the AI a persona or field expertise (e.g., 'Act as a senior software tester').</li>
            <li><strong>Constraints & Examples (Few-Shot):</strong> Providing target formatting outlines and clear style rules to guide the output format.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Data analysis firms use strict prompt structures to convert raw unstructured text summaries into clean spreadsheets, prompting models to extract dates and prices into uniform tables automatically.</p>
        `
      },
      { 
        id: "task4", 
        label: "Learn about safe AI rules and see how to create a simple chatbot text box",
        title: "4. Application Integration & Safety Guardrails",
        body: `
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">I. Concept Introduction</h5>
          <p>Deploying AI tools for user spaces requires building responsive application connections equipped with reliable data security and output filtering guardrails.</p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">II. Mechanical Breakdown</h5>
          <p>The application interface framework relies on secure handling pipes:
          <ul style="padding-left: 20px; margin: 8px 0;">
            <li><strong>API Connectivity:</strong> Web forms pass user messages to server hubs, fetching AI calculations securely.</li>
            <li><strong>Moderation Layers:</strong> Safety firewalls block inappropriate topics and protect user information from leaking.</li>
          </ul></p>
          <h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 18px 0 8px 0;">III. Industry Application</h5>
          <p>Telehealth patient assistance platforms use heavily guarded API portals. Safe input routing filters patient records through strict security protocols, providing instant scheduling help while protecting private healthcare details.</p>
        `
      }
    ]
  }
};

/**
 * Bootstraps the complete classroom workbench setup layout.
 */
function initializeClassroomHub() {
  if (!document.getElementById('modules-root')) return;

  activeStudentId = localStorage.getItem("studentAcademicId") || "default";
  const urlParams = new URLSearchParams(window.location.search);
  activeCourseId = urlParams.get('id') || "CS-101";

  hydrateClassroomWorkspace();
  initializeScrollObserver();
}

/**
 * Investigates registry logs and populates workspace blueprints.
 */
function hydrateClassroomWorkspace() {
  let data = defaultMaterialsDatabase[activeCourseId];
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  const customCourseData = globalCourses.find(c => c.id === activeCourseId);

  if (customCourseData && customCourseData.tasks && customCourseData.tasks.length > 0 && !data) {
    data = {
      materials: customCourseData.materials || [{ name: "Course_Syllabus.pdf", size: "1.2 MB", type: "Document" }],
      tasks: customCourseData.tasks
    };
    defaultMaterialsDatabase[activeCourseId] = data;
  }

  const needsGeneration = customCourseData && customCourseData.referenceUrl &&
    (!customCourseData.tasks || customCourseData.tasks.length === 0) && !data;

  if (needsGeneration) {
    renderCourseHeader(customCourseData);
    showReferenceGenerationLoadingState(customCourseData.referenceUrl);
    generateCourseFromReference(activeCourseId, customCourseData.referenceUrl, customCourseData);
    return;
  }

  if (!data) {
    data = {
      materials: [{ name: "Course_Syllabus.pdf", size: "1.2 MB", type: "Document" }],
      tasks: [
        { id: "task1", title: "1. Introductory Core Overview", label: "Read foundational rules", body: "<p>Read this foundational core guide entry fully.</p>" }
      ]
    };
    defaultMaterialsDatabase[activeCourseId] = data;
  }

  renderCourseHeader(customCourseData);
  finishRenderingCourse(data);
}

function renderCourseHeader(customCourseData) {
  const codeMeta = document.getElementById('course-code-meta');
  const titleDisplay = document.getElementById('course-title-display');
  const descDisplay = document.getElementById('course-desc-display');

  if (codeMeta) codeMeta.innerText = activeCourseId;
  if (titleDisplay) titleDisplay.innerText = customCourseData ? (customCourseData.title || `Classroom ${activeCourseId}`) : "Classroom Framework";
  if (descDisplay) descDisplay.innerText = customCourseData ? (customCourseData.description || "") : "";
}

function finishRenderingCourse(data) {
  currentLoadedTaskIndex = 0;
  const completedTasks = JSON.parse(localStorage.getItem(`checklist_${activeStudentId}_${activeCourseId}`)) || [];

  renderMilestonesSidebar(data.tasks, completedTasks);
  loadActiveLessonModulePage();
  renderMaterialsList(data.materials || []);
  evaluateProgressMetricsUpdate();
}

function renderMaterialsList(materials) {
  const root = document.getElementById('materials-list-root');
  if (!root) return;
  root.innerHTML = "";

  if (!materials || materials.length === 0) {
    root.innerHTML = `<p style="opacity:0.6; font-size:0.9rem;">No downloadable materials for this course yet.</p>`;
    return;
  }

  materials.forEach(item => {
    const clickable = item.url ? `onclick="window.open('${item.url}', '_blank')" style="cursor:pointer;"` : '';
    root.insertAdjacentHTML('beforeend', `
      <div ${clickable} style="display:flex; justify-content:space-between; align-items:center; background:white; border:1px solid var(--line); border-radius:var(--radius); padding:14px 18px;">
        <div>
          <div style="font-weight:600; font-size:0.92rem; color:var(--ink);">${item.name}</div>
          <div style="font-size:0.78rem; opacity:0.6; margin-top:2px;">${item.type || 'Document'}</div>
        </div>
        <span style="font-size:0.8rem; opacity:0.6;">${item.size || ''}</span>
      </div>
    `);
  });
}

/**
 * Cross-Origin Scraping Engine & Parser Relay Modules
 */
async function generateCourseFromReference(courseId, referenceUrl, customCourseData) {
  try {
    const proxied = `https://api.allorigins.win/raw?url=${encodeURIComponent(referenceUrl)}`;
    const response = await fetch(proxied);
    if (!response.ok) throw new Error(`Fetch failed with status ${response.status}`);
    const rawHTML = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(rawHTML, "text/html");
    doc.querySelectorAll('script, style, nav, header, footer, aside, form, noscript, iframe').forEach(el => el.remove());

    const root = doc.querySelector('article') || doc.querySelector('main') || doc.body;
    if (!root) throw new Error("No readable structure");

    const blocks = Array.from(root.querySelectorAll('h1, h2, h3, h4, p, li'));
    const sections = [];
    let current = null;

    blocks.forEach(el => {
      const text = el.textContent.replace(/\s+/g, ' ').trim();
      if (!text) return;
      if (/^H[1-4]$/.test(el.tagName)) {
        current = { heading: text, paragraphs: [] };
        sections.push(current);
      } else {
        if (!current) {
          current = { heading: null, paragraphs: [] };
          sections.push(current);
        }
        if (text.length > 25) current.paragraphs.push(text);
      }
    });

    const filteredSections = sections.filter(s => s.paragraphs.length > 0);
    if (filteredSections.length === 0) throw new Error("No paragraphs parsed");

    const courseTitle = customCourseData ? customCourseData.title : courseId;
    const MAX_TASKS = 6;
    const MIN_TASKS = 3;
    let usable = filteredSections.filter(s => s.heading);

    if (usable.length < MIN_TASKS) {
      const allParagraphs = filteredSections.flatMap(s => s.paragraphs);
      const chunkCount = Math.min(MAX_TASKS, Math.max(MIN_TASKS, Math.ceil(allParagraphs.length / 4)));
      const chunkSize = Math.ceil(allParagraphs.length / chunkCount) || 1;
      usable = [];
      for (let i = 0; i < allParagraphs.length; i += chunkSize) {
        usable.push({
          heading: `${courseTitle || 'Lesson'} — Part ${usable.length + 1}`,
          paragraphs: allParagraphs.slice(i, i + chunkSize)
        });
      }
    }

    const tasks = usable.slice(0, MAX_TASKS).map((section, idx) => {
      const bodyParagraphs = section.paragraphs.slice(0, 6).map(p => `<p>${p}</p>`).join('\n');
      const firstLine = section.paragraphs[0] || "";
      const label = firstLine.length > 110 ? firstLine.slice(0, 110).trim() + "…" : firstLine;
      return {
        id: `task${idx + 1}`,
        title: `${idx + 1}. ${section.heading}`,
        label: label || section.heading,
        body: `<h5 style="font-size: 1.1rem; color: var(--burgundy); margin: 0 0 8px 0;">${section.heading}</h5>${bodyParagraphs}`
      };
    });

    const data = {
      materials: (customCourseData && customCourseData.materials && customCourseData.materials.length > 0)
        ? customCourseData.materials
        : [{ name: `Reference: ${new URL(referenceUrl).hostname}`, size: "Web Link", type: "External Resource", url: referenceUrl }],
      tasks
    };

    defaultMaterialsDatabase[courseId] = data;

    const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
    const idx = globalCourses.findIndex(c => c.id === courseId);
    if (idx !== -1) {
      globalCourses[idx].tasks = tasks;
      if (!globalCourses[idx].materials || globalCourses[idx].materials.length === 0) {
        globalCourses[idx].materials = data.materials;
      }
      localStorage.setItem("globalCourses", JSON.stringify(globalCourses));
    }

    finishRenderingCourse(data);
  } catch (err) {
    console.error("Scraping failed:", err);
    showReferenceGenerationError(referenceUrl, courseId);
  }
}

function showReferenceGenerationLoadingState(referenceUrl) {
  const titleEl = document.getElementById('reading-article-title');
  const bodyEl = document.getElementById('reading-article-body');
  const modulesRoot = document.getElementById('modules-root');

  if (titleEl) titleEl.innerText = "Generating lesson content…";
  if (bodyEl) bodyEl.innerHTML = `<p style="opacity:0.65;">Pulling course content from <strong>${referenceUrl}</strong>. This can take a few seconds…</p>`;
  if (modulesRoot) modulesRoot.innerHTML = `<p style="opacity:0.6; font-size:0.9rem; padding: 8px 4px;">Building your syllabus milestones…</p>`;
}

function showReferenceGenerationError(referenceUrl, courseId) {
  const bodyEl = document.getElementById('reading-article-body');
  const titleEl = document.getElementById('reading-article-title');
  if (titleEl) titleEl.innerText = "Couldn't generate content";
  if (bodyEl) {
    bodyEl.innerHTML = `
      <p style="opacity:0.75;">We weren't able to pull content automatically from <strong>${referenceUrl}</strong>.</p>
      <button onclick="generateCourseFromReference('${courseId}', '${referenceUrl}')" class="btn btn-ghost" style="margin-top:12px;">Retry generation</button>
    `;
  }
}

function renderMilestonesSidebar(tasks, completedTasks) {
  const modulesRoot = document.getElementById('modules-root');
  if (!modulesRoot) return;
  modulesRoot.innerHTML = "";

  tasks.forEach((task, index) => {
    const isChecked = completedTasks.includes(task.id) ? "checked" : "";
    const isCurrent = index === currentLoadedTaskIndex ? "border: 2px solid var(--ink); background: rgba(255,255,255,0.95);" : "border: 1px solid var(--line);";

    const moduleHTML = `
      <label onclick="jumpToSpecificModule(${index})" style="display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.4); padding: 16px 20px; border-radius: var(--radius); cursor: pointer; transition: all 0.2s ease; ${isCurrent}">
        <input type="checkbox" id="check-${task.id}" class="task-checkbox" value="${task.id}" ${isChecked} onchange="evaluateProgressMetricsUpdate(); event.stopPropagation();" style="margin-top: 4px; transform: scale(1.15); accent-color: var(--ink);">
        <span style="font-size: 0.95rem; font-weight: 500; color: var(--ink); line-height: 1.4;">${task.label}</span>
      </label>
    `;
    modulesRoot.insertAdjacentHTML('beforeend', moduleHTML);
  });
}

function loadActiveLessonModulePage() {
  const data = defaultMaterialsDatabase[activeCourseId];
  const activeTask = data.tasks[currentLoadedTaskIndex];
  if (!activeTask) return;

  document.getElementById('reading-scroll-box').scrollTop = 0;
  document.getElementById('reading-article-title').innerText = activeTask.title;
  document.getElementById('reading-article-body').innerHTML = activeTask.body;
  document.getElementById('module-step-counter').innerText = `Module ${currentLoadedTaskIndex + 1} of ${data.tasks.length}`;

  const nextBtn = document.getElementById('next-module-btn');
  if (nextBtn) {
    nextBtn.disabled = true;
    nextBtn.style.cursor = 'not-allowed';
    nextBtn.style.opacity = '0.4';
  }
  const note = document.getElementById('scroll-instruction-note');
  if (note) note.style.opacity = '1';
}

function jumpToSpecificModule(targetIndex) {
  currentLoadedTaskIndex = targetIndex;
  const data = defaultMaterialsDatabase[activeCourseId];
  const completedTasks = JSON.parse(localStorage.getItem(`checklist_${activeStudentId}_${activeCourseId}`)) || [];
  
  renderMilestonesSidebar(data.tasks, completedTasks);
  loadActiveLessonModulePage();
}

function initializeScrollObserver() {
  const scrollContainer = document.getElementById('reading-scroll-box');
  const bottomMarker = document.getElementById('reading-bottom-marker');
  if (!scrollContainer || !bottomMarker) return;

  scrollTrackerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const nextBtn = document.getElementById('next-module-btn');
        if (nextBtn) {
          nextBtn.disabled = false;
          nextBtn.style.cursor = 'pointer';
          nextBtn.style.opacity = '1';
        }
        const note = document.getElementById('scroll-instruction-note');
        if (note) note.style.opacity = '0';
      }
    });
  }, { root: scrollContainer, threshold: 1.0 });

  scrollTrackerObserver.observe(bottomMarker);
}

function navigateToNextLessonModule() {
  const data = defaultMaterialsDatabase[activeCourseId];
  const activeTask = data.tasks[currentLoadedTaskIndex];

  const box = document.getElementById(`check-${activeTask.id}`);
  if (box && !box.checked) {
    box.checked = true;
    evaluateProgressMetricsUpdate();
  }

  if (currentLoadedTaskIndex < data.tasks.length - 1) {
    currentLoadedTaskIndex++;
    loadActiveLessonModulePage();
    const completedTasks = JSON.parse(localStorage.getItem(`checklist_${activeStudentId}_${activeCourseId}`)) || [];
    renderMilestonesSidebar(data.tasks, completedTasks);
  } else {
    alert("🎉 Outstanding! You have finished all the reading modules for this course handbook!");
  }
}

function switchLMSTab(tabKey) {
  document.querySelectorAll('.lms-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.style.borderBottom = '2px solid transparent';
    b.style.opacity = '0.5';
  });

  document.getElementById(`panel-${tabKey}`).style.display = tabKey === 'reading' ? 'flex' : 'block';
  const targetTab = document.getElementById(`tab-${tabKey}`);
  if (targetTab) {
    targetTab.style.borderBottom = '2px solid var(--ink)';
    targetTab.style.opacity = '1';
  }
}

function evaluateProgressMetricsUpdate() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  let completedTaskIds = [];

  checkboxes.forEach(box => {
    if (box.checked) completedTaskIds.push(box.value);
  });

  localStorage.setItem(`checklist_${activeStudentId}_${activeCourseId}`, JSON.stringify(completedTaskIds));

  const totalCount = checkboxes.length;
  const checkedCount = completedTaskIds.length;
  const progressPercent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

  let allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};
  if (!allProgressStats[activeStudentId]) allProgressStats[activeStudentId] = {};
  allProgressStats[activeStudentId][activeCourseId] = progressPercent;
  localStorage.setItem("studentProgressStats", JSON.stringify(allProgressStats));

  updateVisualProgressIndicators(checkedCount, totalCount);
}

function updateVisualProgressIndicators(checked, total) {
  const percent = total > 0 ? Math.round((checked / total) * 100) : 0;
  const label = document.getElementById('progress-percentage-label');
  if (label) label.innerText = `${percent}% Complete`;
  const fillBar = document.getElementById('progress-bar-fill');
  if (fillBar) fillBar.style.width = `${percent}%`;
}

// Wire execution sequence directly into global thread interceptor lists
document.addEventListener('DOMContentLoaded', initializeClassroomHub);

// ============================================================================
// 7. ACADEMIC CATALOG & MUTABLE ENROLLMENT REGISTRY
// ============================================================================

// Global session state mirror parameters for catalog context tracking
let sessionState = {
  isStudentLoggedIn: false,
  isAdminVerified: false
};

/**
 * Bootstraps the catalog grid matrices, reads dynamic login contexts,
 * and sets up local badge states.
 */
function initializeCourseCatalogEngine() {
  // Guard check: Run logic only if course card grids or admin bars exist on page
  if (!document.querySelector('.course-grid') && !document.getElementById('admin-bar')) return;

  // 1. Setup default catalog records inside storage layer if empty
  const defaultCourses = [
    {
      id: "CS-101",
      meta: "Module 01 • Advanced Automation",
      title: "Python and Java Architecture Systems",
      desc: "A deep dive study focused on systemic structural testing, enterprise architectural design implementation, and optimization patterns.",
      duration: "8 Weeks",
      track: "Advanced"
    },
    {
      id: "CS-204",
      meta: "Module 02 • Artificial Intelligence",
      title: "Computer Vision Systems",
      desc: "Real-time object mapping arrays, spatial processing architecture, and pixel structural identification methods inside 30-second cycles.",
      duration: "10 Weeks",
      track: "Specialized"
    },
    {
      id: "CS-309",
      meta: "Module 03 • Robotics & Hardware",
      title: "Autonomous Line Follower Design",
      desc: "Hardware integration covering ultrasonic structural sensor calculation arrays, operational driver modules, and autonomous motion control.",
      duration: "6 Weeks",
      track: "Labs"
    }
  ];
  
  if (!localStorage.getItem("globalCourses")) {
    localStorage.setItem("globalCourses", JSON.stringify(defaultCourses));
  }

  // 2. Hydrate session mirror metrics from local state
  sessionState.isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";
  sessionState.isAdminVerified = localStorage.getItem("isAdminVerified") === "true";

  // 3. Render layout matrices and evaluate interface headers
  evaluateSessionInterfaceUpdate();
  renderCoursesFromStorage();

  // 4. Inject notification ledger listeners asynchronously
  injectNotificationLibraryRef();
}

/**
 * Re-allocates text anchors and visual links based on active user states.
 */
function evaluateSessionInterfaceUpdate() {
  const adminStrip = document.getElementById('admin-bar');
  const authBtn = document.getElementById('nav-auth-btn');
  const logoutBtn = document.getElementById('nav-logout-btn');
  if (!authBtn) return;

  if (sessionState.isAdminVerified) {
    if (adminStrip) adminStrip.style.display = 'flex';
    authBtn.innerText = "Admin Dashboard";
    authBtn.href = "admin-dashboard.html";
    authBtn.className = "btn btn-burgundy";
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  } else if (sessionState.isStudentLoggedIn) {
    if (adminStrip) adminStrip.style.display = 'none';
    authBtn.innerText = "My Dashboard";
    authBtn.href = "student-dashboard.html";
    authBtn.className = "btn btn-primary";
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  } else {
    if (adminStrip) adminStrip.style.display = 'none';
    authBtn.innerText = "Portal Login";
    authBtn.href = "role.html";
    authBtn.className = "btn btn-ghost";
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}

/**
 * Directs window navigation routes into the admin editor ecosystem.
 */
function handleAdminEdit(courseId) {
  window.location.href = `edit-course.html?id=${courseId}`;
}

/**
 * Scrubs all valid login states and handles clean routing back home.
 */
function handleGlobalSessionLogout() {
  localStorage.removeItem("isStudentLoggedIn");
  localStorage.removeItem("studentName");
  localStorage.removeItem("studentAcademicId");
  localStorage.removeItem("isAdminVerified");
  
  sessionState.isStudentLoggedIn = false;
  sessionState.isAdminVerified = false;
  
  alert("Session closed safely.");
  window.location.href = "index.html";
}

/**
 * Builds course blocks using cached memory data maps.
 */
function renderCoursesFromStorage() {
  const grid = document.querySelector('.course-grid');
  if (!grid) return;

  const courses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  grid.innerHTML = ""; 

  courses.forEach(course => {
    const cardHTML = `
      <div class="course-card" data-course-id="${course.id}">
        <div>
          <div class="course-meta">${course.meta}</div>
          <h3>${course.title}</h3>
          <p class="course-desc">${course.desc}</p>
          <div class="course-details-row">
            <span><strong>Duration:</strong> ${course.duration}</span>
            <span><strong>Track:</strong> ${course.track}</span>
          </div>
        </div>
        <div class="course-actions">
          <button class="btn btn-primary" onclick="handleEnrollment('${course.id}', '${course.title.replace(/'/g, "\\'")}')">Enroll</button>
          <button class="btn btn-ghost" onclick="handleAdminEdit('${course.id}')">Edit Schema</button>
        </div>
      </div>
    `;
    grid.insertAdjacentHTML('beforeend', cardHTML);
  });
}

/**
 * Pulls up profile validations before locking enrollment links.
 */
function handleEnrollment(courseId, courseTitle) {
  const isStudentRegistered = localStorage.getItem("isStudentLoggedIn") === "true";

  if (!isStudentRegistered) {
    alert("Authentication context absent. Redirecting to student login system.");
    window.location.href = "student-login.html";
    return;
  }

  const currentStudentId = localStorage.getItem("studentAcademicId") || "E24AI003";
  const savedName = localStorage.getItem("studentName") || "Anika";

  const modalMeta = document.getElementById('enroll-modal-meta');
  const modalTitle = document.getElementById('enroll-modal-title');
  const courseIdInput = document.getElementById('enroll-course-id');
  const fullnameInput = document.getElementById('student-fullname');
  const academicIdInput = document.getElementById('student-academic-id');

  if (courseIdInput) courseIdInput.value = courseId;
  if (modalMeta) modalMeta.innerText = `Target Allocation: ${courseId}`;
  if (modalTitle) modalTitle.innerText = courseTitle;
  if (fullnameInput) fullnameInput.value = savedName;
  if (academicIdInput) academicIdInput.value = currentStudentId;

  const modal = document.getElementById('enrollment-modal');
  if (modal) modal.classList.add('active');
}

/**
 * Commits the specific student allocation maps safely inside the local ledger.
 */
function executeEnrollment(event) {
  event.preventDefault();
  
  const courseId = document.getElementById('enroll-course-id')?.value;
  const studentId = document.getElementById('student-academic-id')?.value.trim(); 
  if (!courseId || !studentId) return;
  
  let records = JSON.parse(localStorage.getItem(`enrolledTracks_${studentId}`)) || [];
  
  if (!records.some(r => r.courseId === courseId)) {
    records.push({ courseId: courseId, student: studentId });
    localStorage.setItem(`enrolledTracks_${studentId}`, JSON.stringify(records));
  }

  localStorage.setItem("studentAcademicId", studentId);

  const modal = document.getElementById('enrollment-modal');
  if (modal) modal.classList.remove('active');
  
  window.location.href = "enrollment-success.html";
}

/**
 * Validates baseline overrides inside inline catalog edit pathways.
 */
function verifyAdminClearance(event) {
  event.preventDefault();
  const email = document.getElementById('admin-email')?.value;
  const pass = document.getElementById('admin-pass')?.value;
  const targetCourse = document.getElementById('edit-target-course-id')?.value;

  if (email === "admin@institute.edu" && pass === "password") {
    localStorage.setItem("isAdminVerified", "true");
    sessionState.isAdminVerified = true;
    
    const modal = document.getElementById('admin-gate-modal');
    if (modal) modal.classList.remove('active');
    
    evaluateSessionInterfaceUpdate();
    window.location.href = `edit-course.html?id=${targetCourse}`;
  } else {
    alert("Invalid Security Password. Elevated access structure rejected.");
  }
}

/**
 * Loads notification helper assets asynchronously.
 */
function injectNotificationLibraryRef() {
  if (!document.getElementById('header-notif-badge')) return;
  
  const libPath = window.location.pathname.includes('/frontend/') ? 'notifications-lib.js' : 'frontend/notifications-lib.js';
  const scriptEl = document.createElement('script');
  scriptEl.src = libPath;
  scriptEl.onload = function() {
    updateHeaderNotificationBadge();
  };
  document.head.appendChild(scriptEl);
}

/**
 * Syncs workspace notification indicators with core memory registers.
 */
function updateHeaderNotificationBadge() {
  const badgeElement = document.getElementById('header-notif-badge');
  if (!badgeElement) return;

  if (typeof SkillTrackNotify !== 'undefined' && typeof SkillTrackNotify.unreadCount === 'function') {
    const unreadCount = SkillTrackNotify.unreadCount();
    if (unreadCount > 0) { 
      badgeElement.innerText = unreadCount;
      badgeElement.classList.add('active'); 
    } else {
      badgeElement.classList.remove('active');
    }
  }
}

// Attach notification updates to visual runtime changes
window.addEventListener("skilltrack-notification", updateHeaderNotificationBadge);
document.addEventListener('DOMContentLoaded', initializeCourseCatalogEngine);

// ============================================================================
// 8. BLUEPRINT SCHEMA EDITOR & REGISTRY MAINTENANCE CORE
// ============================================================================

// Local tracking properties for mutable modification routes
let activeEditCourseId = "";
let currentEditRegistry = [];

/**
 * Validates active admin authorization contexts and hydates form nodes.
 */
function initializeBlueprintEditorEngine() {
  const editForm = document.getElementById('edit-course-form'); //
  if (!editForm) return; // Guard clause: safely exit if form isn't present

  // Strict structural authorization checks
  if (localStorage.getItem("isAdminVerified") !== "true") { //
    alert("Access Denied: Please log in first."); //
    window.location.href = "admin-login.html"; //
    return;
  }

  // Load cached arrays directly into tracking arrays
  currentEditRegistry = JSON.parse(localStorage.getItem("globalCourses")) || []; //
  
  const urlParams = new URLSearchParams(window.location.search); //
  activeEditCourseId = urlParams.get('id'); //
  
  const record = currentEditRegistry.find(c => c.id === activeEditCourseId); //
  
  if (record) { //
    const eyebrow = document.getElementById('edit-eyebrow'); //
    const idField = document.getElementById('edit-course-id'); //
    const metaField = document.getElementById('edit-course-meta'); //
    const titleField = document.getElementById('edit-course-title'); //
    const descField = document.getElementById('edit-course-desc'); //
    const durationField = document.getElementById('edit-course-duration'); //
    const trackField = document.getElementById('edit-course-track'); //

    if (eyebrow) eyebrow.innerText = `Target Blueprint Allocation: ${record.id}`; //
    if (idField) idField.value = record.id; //
    if (metaField) metaField.value = record.meta; //
    if (titleField) titleField.value = record.title; //
    if (descField) descField.value = record.desc; //
    if (durationField) durationField.value = record.duration; //
    if (trackField) trackField.value = record.track; //
  } else {
    alert("Target module identification out of scope index."); //
    window.location.href = "courses.html"; //
  }
}

/**
 * Processes modified input matrices and commits adjustments back to storage.
 */
function updateCourseData(event) {
  event.preventDefault(); //
  
  const courseIndex = currentEditRegistry.findIndex(c => c.id === activeEditCourseId); //
  
  if (courseIndex !== -1) { //
    // Preserving tasks and materials arrays if they exist in the original blueprint
    const originalRecord = currentEditRegistry[courseIndex];

    currentEditRegistry[courseIndex] = {
      id: activeEditCourseId, //
      meta: document.getElementById('edit-course-meta')?.value || "", //
      title: document.getElementById('edit-course-title')?.value || "", //
      desc: document.getElementById('edit-course-desc')?.value || "", //
      duration: document.getElementById('edit-course-duration')?.value || "", //
      track: document.getElementById('edit-course-track')?.value || "", //
      tasks: originalRecord.tasks || [],
      materials: originalRecord.materials || []
    };
    
    localStorage.setItem("globalCourses", JSON.stringify(currentEditRegistry)); //
    alert("System Success: Core blueprint structural alignment modified successfully."); //
    window.location.href = "courses.html"; //
  }
}

/**
 * Removes the targeted course architecture record entry completely from storage.
 */
function deleteCourseSchema() {
  if (confirm(`Warning: You are initiating a full schema deletion process for code: ${activeEditCourseId}. Continue?`)) { //
    currentEditRegistry = currentEditRegistry.filter(c => c.id !== activeEditCourseId); //
    localStorage.setItem("globalCourses", JSON.stringify(currentEditRegistry)); //
    
    alert(`Registry Update: Record blueprint schema entry ${activeEditCourseId} deprecated and scrubbed.`); //
    window.location.href = "courses.html"; //
  }
}

// Register initialization hook directly inside runtime listener stacks
document.addEventListener('DOMContentLoaded', initializeBlueprintEditorEngine);

// ============================================================================
// 9. ENROLLMENT CONFIRMATION LIFECYCLE
// ============================================================================

/**
 * Checks for the primary onboarding link to resolve dynamic success routing parameters.
 */
function initializeEnrollmentSuccessEngine() {
  const startBtn = document.getElementById('start-learning-btn'); //
  if (!startBtn) return; // Guard clause: safely skip if not on the registration confirmation view

  // Look up what course the student just registered for in memory
  const studentId = localStorage.getItem("studentAcademicId") || "default";
  const records = JSON.parse(localStorage.getItem(`enrolledTracks_${studentId}`)) || []; // Checked via the dynamic multi-student allocation ledger pattern

  if (records.length > 0) { //
    const latestCourseId = records[records.length - 1].courseId; //
    // Map the button path to pass the specific course code forward
    startBtn.href = `course-content.html?id=${latestCourseId}`; //
  } else {
    // Fallback target if history is clear
    startBtn.href = 'courses.html'; //
  }
}

// Hook initialization framework routine directly into runtime listener pipelines
document.addEventListener('DOMContentLoaded', initializeEnrollmentSuccessEngine);

// ============================================================================
// 10. STUDENT LEDGER ACCOUNT WORKSPACE ENGINE
// ============================================================================

/**
 * Validates active profile context identities and hydates the workspace
 * modules container grid dynamically.
 */
function initializeStudentLedgerWorkspace() {
  const container = document.getElementById('workspace-modules-container'); //
  if (!container) return; // Guard clause: safely skip if not on the my-courses layout view panel

  const currentStudentId = localStorage.getItem("studentAcademicId") || "default"; //
  const rawEnrolledTracks = JSON.parse(localStorage.getItem(`enrolledTracks_${currentStudentId}`)) || []; //
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {}; //
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || []; //
  
  const progressStats = allProgressStats[currentStudentId] || {}; //

  // Filter out any courses that were deleted by an administrator
  const enrolledTracks = rawEnrolledTracks.filter(track => {
    return globalCourses.some(c => c.id === track.courseId); //
  });

  // Update visual text metric tracking badge indicators
  const counterPill = document.getElementById('workspace-counter-pill'); //
  if (counterPill) counterPill.innerText = `${enrolledTracks.length} Active Modules`; //

  container.innerHTML = ""; //

  if (enrolledTracks.length === 0) { //
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; border: 1px dashed var(--line); background: rgba(255,255,255,0.2);">
        <p style="opacity: 0.6; margin: 0 0 16px 0;">You are not currently registered in any active learning course handbooks.</p>
        <a href="courses.html" class="btn btn-primary" style="font-size: 0.8rem;">Browse Course Catalog</a>
      </div>
    `; //
    return; //
  }

  enrolledTracks.forEach(track => { //
    const courseInfo = globalCourses.find(c => c.id === track.courseId) || { 
      title: track.courseId, 
      track: "General",
      desc: "Course manual syllabus description missing."
    }; //
    
    const currentPercent = progressStats[track.courseId] || 0; //

    // Form dynamic status text actions based on active metrics
    let buttonText = "Start Module"; //
    if (currentPercent > 0 && currentPercent < 100) buttonText = "Resume Study"; //

    let actionButtonHTML = `
      <a href="course-content.html?id=${track.courseId}" class="btn btn-primary" style="width: 100%;">
        ${buttonText} →
      </a>
    `; //

    // Dynamic Reward Swap: Provide direct paths to download credentials if 100% complete
    if (currentPercent === 100) { //
      actionButtonHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="course-content.html?id=${track.courseId}" class="btn btn-ghost" style="width: 100%; border-color: var(--line);">
            Review Handbook
          </a>
          <a href="certificate.html?id=${track.courseId}" class="btn" style="width: 100%; background: #D4AF37; color: #10192B; border: none; font-weight: 700;">
            🎓 Claim Certificate
          </a>
        </div>
      `; //
    }

    const courseCardHTML = `
      <div class="course-card">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span style="font-size: 0.68rem; font-weight: 700; color: var(--gold); text-transform: uppercase; letter-spacing: 0.08em;">${courseInfo.track}</span>
            <strong style="font-size: 0.85rem; opacity: 0.6; font-family: var(--body);">${track.courseId}</strong>
          </div>
          <h3 style="font-family: var(--display); font-size: 1.35rem; margin: 0 0 10px 0; color: var(--ink); font-weight: 500; line-height: 1.3;">${courseInfo.title}</h3>
          <p style="font-size: 0.88rem; opacity: 0.7; margin: 0; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${courseInfo.desc}</p>
        </div>
        
        <div style="margin-top: 24px;">
          <div class="progress-track">
            <div class="progress-fill" style="width: ${currentPercent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <span style="font-size: 0.78rem; font-weight: 600; opacity: 0.5;">Syllabus Status</span>
            <span style="font-size: 0.78rem; font-weight: 700; color: var(--ink);">${currentPercent}% Done</span>
          </div>
          
          ${actionButtonHTML}
          
        </div>
      </div>
    `; //
    container.insertAdjacentHTML('beforeend', courseCardHTML); //
  });
}

// Attach execution sequence hook inside global application runtime stacks
document.addEventListener('DOMContentLoaded', initializeStudentLedgerWorkspace);

// ============================================================================
// 11. DYNAMIC SYSTEM NOTIFICATIONS UI ROUTINES
// ============================================================================

// Tracking indicators for local filtering states
let activeNotificationFilter = "all";

/**
 * Initializes filter buttons, syncs layouts, and binds real-time system change listeners.
 */
function initializeNotificationWorkspaceEngine() {
  const notifList = document.getElementById('notif-list'); //
  if (!notifList) return; // Guard clause: safely exit if not on notifications view interface

  // Run dynamic portal display configurations
  if (typeof sessionState !== 'undefined') {
    sessionState.isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";
    sessionState.isAdminVerified = localStorage.getItem("isAdminVerified") === "true";
    evaluateSessionInterfaceUpdate();
  }

  // Initial map presentation renderings
  renderNotificationFilterTabs();
  renderSystemNotificationsList();
  if (typeof updateHeaderNotificationBadge === 'function') {
    updateHeaderNotificationBadge();
  }

  // Intercept runtime custom events dynamically to sync layouts instantly
  window.addEventListener("skilltrack-notification", () => {
    renderNotificationFilterTabs();
    renderSystemNotificationsList();
    if (typeof updateHeaderNotificationBadge === 'function') {
      updateHeaderNotificationBadge();
    }
  });
}

/**
 * Generates clear filter button configurations dynamically based on library content arrays.
 */
function renderNotificationFilterTabs() {
  if (typeof SkillTrackNotify === 'undefined') return; //
  const all = SkillTrackNotify.getAll(); //
  const root = document.getElementById('filter-tabs'); //
  if (!root) return;
  root.innerHTML = ""; //

  const FILTERS = [
    { key: "all", label: "All" },
    { key: "new_course", label: "New Course Alerts" },
    { key: "enrollment", label: "Enrollment Confirmation" },
    { key: "assignment_reminder", label: "Assignment Reminders" },
    { key: "certificate", label: "Completion Certificates" }
  ]; //

  FILTERS.forEach(f => {
    const count = f.key === "all" ? all.length : all.filter(n => n.type === f.key).length; //
    const isActive = f.key === activeNotificationFilter;
    root.insertAdjacentHTML('beforeend', `
      <button class="filter-tab ${isActive ? 'active' : ''}" onclick="setNotificationFilter('${f.key}')">
        ${f.label} <span class="count">${count}</span>
      </button>
    `); //
  });
}

/**
 * Updates filter selection rules and triggers a complete list repaint.
 */
function setNotificationFilter(key) {
  activeNotificationFilter = key; //
  renderNotificationFilterTabs(); //
  renderSystemNotificationsList(); //
}

/**
 * Renders targeted notification structures, handling clean time calculations and dynamic text links.
 */
function renderSystemNotificationsList() {
  if (typeof SkillTrackNotify === 'undefined') return; //
  const all = SkillTrackNotify.getAll(); //
  const filtered = activeNotificationFilter === "all" ? all : all.filter(n => n.type === activeNotificationFilter); //
  const listRoot = document.getElementById('notif-list'); //
  if (!listRoot) return;
  listRoot.innerHTML = ""; //

  if (filtered.length === 0) { //
    listRoot.innerHTML = `
      <div class="empty-state">
        <div class="glyph">✉️</div>
        <h3>Nothing here yet</h3>
        <p>Course alerts, enrollment confirmations, assignment reminders, and certificates will show up here as they happen.</p>
      </div>
    `; //
    return; //
  }

  // Inner dynamic timestamp parsing function
  const computeTimeAgo = (timestamp) => {
    const diffMs = Date.now() - timestamp; //
    const mins = Math.floor(diffMs / 60000); //
    if (mins < 1) return "just now"; //
    if (mins < 60) return `${mins}m ago`; //
    const hours = Math.floor(mins / 60); //
    if (hours < 24) return `${hours}h ago`; //
    const days = Math.floor(hours / 24); //
    if (days < 7) return `${days}d ago`; //
    return new Date(timestamp).toLocaleDateString(); //
  };

  filtered.forEach(n => {
    const meta = SkillTrackNotify.TYPE_META[n.type] || { label: n.title, icon: "🔔" }; //
    listRoot.insertAdjacentHTML('beforeend', `
      <div class="notif-card ${n.read ? '' : 'unread'}" data-id="${n.id}">
        <div class="notif-icon">${meta.icon}</div>
        <div class="notif-body">
          <div class="notif-top-row">
            <span class="notif-type">${meta.label}</span>
            <span class="notif-time">${computeTimeAgo(n.timestamp)}</span>
          </div>
          <h3 class="notif-message">${n.email.subject}</h3>
          <div class="notif-actions">
            <button class="notif-link" onclick="openNotificationEmailPreview('${n.id}')">View email preview</button>
            ${!n.read ? `<button class="btn-quiet" onclick="markSingleNotificationRead('${n.id}')">Mark as read</button>` : ''}
            ${n.type === 'certificate' && n.courseId ? `<a class="notif-link" href="certificate.html?id=${n.courseId}">View certificate</a>` : ''}
            ${n.type === 'assignment_reminder' && n.courseId ? `<a class="notif-link" href="course-content.html?id=${n.courseId}">Resume course</a>` : ''}
          </div>
        </div>
      </div>
    `); //
  });
}

/**
 * Dispatches individual entry read markings directly to storage.
 */
function markSingleNotificationRead(id) {
  if (typeof SkillTrackNotify === 'undefined') return;
  SkillTrackNotify.markRead(id); //
  renderNotificationFilterTabs(); //
  renderSystemNotificationsList(); //
  if (typeof updateHeaderNotificationBadge === 'function') updateHeaderNotificationBadge(); //
}

/**
 * Resets all notification flags to true.
 */
function markAllNotificationsAsRead() {
  if (typeof SkillTrackNotify === 'undefined') return;
  SkillTrackNotify.markAllRead(); //
  renderNotificationFilterTabs(); //
  renderSystemNotificationsList(); //
  if (typeof updateHeaderNotificationBadge === 'function') updateHeaderNotificationBadge(); //
}

/**
 * Pulls open target structural details inside the local message sandbox modal.
 */
function openNotificationEmailPreview(id) {
  if (typeof SkillTrackNotify === 'undefined') return;
  const notif = SkillTrackNotify.getAll().find(n => n.id === id); //
  if (!notif) return; //
  if (!notif.read) SkillTrackNotify.markRead(id); //

  const to = document.getElementById('email-to');
  const subject = document.getElementById('email-subject');
  const body = document.getElementById('email-body');
  const overlay = document.getElementById('email-modal-overlay');

  if (to) to.innerText = notif.email.to; //
  if (subject) subject.innerText = notif.email.subject; //
  if (body) body.innerHTML = notif.email.body; //
  if (overlay) overlay.classList.add('open'); //

  renderNotificationFilterTabs(); //
  renderSystemNotificationsList(); //
  if (typeof updateHeaderNotificationBadge === 'function') updateHeaderNotificationBadge(); //
}

/**
 * Closes the modal.
 */
function closeNotificationEmailPreview() {
  const overlay = document.getElementById('email-modal-overlay');
  if (overlay) overlay.classList.remove('open'); //
}

/**
 * Mock pipeline generation engine.
 */
function simulateNotificationIncoming(type) {
  if (typeof SkillTrackNotify === 'undefined') return;
  const sampleCourse = { courseId: "CS-403", courseTitle: "Agentic AI Systems & Autonomous Frameworks" }; //
  switch (type) {
    case "new_course":
      SkillTrackNotify.push("new_course", { courseId: "CS-501", courseTitle: "Applied Machine Learning" }); //
      break;
    case "enrollment":
      SkillTrackNotify.push("enrollment", sampleCourse); //
      break;
    case "assignment_reminder":
      SkillTrackNotify.push("assignment_reminder", sampleCourse); //
      break;
    case "certificate":
      SkillTrackNotify.push("certificate", sampleCourse); //
      break;
  }
}

// Bind hook safely inside standard application runtime pipeline
document.addEventListener('DOMContentLoaded', initializeNotificationWorkspaceEngine);

// ============================================================================
// 12. STUDENT SESSION AUTHENTICATION & PORTAL DASHBOARD CONTROLLER
// ============================================================================

/**
 * Initializes the student dashboard screen layout and syncs institutional metrics card vectors.
 */
function initializeStudentDashboardEngine() {
  const welcomeHeading = document.getElementById('welcome-heading'); //
  if (!welcomeHeading) return; // Guard clause: safely skip if not on the main student workspace profile view

  // 1. Enforce validation lock layers on restricted workspace nodes
  if (localStorage.getItem("isStudentLoggedIn") !== "true") { //
    alert("Access Denied: Please log in using student credentials."); //
    window.location.href = "student-login.html"; //
    return;
  }

  // 2. Personalize the portal welcome text matrix dynamically
  const activeStudentName = localStorage.getItem("studentName") || "Student"; //
  welcomeHeading.innerText = `Welcome Back, ${activeStudentName}`; //
  
  // 3. Hydrate all terminal metrics cards seamlessly
  hydrateStudentDashboardMetrics();
}

/**
 * Computes runtime study statistics using local storage data caches.
 */
function hydrateStudentDashboardMetrics() {
  const currentStudentId = localStorage.getItem("studentAcademicId") || "default"; //
  const rawEnrolledTracks = JSON.parse(localStorage.getItem(`enrolledTracks_${currentStudentId}`)) || []; //
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {}; //
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || []; //
  
  const progressStats = allProgressStats[currentStudentId] || {}; //

  // Filter out any ghost entries whose underlying schema has been cleared by admins
  const enrolledTracks = rawEnrolledTracks.filter(track => {
    return globalCourses.some(c => c.id === track.courseId); //
  });

  let totalEnrolled = enrolledTracks.length; //
  let completedCount = 0; //
  let ongoingCount = 0; //
  let aggregateSum = 0; //

  enrolledTracks.forEach(track => {
    const percent = progressStats[track.courseId] || 0; //
    aggregateSum += percent; //

    if (percent === 100) {
      completedCount++; //
    } else {
      ongoingCount++; //
    }
  });

  const averageProgress = totalEnrolled > 0 ? Math.round(aggregateSum / totalEnrolled) : 0; //

  // Update analytics text overview nodes securely
  const cards = document.querySelectorAll('.metric-value'); //
  if (cards && cards.length >= 4) {
    cards[0].innerText = totalEnrolled;     //
    cards[1].innerText = completedCount;    //
    cards[2].innerText = ongoingCount;      //
    cards[3].innerText = `${averageProgress}%`; //
  }
}

/**
 * Scrubs active student tokens safely and returns to root directory pages.
 */
function logoutStudent() {
  localStorage.removeItem("isStudentLoggedIn"); //
  localStorage.removeItem("studentName"); //
  localStorage.removeItem("studentAcademicId");
  window.location.href = "index.html"; //
}

/**
 * Attaches submit listeners if the student credential verification screen is loaded.
 */
function initializeStudentLoginEngine() {
  const loginForm = document.getElementById('student-login-form'); //
  if (!loginForm) return; // Guard clause: skip if login forms are absent on the page layout

  // Mock Identity Directory Array Database
  const mockStudentDatabase = [
    { email: "student@institute.edu", password: "password", name: "Anika", academicId: "E24AI003" },
    { email: "sister@institute.edu", password: "password123", name: "Janhavi", academicId: "E24AI015" }
  ]; //

  loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); //

    const inputEmail = document.getElementById('log-email')?.value.trim(); //
    const inputPassword = document.getElementById('log-password')?.value; //
    const notice = document.getElementById('login-notice'); //
    if (!inputEmail || !inputPassword || !notice) return;

    // Scan the record arrays for parameter alignment validation checks
    const matchedStudent = mockStudentDatabase.find(
      s => s.email === inputEmail && s.password === inputPassword
    ); //

    if (matchedStudent) {
      // Clear out lingering administration cookies to prevent data leakage bugs
      localStorage.removeItem("isAdminVerified"); //

      // Commit parameters safely into runtime storage structures
      localStorage.setItem("isStudentLoggedIn", "true"); //
      localStorage.setItem("studentName", matchedStudent.name); //
      localStorage.setItem("studentAcademicId", matchedStudent.academicId); //

      notice.className = "notice show success"; //
      notice.innerText = `Login successful — Welcome, ${matchedStudent.name}. Redirecting...`; //

      setTimeout(function() {
        window.location.href = "student-dashboard.html"; //
      }, 1000); //
    } else {
      notice.className = "notice show error"; //
      notice.innerText = "Access Denied: Invalid student profile credentials or record match absent."; //
    }
  });
}

// Attach listeners securely inside structural execution threads
document.addEventListener('DOMContentLoaded', initializeStudentDashboardEngine);
document.addEventListener('DOMContentLoaded', initializeStudentLoginEngine);

