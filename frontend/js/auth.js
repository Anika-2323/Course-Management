// js/auth.js

export function handleStudentLogin(email, password) {
  const mockStudentDatabase = [
    { email: "student@institute.edu", password: "password", name: "Anika", academicId: "E24AI003" },
    { email: "sister@institute.edu", password: "password123", name: "Janhavi", academicId: "E24AI015" }
  ];

  const matchedStudent = mockStudentDatabase.find(
    s => s.email === email && s.password === password
  );

  if (matchedStudent) {
    localStorage.removeItem("isAdminVerified");
    localStorage.setItem("isStudentLoggedIn", "true");
    localStorage.setItem("studentName", matchedStudent.name);
    localStorage.setItem("studentAcademicId", matchedStudent.academicId);
    return { success: true, name: matchedStudent.name };
  }
  return { success: false, message: "Invalid student credentials." };
}

export function checkAdminAccess() {
  if (localStorage.getItem("isAdminVerified") !== "true") {
    alert("Access Denied: Administrative credential signatures required.");
    window.location.href = "admin-login.html";
    return false;
  }
  return true;
}

export function logoutStudent() {
  localStorage.removeItem("isStudentLoggedIn");
  localStorage.removeItem("studentName");
  localStorage.removeItem("studentAcademicId");
  window.location.href = "index.html";
}

export function logoutAdmin() {
  localStorage.removeItem("isAdminVerified");
  alert("Administrative session closed safely.");
  window.location.href = "index.html";
}

export function handleGlobalSessionLogout() {
  localStorage.removeItem("isStudentLoggedIn");
  localStorage.removeItem("studentName");
  localStorage.removeItem("studentAcademicId");
  localStorage.removeItem("isAdminVerified");
  alert("Session closed safely.");
  window.location.href = "index.html";
}

export function handleEnrollment(courseId, courseTitle) {
  const isStudentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";

  if (!isStudentLoggedIn) {
    alert("Authentication required. Redirecting to student login system.");
    window.location.href = "student-login.html";
    return;
  }

  const currentStudentId = localStorage.getItem("studentAcademicId") || "E24AI003";
  const savedName = localStorage.getItem("studentName") || "Anika";

  const modal = document.getElementById('enrollment-modal');
  const courseIdInput = document.getElementById('enroll-course-id');
  const modalTitle = document.getElementById('enroll-modal-title');
  const modalMeta = document.getElementById('enroll-modal-meta');
  const fullnameInput = document.getElementById('student-fullname');
  const academicIdInput = document.getElementById('student-academic-id');

  if (courseIdInput) courseIdInput.value = courseId;
  if (modalTitle) modalTitle.innerText = courseTitle || courseId;
  if (modalMeta) modalMeta.innerText = `Target Allocation: ${courseId}`;
  if (fullnameInput) fullnameInput.value = savedName;
  if (academicIdInput) academicIdInput.value = currentStudentId;

  if (modal) {
    modal.classList.add('active');
  } else {
    executeEnrollmentDirect(courseId, currentStudentId);
  }
}

export function executeEnrollment(event) {
  if (event) event.preventDefault();
  
  const courseId = document.getElementById('enroll-course-id')?.value;
  const studentId = document.getElementById('student-academic-id')?.value.trim() || localStorage.getItem("studentAcademicId") || "default"; 
  
  if (!courseId) return;

  // Persist updated student ID
  localStorage.setItem("studentAcademicId", studentId);
  executeEnrollmentDirect(courseId, studentId);
}

function executeEnrollmentDirect(courseId, studentId) {
  let records = JSON.parse(localStorage.getItem(`enrolledTracks_${studentId}`)) || [];
  
  if (!records.some(r => r.courseId === courseId)) {
    records.push({ courseId: courseId, student: studentId });
    localStorage.setItem(`enrolledTracks_${studentId}`, JSON.stringify(records));
  }

  closeModal('enrollment-modal');
  window.location.href = "enrollment-success.html";
}

export function handleAdminEdit(courseId) {
  const isAdminVerified = localStorage.getItem("isAdminVerified") === "true";

  if (!isAdminVerified) {
    const modal = document.getElementById('admin-gate-modal');
    const targetInput = document.getElementById('edit-target-course-id');
    if (targetInput) targetInput.value = courseId;
    if (modal) {
      modal.classList.add('active');
      return;
    }
    window.location.href = "admin-login.html";
    return;
  }

  window.location.href = `edit-course.html?id=${courseId}`;
}

export function verifyAdminClearance(event) {
  if (event) event.preventDefault();
  const email = document.getElementById('admin-email')?.value;
  const pass = document.getElementById('admin-pass')?.value;
  const targetCourse = document.getElementById('edit-target-course-id')?.value;

  if (email === "admin@institute.edu" && pass === "password") {
    localStorage.setItem("isAdminVerified", "true");
    closeModal('admin-gate-modal');
    if (targetCourse) {
      window.location.href = `edit-course.html?id=${targetCourse}`;
    } else {
      window.location.href = "admin-dashboard.html";
    }
  } else {
    alert("Invalid Security Password. Clearance rejected.");
  }
}

export function closeModal(modalId) {
  const targetId = modalId || 'enrollment-modal';
  const modal = document.getElementById(targetId);
  if (modal) {
    modal.classList.remove('active');
  }
}

export function handleAdminLogin(email, password) {
  if (email === "admin@institute.edu" && password === "password") {
    // Clear student tokens to prevent session overlap
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentAcademicId");

    // Set administrative verification flag
    localStorage.setItem("isAdminVerified", "true");
    return { success: true };
  }
  return { success: false, message: "Access Denied: Invalid administrative credentials." };
}