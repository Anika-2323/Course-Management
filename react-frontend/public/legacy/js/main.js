// js/main.js
import { 
  checkAdminAccess, 
  logoutAdmin, 
  logoutStudent,
  handleGlobalSessionLogout,
  handleStudentLogin, 
  handleAdminLogin,
  handleEnrollment,
  executeEnrollment,
  handleAdminEdit,
  verifyAdminClearance,
  closeModal
} from './auth.js';

import { 
  hydrateAdminMetrics, 
  evaluateSessionInterfaceUpdate,
  initializeStudentLedgerWorkspace,
  hydrateStudentDashboardMetrics,
  renderCoursesFromStorage
} from './ui.js';

import { 
  initializeClassroomHub, 
  initializeBlueprintEditorEngine,
  verifyAndCommitCourse,
  updateCourseData,
  deleteCourseSchema,
  jumpToSpecificModule, 
  navigateToNextLessonModule,
  switchLMSTab,
  evaluateProgressMetricsUpdate 
} from './classroom.js';

document.addEventListener("DOMContentLoaded", () => {
  // 1. Dynamic UI Navigation & Header State Updates
  evaluateSessionInterfaceUpdate();

  // 2. Hydrate Active Enrolled Modules (For my-courses / student workspace)
  initializeStudentLedgerWorkspace();

  // 3. Hydrate Classroom Hub & Video Player (If on course-content page)
  initializeClassroomHub();
  renderCoursesFromStorage();

  // 4. Hydrate Module Blueprint Editor Form (If on edit-course page)
  if (window.location.pathname.includes('edit-course.html')) {
    initializeBlueprintEditorEngine();
  }

  // 5. Hydrate Student Dashboard Metrics Cards
  if (window.location.pathname.includes('student-dashboard')) {
    hydrateStudentDashboardMetrics();
  }

  // 6. Admin Security Guard & Dashboard Metrics Hydration
  if (window.location.pathname.includes('admin-dashboard.html')) {
    if (checkAdminAccess()) {
      hydrateAdminMetrics();
    }
  }

  // 7. Initialize Success Redirect Link on enrollment-success.html
  initializeEnrollmentSuccessEngine();

  // 8. Add Course Form Handler
  const addForm = document.getElementById("add-course-form");
  if (addForm) {
    addForm.addEventListener("submit", verifyAndCommitCourse);
  }

  // 9. Student Login Submission Handler
  const studentLoginForm = document.getElementById("student-login-form");
  if (studentLoginForm) {
    studentLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("log-email")?.value.trim() || "";
      const password = document.getElementById("log-password")?.value || "";
      const notice = document.getElementById("login-notice");

      const result = handleStudentLogin(email, password);

      if (result.success) {
        if (notice) {
          notice.className = "notice show success";
          notice.innerText = "Login successful — Redirecting...";
        }
        setTimeout(() => {
          window.location.href = "student-dashboard.html";
        }, 1000);
      } else {
        if (notice) {
          notice.className = "notice show error";
          notice.innerText = result.message;
        }
      }
    });
  }

  // 10. Admin Login Submission Handler
  const adminLoginForm = document.getElementById("admin-login-form");
  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("admin-email")?.value.trim() || "";
      const password = document.getElementById("admin-password")?.value || "";
      const notice = document.getElementById("login-notice");

      const result = handleAdminLogin(email, password);

      if (result.success) {
        if (notice) {
          notice.className = "notice show success";
          notice.innerText = "Access Authorized — Redirecting to Admin Dashboard...";
        }
        setTimeout(() => {
          window.location.href = "admin-dashboard.html";
        }, 1000);
      } else {
        if (notice) {
          notice.className = "notice show error";
          notice.innerText = result.message;
        }
      }
    });
  }

  // 11. Enrollment Modal Form Handler
  const enrollForm = document.getElementById("enrollment-form");
  if (enrollForm) {
    enrollForm.addEventListener("submit", executeEnrollment);
  }

  // 12. Admin Gate Verification Clearance Form Handler
  const adminGateForm = document.getElementById("admin-gate-form");
  if (adminGateForm) {
    adminGateForm.addEventListener("submit", verifyAdminClearance);
  }

  // --- EXPOSE HANDLERS TO WINDOW OBJECT FOR HTML INLINE EVENTS ---
  window.logoutAdmin = logoutAdmin;
  window.logoutStudent = logoutStudent;
  window.handleGlobalSessionLogout = handleGlobalSessionLogout;
  window.handleEnrollment = handleEnrollment;
  window.executeEnrollment = executeEnrollment;
  window.handleAdminEdit = handleAdminEdit;
  window.verifyAdminClearance = verifyAdminClearance;
  window.closeModal = closeModal;
  window.verifyAndCommitCourse = verifyAndCommitCourse;
  window.updateCourseData = updateCourseData;
  window.deleteCourseSchema = deleteCourseSchema;
  window.jumpToSpecificModule = jumpToSpecificModule;
  window.navigateToNextLessonModule = navigateToNextLessonModule;
  window.switchLMSTab = switchLMSTab;
  window.evaluateProgressMetricsUpdate = evaluateProgressMetricsUpdate;
});

/**
 * Updates the 'Start Learning' link on enrollment-success.html to route directly to course-content.html
 */
function initializeEnrollmentSuccessEngine() {
  const startBtn = document.getElementById('start-learning-btn');
  if (!startBtn) return;

  const studentId = localStorage.getItem("studentAcademicId") || "default";
  const records = JSON.parse(localStorage.getItem(`enrolledTracks_${studentId}`)) || [];

  if (records.length > 0) {
    const latestCourseId = records[records.length - 1].courseId;
    startBtn.href = `course-content.html?id=${latestCourseId}`;
  } else {
    startBtn.href = 'courses.html';
  }
}