// js/classroom.js

let activeCourseId = "";
let activeStudentId = "";
let currentLoadedTaskIndex = 0;

const defaultMaterialsDatabase = {
  "CS-101": {
    tasks: [
      { id: "task1", label: "Module 1: Introduction to Programming Concepts", title: "1. Basic Coding Rules & Core Data Types" },
      { id: "task2", label: "Module 2: Conditional Statements & Control Flow", title: "2. Conditional Logic & If-Else Logic Paths" },
      { id: "task3", label: "Module 3: Loop Iterations & Automation", title: "3. Loop Iterations & Task Automation" },
      { id: "task4", label: "Module 4: Code Debugging Techniques", title: "4. Code Debugging & Finding Errors" }
    ]
  },
  "CS-204": {
    tasks: [
      { id: "task1", label: "Module 1: Introduction to Computer Vision", title: "1. Introduction to Computer Vision" },
      { id: "task2", label: "Module 2: Pixels & Color Matrices", title: "2. Pixels & Digital Color Matrices" },
      { id: "task3", label: "Module 3: Edge Detection Filters", title: "3. Image Filters & Object Boundaries" },
      { id: "task4", label: "Module 4: Real-Time Object Tracking", title: "4. Real-Time Object Tracking Frameworks" }
    ]
  },
  "CS-309": {
    tasks: [
      { id: "task1", label: "Module 1: Proximity Sensors", title: "1. Proximity Sensors & Distance Tracking" },
      { id: "task2", label: "Module 2: Motor Controls", title: "2. Motor Controls & H-Bridge Integration" },
      { id: "task3", label: "Module 3: Autonomous Navigation", title: "3. Building Autonomous Navigation Logic" },
      { id: "task4", label: "Module 4: Chassis Mechanical Assembly", title: "4. Complete Chassis Mechanical Assembly" }
    ]
  }
};

export function initializeClassroomHub() {
  const modulesRoot = document.getElementById('modules-root');
  if (!modulesRoot) return;

  activeStudentId = localStorage.getItem("studentAcademicId") || "default";
  const urlParams = new URLSearchParams(window.location.search);
  activeCourseId = urlParams.get('id') || "CS-101";

  hydrateClassroomWorkspace();
}

function hydrateClassroomWorkspace() {
  const globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  const customCourseData = globalCourses.find(c => c.id === activeCourseId);

  let data = defaultMaterialsDatabase[activeCourseId] || defaultMaterialsDatabase["CS-101"];

  const codeMeta = document.getElementById('course-code-meta');
  const titleDisplay = document.getElementById('course-title-display');
  
  if (codeMeta) codeMeta.innerText = activeCourseId;
  if (titleDisplay) titleDisplay.innerText = customCourseData ? customCourseData.title : (data.title || "Classroom Framework");

  renderMilestonesSidebar(data.tasks);
  loadVideoLessonModule(data.tasks[currentLoadedTaskIndex]);
  evaluateProgressMetricsUpdate();
}

function renderMilestonesSidebar(tasks) {
  const modulesRoot = document.getElementById('modules-root');
  if (!modulesRoot) return;

  const completedTasks = JSON.parse(localStorage.getItem(`checklist_${activeStudentId}_${activeCourseId}`)) || [];
  modulesRoot.innerHTML = "";

  tasks.forEach((task, index) => {
    const isChecked = completedTasks.includes(task.id) ? "checked" : "";
    const isCurrent = index === currentLoadedTaskIndex ? "border: 2px solid var(--ink); background: rgba(255,255,255,0.95);" : "border: 1px solid var(--line);";

    const moduleHTML = `
      <label onclick="window.jumpToSpecificModule(${index})" style="display: flex; align-items: flex-start; gap: 14px; background: rgba(255,255,255,0.4); padding: 16px 20px; border-radius: var(--radius); cursor: pointer; transition: all 0.2s ease; margin-bottom: 8px; ${isCurrent}">
        <input type="checkbox" id="check-${task.id}" class="task-checkbox" value="${task.id}" ${isChecked} onchange="window.evaluateProgressMetricsUpdate(); event.stopPropagation();" style="margin-top: 4px; transform: scale(1.15); accent-color: var(--ink);">
        <span style="font-size: 0.95rem; font-weight: 500; color: var(--ink); line-height: 1.4;">${task.label}</span>
      </label>
    `;
    modulesRoot.insertAdjacentHTML('beforeend', moduleHTML);
  });
}

// js/classroom.js

