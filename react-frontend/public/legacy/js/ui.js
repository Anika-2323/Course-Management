// js/ui.js

export function evaluateSessionInterfaceUpdate() {
  const adminStrip = document.getElementById('admin-bar');
  const authBtn = document.getElementById('nav-auth-btn') || document.querySelector('a[href="role.html"]');
  const logoutBtn = document.getElementById('nav-logout-btn');

  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";
  const isAdminVerified = localStorage.getItem("isAdminVerified") === "true";

  if (!authBtn) return;

  if (isAdminVerified) {
    if (adminStrip) adminStrip.style.display = 'flex';
    authBtn.innerText = "Admin Dashboard";
    authBtn.href = "admin-dashboard.html";
    authBtn.className = "btn btn-burgundy";
    if (logoutBtn) logoutBtn.style.display = 'inline-flex';
  } else if (isStudentLoggedIn) {
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

export function initializeStudentLedgerWorkspace() {
  const container = document.getElementById('workspace-modules-container');
  if (!container) return;

  const currentStudentId = localStorage.getItem("studentAcademicId") || "default";
  const rawEnrolledTracks = JSON.parse(localStorage.getItem(`enrolledTracks_${currentStudentId}`)) || [];
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [
    { id: "CS-101", title: "Python and Java Architecture Systems", track: "Advanced", desc: "A deep dive study focused on systemic structural testing..." },
    { id: "CS-204", title: "Computer Vision Systems", track: "Specialized", desc: "Real-time object mapping arrays..." },
    { id: "CS-309", title: "Autonomous Line Follower Design", track: "Labs", desc: "Hardware integration covering ultrasonic..." }
  ];
  
  const progressStats = allProgressStats[currentStudentId] || {};

  const enrolledTracks = rawEnrolledTracks.filter(track => {
    return globalCourses.some(c => c.id === track.courseId);
  });

  const counterPill = document.getElementById('workspace-counter-pill');
  if (counterPill) counterPill.innerText = `${enrolledTracks.length} Active Modules`;

  container.innerHTML = "";

  if (enrolledTracks.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; border: 1px dashed var(--line); background: rgba(255,255,255,0.2);">
        <p style="opacity: 0.6; margin: 0 0 16px 0;">You are not currently registered in any active learning course handbooks.</p>
        <a href="courses.html" class="btn btn-primary" style="font-size: 0.8rem;">Browse Course Catalog</a>
      </div>
    `;
    return;
  }

  enrolledTracks.forEach(track => {
    const courseInfo = globalCourses.find(c => c.id === track.courseId) || { 
      title: track.courseId, 
      track: "General",
      desc: "Course manual syllabus description missing."
    };
    
    const currentPercent = progressStats[track.courseId] || 0;

    let buttonText = "Start Module";
    if (currentPercent > 0 && currentPercent < 100) buttonText = "Resume Study";

    let actionButtonHTML = `
      <a href="course-content.html?id=${track.courseId}" class="btn btn-primary" style="width: 100%;">
        ${buttonText} →
      </a>
    `;

    if (currentPercent === 100) {
      actionButtonHTML = `
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="course-content.html?id=${track.courseId}" class="btn btn-ghost" style="width: 100%; border-color: var(--line);">
            Review Handbook
          </a>
          <a href="certificate.html?id=${track.courseId}" class="btn" style="width: 100%; background: #D4AF37; color: #10192B; border: none; font-weight: 700;">
            🎓 Claim Certificate
          </a>
        </div>
      `;
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
    `;
    container.insertAdjacentHTML('beforeend', courseCardHTML);
  });
}

// js/ui.js

export function hydrateAdminMetrics() {
  // 1. Ensure globalCourses exists in storage
  let globalCourses = JSON.parse(localStorage.getItem("globalCourses"));
  if (!globalCourses || globalCourses.length === 0) {
    globalCourses = [
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
    localStorage.setItem("globalCourses", JSON.stringify(globalCourses));
  }

  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};

  let totalActiveEnrollments = 0;
  let completedCoursesCount = 0;
  let uniqueStudents = new Set();

  let courseEnrollmentCounts = {};
  globalCourses.forEach(course => {
    courseEnrollmentCounts[course.id] = 0;
  });

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("enrolledTracks_")) {
      const studentId = key.replace("enrolledTracks_", "");
      uniqueStudents.add(studentId);

      const studentEnrollments = JSON.parse(localStorage.getItem(key)) || [];
      totalActiveEnrollments += studentEnrollments.length;

      studentEnrollments.forEach(track => {
        if (courseEnrollmentCounts.hasOwnProperty(track.courseId)) {
          courseEnrollmentCounts[track.courseId]++;
        }
      });

      const studentProgress = allProgressStats[studentId] || {};
      for (const courseId in studentProgress) {
        if (studentProgress[courseId] === 100) {
          completedCoursesCount++;
        }
      }
    }
  }

  // Update top metrics cards
  const cards = document.querySelectorAll('.metric-value');
  if (cards.length >= 4) {
    cards[0].innerText = uniqueStudents.size;
    cards[1].innerText = globalCourses.length;
    cards[2].innerText = totalActiveEnrollments;
    cards[3].innerText = completedCoursesCount;
  }

  // Populate progress bars container
  const barsRoot = document.getElementById('course-enrollment-bars-root');
  if (!barsRoot) return;
  
  barsRoot.innerHTML = "";

  const maxCapacity = 10;

  globalCourses.forEach(course => {
    const count = courseEnrollmentCounts[course.id] || 0;
    const calculatedWidth = Math.min((count / maxCapacity) * 100, 100);

    const rowHTML = `
      <div style="border-bottom: 1px solid var(--line); padding-bottom: 20px;">
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
    `;
    barsRoot.insertAdjacentHTML('beforeend', rowHTML);
  });
}

