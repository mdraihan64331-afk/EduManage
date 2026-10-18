import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import UserDashboard from "./components/UserDashboard";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Features from "./pages/Features";
import Notice from "./pages/Notice";
import Signup from "./pages/Signup";
import Forgot from "./pages/Forgot";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import Performance from "./components/Performance";
import Homework from "./components/Homework";
import NoticeAnnouncement from "./components/NoticeAnnouncement.jsx";
import Rankning from "./components/Rankning";
import Report from "./components/Report";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import LandingHome from "./pages/LandingHome.jsx";
import AddStudent from "./pages/AddStudent.jsx";
import { useSelector } from "react-redux";
import ListStudents from "./pages/ListStudents.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import AddTeachers from "./pages/AddTeachers.jsx";
import TeachersList from "./pages/TeachersList.jsx";
import useGetTeacher from "./hooks/useGetTeacher.jsx";
import EditTeacher from "./pages/EditTeacher.jsx";
import StudentDetails from "./pages/StudentDetails.jsx";
import useGetStudent from "./hooks/useGetStudent.jsx";
import MarkAttendance from "./pages/MarkAttendance.jsx";
import AttendanceReport from "./pages/AttendanceReport.jsx";
import useGetAttendance from "./hooks/useGetAttendance.jsx";
import EditMarkAttendance from "./pages/EditMarkAttendance.jsx";
import AddResult from "./pages/AddResult.jsx";
import ResultList from "./pages/ResultList.jsx";
import useGetResult from "./hooks/useGetResult.jsx";
import EditResult from "./pages/EditResult.jsx";
import useGetFeesPayment from "./hooks/useGetFeesPayment.jsx";
import FeesPayment from "./pages/FeesPayment.jsx";
import Classes from "./pages/Classes.jsx";
import AddPayment from "./components/AddPayment.jsx";

export const serverURL = "http://localhost:8000";
function App() {
  useGetCurrentUser();
  useGetTeacher();
  useGetStudent();
  useGetAttendance();
  useGetResult();
  useGetFeesPayment();

  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/landing-home" element={<LandingHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/admin-dashboard/dashboard" element={<AdminDashboard />} />
        <Route
          path="/sign-in"
          element={!userData ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route path="/admin-dashboard/forgot" element={<Forgot />} />
        <Route path="/admin-dashboard/students/add-student" element={<AddStudent />} />
        <Route path="/admin-dashboard/students/edit-student/:id" element={<EditStudent />} />
        <Route
          path="/admin-dashboard/students/student-details/:id"
          element={<StudentDetails />}
        />
        <Route path="/admin-dashboard/students/list-student" element={<ListStudents />} />
        <Route path="/admin-dashboard/teacher/add-teacher" element={<AddTeachers />} />
        <Route path="/admin-dashboard/teacher/teachers-list" element={<TeachersList />} />
        <Route path="/admin-dashboard/teacher/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/admin-dashboard/classes" element={<Classes />} />
        <Route
          path="/admin-dashboard/attendances/mark-attendance"
          element={<MarkAttendance />}
        />
        <Route
          path="/admin-dashboard/attendances/attendance-report"
          element={<AttendanceReport />}
        />
        <Route
          path="/admin-dashboard/attendances/edit-mark-attendance/:id"
          element={<EditMarkAttendance />}
        />
        <Route path="/admin-dashboard/result/add-result" element={<AddResult />} />
        <Route path="/admin-dashboard/result/view-result" element={<ResultList />} />
        <Route path="/admin-dashboard/result/edit-result/:id" element={<EditResult />} />
        <Route path="/admin-dashboard/performances" element={<Performance />} />
        <Route path="/admin-dashboard/homeworks" element={<Homework />} />
        <Route path="/admin-dashboard/fees-payments" element={<FeesPayment />} />
        <Route path="/admin-dashboard/fees-payments/add-payment/:id" element={<AddPayment />} />
        <Route path="/admin-dashboard/notice-announcements" element={<NoticeAnnouncement />} />
        <Route path="/admin-dashboard/ranknings" element={<Rankning />} />
        <Route path="/admin-dashboard/reports" element={<Report />} />
        <Route path="/admin-dashboard/settings" element={<Setting />} />
        <Route path="/admin-dashboard/profile" element={<Profile />} />
        <Route path="/admin-dashboard/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
