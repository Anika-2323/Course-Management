/* ============================================================
   VeritasNotify — shared client-side notification utility
   ------------------------------------------------------------
   Frontend-only stand-in for a real notification/email service.
   Every "email" here is a locally stored preview object; nothing
   is actually sent. Once a backend exists, swap the inside of
   buildEmailPreview()/push() for real API calls — every page that
   calls VeritasNotify.push(...) keeps working unchanged.

   Include this file BEFORE your page's own <script> with:
     <script src="notifications-lib.js"></script>
   ============================================================ */
(function (global) {
  const STORAGE_PREFIX = "veritasNotifications_";

  function getStudentId() {
    return localStorage.getItem("studentAcademicId") || "default";
  }

  function getStudentProfile() {
    try {
      return JSON.parse(localStorage.getItem("studentProfile")) || null;
    } catch (e) {
      return null;
    }
  }

  function setStudentProfile(profile) {
    localStorage.setItem("studentProfile", JSON.stringify(profile));
  }

  function storageKey() {
    return STORAGE_PREFIX + getStudentId();
  }

  function getAll() {
    try {
      return JSON.parse(localStorage.getItem(storageKey())) || [];
    } catch (e) {
      return [];
    }
  }

  function saveAll(list) {
    localStorage.setItem(storageKey(), JSON.stringify(list));
  }

  const TYPE_META = {
    new_course: { label: "New Course Alert", icon: "📚" },
    enrollment: { label: "Enrollment Confirmation", icon: "🎓" },
    assignment_reminder: { label: "Assignment Reminder", icon: "⏰" },
    certificate: { label: "Completion Certificate", icon: "🏅" }
  };

  function buildEmailPreview(type, data) {
    const profile = getStudentProfile();
    const studentName = (profile && profile.name) || "Student";
    const toEmail = (profile && profile.email) || "student@example.com";
    let subject = "";
    let body = "";

    switch (type) {
      case "new_course":
        subject = `New course available: ${data.courseTitle}`;
        body = `Hi ${studentName},<br><br>A new course, <strong>${data.courseTitle}</strong> (${data.courseId}), just went live on SkillTrack Portal. Visit your dashboard to enroll.<br><br>— SkillTrack Portal`;
        break;
      case "enrollment":
        subject = `You're enrolled in ${data.courseTitle}`;
        body = `Hi ${studentName},<br><br>You're officially enrolled in <strong>${data.courseTitle}</strong> (${data.courseId}). Head to your classroom anytime to pick up where you left off.<br><br>— SkillTrack Portal`;
        break;
      case "assignment_reminder":
        subject = `Pick back up: ${data.courseTitle}`;
        body = `Hi ${studentName},<br><br>You still have modules left in <strong>${data.courseTitle}</strong>. A few minutes today keeps your progress moving.<br><br>— SkillTrack Portal`;
        break;
      case "certificate":
        subject = `Your certificate is ready — ${data.courseTitle}`;
        body = `Hi ${studentName},<br><br>Congratulations on finishing <strong>${data.courseTitle}</strong>! Your certificate of completion is ready to view and download.<br><br>— SkillTrack Portal`;
        break;
      default:
        subject = data.subject || "Notification from SkillTrack Portal";
        body = data.message || "";
    }

    return { to: toEmail, subject, body };
  }

  function push(type, data, opts) {
    data = data || {};
    opts = opts || {};
    const list = getAll();

    if (opts.dedupeKey && list.some(n => n.dedupeKey === opts.dedupeKey)) {
      return null; // already sent this exact notification before
    }

    const notification = {
      id: "notif_" + Date.now() + "_" + Math.random().toString(36).slice(2, 8),
      type,
      dedupeKey: opts.dedupeKey || null,
      title: (TYPE_META[type] && TYPE_META[type].label) || "Notification",
      courseId: data.courseId || null,
      courseTitle: data.courseTitle || null,
      message: data.message || "",
      timestamp: Date.now(),
      read: false,
      email: buildEmailPreview(type, data)
    };

    list.unshift(notification);
    saveAll(list);

    if (typeof global.dispatchEvent === "function") {
      global.dispatchEvent(new CustomEvent("veritas-notification", { detail: notification }));
    }
    return notification;
  }

  function markRead(id) {
    const list = getAll();
    const target = list.find(n => n.id === id);
    if (target) target.read = true;
    saveAll(list);
  }

  function markAllRead() {
    saveAll(getAll().map(n => Object.assign({}, n, { read: true })));
  }

  function remove(id) {
    saveAll(getAll().filter(n => n.id !== id));
  }

  function clearAll() {
    saveAll([]);
  }

  function unreadCount() {
    return getAll().filter(n => !n.read).length;
  }

  global.VeritasNotify = {
    TYPE_META,
    push,
    getAll,
    markRead,
    markAllRead,
    remove,
    clearAll,
    unreadCount,
    getStudentProfile,
    setStudentProfile,
    getStudentId
  };
})(window);