export function hydrateStudentDashboardMetrics() {
  const currentStudentId = localStorage.getItem("studentAcademicId") || "default";
  const rawEnrolledTracks = JSON.parse(localStorage.getItem(`enrolledTracks_${currentStudentId}`)) || [];
  const allProgressStats = JSON.parse(localStorage.getItem("studentProgressStats")) || {};
  
  // Ensure default global courses exist inside localStorage
  let globalCourses = JSON.parse(localStorage.getItem("globalCourses"));
  if (!globalCourses || globalCourses.length === 0) {
    globalCourses = [
      { id: "CS-101", title: "Python and Java Architecture Systems", track: "Advanced" },
      { id: "CS-204", title: "Computer Vision Systems", track: "Specialized" },
      { id: "CS-309", title: "Autonomous Line Follower Design", track: "Labs" }
    ];
    localStorage.setItem("globalCourses", JSON.stringify(globalCourses));
  }

  const progressStats = allProgressStats[currentStudentId] || {};

  // Include tracks that exist in globalCourses or default tracks
  const enrolledTracks = rawEnrolledTracks.filter(track => {
    return globalCourses.some(c => c.id === track.courseId) || ["CS-101", "CS-204", "CS-309"].includes(track.courseId);
  });

  let totalEnrolled = enrolledTracks.length;
  let completedCount = 0;
  let ongoingCount = 0;
  let aggregateSum = 0;

  enrolledTracks.forEach(track => {
    const percent = progressStats[track.courseId] || 0;
    aggregateSum += percent;

    if (percent === 100) {
      completedCount++;
    } else {
      ongoingCount++;
    }
  });

  const averageProgress = totalEnrolled > 0 ? Math.round(aggregateSum / totalEnrolled) : 0;

  // Update card elements on student-dashboard.html
  const cards = document.querySelectorAll('.metric-value');
  if (cards && cards.length >= 4) {
    cards[0].innerText = totalEnrolled;     
    cards[1].innerText = completedCount;    
    cards[2].innerText = ongoingCount;      
    cards[3].innerText = `${averageProgress}%`;
  }
}
// js/ui.js

// js/ui.js

export function renderCoursesFromStorage() {
  const grid = document.querySelector('.course-grid');
  if (!grid) return;

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

  const courses = JSON.parse(localStorage.getItem("globalCourses")) || defaultCourses;
  grid.innerHTML = ""; 

  courses.forEach(course => {
    // Check both 'desc' and 'description' keys so it never evaluates to undefined
    const courseDescription = course.desc || course.description || "No description available for this course.";

    const cardHTML = `
      <div class="course-card" data-course-id="${course.id}">
        <div>
          <div class="course-meta">${course.meta || 'Module • General'}</div>
          <h3>${course.title}</h3>
          <p class="course-desc">${courseDescription}</p>
          <div class="course-details-row">
            <span><strong>Duration:</strong> ${course.duration || '6 Weeks'}</span>
            <span><strong>Track:</strong> ${course.track || 'General'}</span>
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