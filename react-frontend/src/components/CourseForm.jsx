import { useState } from "react";

export default function CourseForm({ course = {}, submitLabel, onSubmit, onDelete, error }) {
  const [values, setValues] = useState(() => ({
    courseCode: course.courseCode || "",
    category: course.category || "",
    courseName: course.courseName || "",
    instructor: course.instructor || "",
    duration: course.duration || "",
    level: course.level || "",
    overview: course.overview || "",
    image: course.image || "",
    modules: Array.isArray(course.modules) ? course.modules.join(", ") : ""
  }));

  function handleChange(event) {
    setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...course,
      ...values,
      status: course.status || "Active",
      modules: values.modules.split(",").map((module) => module.trim()).filter(Boolean)
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="course-code">Course Code</label>
          <input id="course-code" name="courseCode" value={values.courseCode} onChange={handleChange} placeholder="e.g. CS-402" required />
        </div>
        <div className="field-group">
          <label htmlFor="course-category">Category</label>
          <input id="course-category" name="category" value={values.category} onChange={handleChange} placeholder="e.g. Artificial Intelligence" required />
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="course-name">Course Title</label>
        <input id="course-name" name="courseName" value={values.courseName} onChange={handleChange} placeholder="e.g. Deep Learning and Neural Networks" required />
      </div>
      <div className="field-row">
        <div className="field-group">
          <label htmlFor="course-instructor">Instructor</label>
          <input id="course-instructor" name="instructor" value={values.instructor} onChange={handleChange} placeholder="e.g. Dr. Priya" required />
        </div>
        <div className="field-group">
          <label htmlFor="course-duration">Duration</label>
          <input id="course-duration" name="duration" value={values.duration} onChange={handleChange} placeholder="e.g. 8 Weeks" required />
        </div>
      </div>
      <div className="field-group">
        <label htmlFor="course-level">Level</label>
        <select id="course-level" name="level" value={values.level} onChange={handleChange} required>
          <option value="" disabled>Select a level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Beginner to Advanced">Beginner to Advanced</option>
        </select>
      </div>
      <div className="field-group">
        <label htmlFor="course-overview">Overview</label>
        <textarea id="course-overview" name="overview" value={values.overview} onChange={handleChange} placeholder="Describe what students will learn in this course." required />
      </div>
      <div className="field-group">
        <label htmlFor="course-modules">Modules (comma-separated)</label>
        <textarea id="course-modules" name="modules" value={values.modules} onChange={handleChange} placeholder="e.g. Foundations, Practical Work, Final Project" required />
      </div>
      <div className="field-group">
        <label htmlFor="course-image">Image URL</label>
        <input id="course-image" name="image" type="url" value={values.image} onChange={handleChange} placeholder="https://example.com/course-image.png" />
      </div>
      {error && <p className="notice show error" role="alert">{error}</p>}
      <div className="form-actions" style={{ display: "flex", justifyContent: onDelete ? "space-between" : "flex-end", gap: "12px", marginTop: "32px" }}>
        {onDelete && <button type="button" className="btn-danger-text" onClick={onDelete}>Delete Course</button>}
        <button type="submit" className="btn btn-burgundy">{submitLabel}</button>
      </div>
    </form>
  );
}