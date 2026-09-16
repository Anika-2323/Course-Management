/* ============================================================
   SkillTrackNotify — shared client-side notification utility
   ------------------------------------------------------------
   Frontend-only stand-in for a real notification/email service.
   ============================================================ */
// js/notifications.js
const STORAGE_PREFIX = "skilltrackNotifications_";

export function getStudentId() {
  return localStorage.getItem("studentAcademicId") || "default";
}

export function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_PREFIX + getStudentId())) || [];
  } catch (e) {
    return [];
  }
}

export function push(type, data, opts) {
  // Your existing push logic here...
}

export function unreadCount() {
  return getAll().filter(n => !n.read).length;
}