function loadVideoLessonModule(task) {
  if (!task) return;

  const articleTitle = document.getElementById('reading-article-title');
  const articleBody = document.getElementById('reading-article-body');
  const counter = document.getElementById('module-step-counter');

  if (articleTitle) articleTitle.innerText = task.title;
  if (counter) counter.innerText = `Module ${currentLoadedTaskIndex + 1} of 4`;

  // Array of reliable, embeddable educational video IDs
  const videoPool = [
    "rfscVS0vtbw", // Python Programming Tutorial
    "grEKMHGYyns", // Java Programming Tutorial
    "N8L3A3fBv24", // Computer Vision Basics
    "6trXpU5v3uM"  // Robotics & Sensors
  ];

  const videoId = videoPool[currentLoadedTaskIndex] || "rfscVS0vtbw";

  if (articleBody) {
    articleBody.innerHTML = `
      <div style="background: #000; border-radius: 4px; overflow: hidden; width: 100%; aspect-ratio: 16/9; position: relative;">
        <!-- Verified Embeddable Video Player -->
        <iframe 
          width="100%" 
          height="100%" 
          src="https://www.youtube-nocookie.com/embed/${videoId}?rel=0" 
          title="Course Lesson Video" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen
          style="border: none;">
        </iframe>
      </div>
      <p style="margin-top: 16px; opacity: 0.7; font-size: 0.9rem;">
        Watch the module video above, then click <strong>Complete &amp; Proceed</strong> to save your progress.
      </p>
    `;
  }

  // Ensure 'Complete & Proceed' button stays enabled
  const nextBtn = document.getElementById('next-module-btn');
  if (nextBtn) {
    nextBtn.disabled = false;
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.opacity = '1';
    nextBtn.innerText = currentLoadedTaskIndex < 3 ? "Complete & Proceed →" : "Finish Course 🏁";
  }
}

export function jumpToSpecificModule(targetIndex) {
  currentLoadedTaskIndex = targetIndex;
  const data = defaultMaterialsDatabase[activeCourseId] || defaultMaterialsDatabase["CS-101"];
  renderMilestonesSidebar(data.tasks);
  loadVideoLessonModule(data.tasks[targetIndex]);
}

export function navigateToNextLessonModule() {
  const data = defaultMaterialsDatabase[activeCourseId] || defaultMaterialsDatabase["CS-101"];
  const activeTask = data.tasks[currentLoadedTaskIndex];

  // Auto-check current module on click
  const box = document.getElementById(`check-${activeTask.id}`);
  if (box && !box.checked) {
    box.checked = true;
    evaluateProgressMetricsUpdate();
  }

  if (currentLoadedTaskIndex < data.tasks.length - 1) {
    currentLoadedTaskIndex++;
    loadVideoLessonModule(data.tasks[currentLoadedTaskIndex]);
    renderMilestonesSidebar(data.tasks);
  } else {
    alert("🎉 Outstanding! You have finished all modules for this course!");
    window.location.href = "student-dashboard.html";
  }
}

export function switchLMSTab(tabKey) {
  const panelReading = document.getElementById('panel-reading');
  const panelMaterials = document.getElementById('panel-materials');
  const tabReading = document.getElementById('tab-reading');
  const tabMaterials = document.getElementById('tab-materials');

  if (!panelReading || !panelMaterials) return;

  if (tabKey === 'reading') {
    panelReading.style.display = 'flex';
    panelMaterials.style.display = 'none';
    if (tabReading) { tabReading.style.borderBottom = '2px solid var(--ink)'; tabReading.style.opacity = '1'; }
    if (tabMaterials) { tabMaterials.style.borderBottom = '2px solid transparent'; tabMaterials.style.opacity = '0.5'; }
  } else {
    panelReading.style.display = 'none';
    panelMaterials.style.display = 'flex';
    if (tabMaterials) { tabMaterials.style.borderBottom = '2px solid var(--ink)'; tabMaterials.style.opacity = '1'; }
    if (tabReading) { tabReading.style.borderBottom = '2px solid transparent'; tabReading.style.opacity = '0.5'; }
    
    // Render dynamic study materials list
    renderMaterialsList();
  }
}

