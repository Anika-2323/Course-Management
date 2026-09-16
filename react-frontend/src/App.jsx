import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoleSelect from "./pages/RoleSelect";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentDashboard from "./pages/StudentDashboard";
import MyCourses from "./pages/MyCourses";
import Courses from "./pages/Courses";
import CourseContent from "./pages/CourseContent";
import Certificate from "./pages/Certificate";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <Routes>
      {/* Landing & Role */}
      <Route path="/" element={<Home />} />
      <Route path="/index.html" element={<Home />} />
      <Route path="/role" element={<RoleSelect />} />
      <Route path="/role.html" element={<RoleSelect />} />

      {/* Student Auth & Portal */}
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/student-login.html" element={<StudentLogin />} />
      <Route path="/student-register" element={<StudentRegister />} />
      <Route path="/student-register.html" element={<StudentRegister />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student-dashboard.html" element={<StudentDashboard />} />
      <Route path="/my-courses" element={<MyCourses />} />
      <Route path="/my-courses.html" element={<MyCourses />} />

      {/* Course Catalog & Learning */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses.html" element={<Courses />} />
      <Route path="/course-content" element={<CourseContent />} />
      <Route path="/course-content.html" element={<CourseContent />} />
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/certificate.html" element={<Certificate />} />
      <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
      <Route path="/enrollment-success.html" element={<EnrollmentSuccess />} />

      {/* Admin Operations */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-login.html" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-dashboard.html" element={<AdminDashboard />} />
      <Route path="/add-course" element={<AddCourse />} />
      <Route path="/add-course.html" element={<AddCourse />} />
      <Route path="/edit-course" element={<EditCourse />} />
      <Route path="/edit-course.html" element={<EditCourse />} />

      {/* Notifications */}
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/notifications.html" element={<Notifications />} />
    </Routes>
  );
}

export default App;