function renderMaterialsList() {
  const root = document.getElementById('materials-list-root');
  if (!root) return;
  root.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; background:white; border:1px solid var(--line); border-radius:var(--radius); padding:14px 18px;">
      <div>
        <div style="font-weight:600; font-size:0.92rem; color:var(--ink);">${activeCourseId} Lecture Slides & Documentation.pdf</div>
        <div style="font-size:0.78rem; opacity:0.6; margin-top:2px;">PDF Guide</div>
      </div>
      <span style="font-size:0.8rem; opacity:0.6;">2.4 MB</span>
    </div>
  `;
}

export function evaluateProgressMetricsUpdate() {
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

  const label = document.getElementById('progress-percentage-label');
  const fillBar = document.getElementById('progress-bar-fill');
  if (label) label.innerText = `${progressPercent}% Complete`;
  if (fillBar) fillBar.style.width = `${progressPercent}%`;
}
// js/classroom.js

// js/classroom.js

// js/classroom.js

export function initializeBlueprintEditorEngine() {
  const editForm = document.getElementById('edit-course-form');
  if (!editForm) return;

  const urlParams = new URLSearchParams(window.location.search);
  const activeEditCourseId = urlParams.get('id') || "CS-101";

  const idField = document.getElementById('edit-course-id');
  const metaField = document.getElementById('edit-course-meta');
  const titleField = document.getElementById('edit-course-title');
  const descField = document.getElementById('edit-course-desc');
  const durationField = document.getElementById('edit-course-duration');

  if (idField) idField.value = activeEditCourseId;
  if (metaField) metaField.placeholder = "Enter category (e.g. Module 01 • Automation)";
  if (titleField) titleField.placeholder = "Enter course title...";
  if (descField) descField.placeholder = "Enter course description...";
  if (durationField) durationField.placeholder = "Enter duration (e.g. 8 Weeks)...";
}
export function updateCourseData(event) {
  if (event) event.preventDefault();
  
  const courseId = document.getElementById('edit-course-id')?.value;
  let globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
  const index = globalCourses.findIndex(c => c.id === courseId);

  if (index !== -1) {
    globalCourses[index] = {
      ...globalCourses[index],
      meta: document.getElementById('edit-course-meta')?.value || "",
      title: document.getElementById('edit-course-title')?.value || "",
      desc: document.getElementById('edit-course-desc')?.value || "",
      duration: document.getElementById('edit-course-duration')?.value || "",
      track: document.getElementById('edit-course-track')?.value || "Foundational"
    };

    localStorage.setItem("globalCourses", JSON.stringify(globalCourses));
    alert("System Success: Core blueprint structural alignment modified successfully.");
    window.location.href = "courses.html";
  }
}

export function deleteCourseSchema() {
  const courseId = document.getElementById('edit-course-id')?.value;
  if (confirm(`Warning: You are initiating a full schema deletion process for code: ${courseId}. Continue?`)) {
    let globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];
    globalCourses = globalCourses.filter(c => c.id !== courseId);
    localStorage.setItem("globalCourses", JSON.stringify(globalCourses));

    alert(`Registry Update: Record blueprint schema entry ${courseId} deprecated and scrubbed.`);
    window.location.href = "courses.html";
  }
}
// js/classroom.js

export function verifyAndCommitCourse(event) {
  if (event) event.preventDefault();

  const courseId = document.getElementById('course-id')?.value.trim(); 
  const trackMeta = document.getElementById('course-meta')?.value.trim(); 
  const courseTitle = document.getElementById('course-title')?.value.trim();
  const courseDesc = document.getElementById('course-desc')?.value.trim();
  const duration = document.getElementById('course-duration')?.value.trim();
  const complexityTrack = document.getElementById('course-track')?.value;

  const rawTasksString = document.getElementById('course-tasks')?.value || "";
  const rawTasks = rawTasksString.split(',');
  
  const tasksArray = rawTasks
    .map((taskLabel, index) => {
      const cleanLabel = taskLabel.trim();
      return { 
        id: `task${index + 1}`, 
        label: `Module ${index + 1}: ${cleanLabel}`,
        title: `${index + 1}. ${cleanLabel}`
      };
    })
    .filter(t => t.label !== `Module 1: ` && t.label !== "");

  if (!courseId || !courseTitle || tasksArray.length === 0) {
    alert("Please fill out all required fields and enter at least one syllabus module.");
    return;
  }

  let globalCourses = JSON.parse(localStorage.getItem("globalCourses")) || [];

  // Prevent adding duplicate course IDs if the user clicks alert/button multiple times
  if (globalCourses.some(c => c.id === courseId)) {
    alert(`Course code ${courseId} is already added! Redirecting to catalog...`);
    window.location.href = "courses.html";
    return;
  }

  const newCourseBlueprint = {
    id: courseId,
    meta: trackMeta || `Module ${courseId} • ${complexityTrack}`,
    title: courseTitle,
    desc: courseDesc,
    duration: duration,
    track: complexityTrack,
    tasks: tasksArray
  };

  globalCourses.push(newCourseBlueprint);
  localStorage.setItem("globalCourses", JSON.stringify(globalCourses));

  alert("New course added successfully!");
  window.location.href = "courses.html";
}