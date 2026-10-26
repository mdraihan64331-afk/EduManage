import React from "react";
import AdminDashboard from "./components/AdminDashboard";
import { Navigate, Route, Routes } from "react-router-dom";
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
import AdminLogin from "./pages/AdminLogin.jsx";
import useGetCurrentAdmin from "./hooks/useGetCurrentAdmin.jsx";
import AddNotice from "./pages/AddNotice.jsx";
import NoticeList from "./pages/NoticeList.jsx";

export const serverURL = "http://localhost:8000";
function App() {
  useGetCurrentUser();
  useGetCurrentAdmin();
  useGetTeacher();
  useGetStudent();
  useGetAttendance();
  useGetResult();
  useGetFeesPayment();

  const { userData } = useSelector((state) => state.user);
  const { adminData } = useSelector((state) => state.admin);
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
        <Route
          path="/sign-in"
          element={!userData ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/admin-dashboard/admin-signin"
          element={
            !adminData ? (
              <AdminLogin />
            ) : (
              <Navigate to={"/admin-dashboard/dashboard"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/dashboard"
          element={
            adminData ? (
              <AdminDashboard />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/forgot"
          element={
            adminData ? (
              <Forgot />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/students/add-student"
          element={
            adminData ? (
              <AddStudent />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/students/edit-student/:id"
          element={
            adminData ? (
              <EditStudent />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/students/student-details/:id"
          element={
            adminData ? (
              <StudentDetails />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/students/list-student"
          element={
            adminData ? (
              <ListStudents />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/teacher/add-teacher"
          element={
            adminData ? (
              <AddTeachers />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/teacher/teachers-list"
          element={
            adminData ? (
              <TeachersList />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/teacher/edit-teacher/:id"
          element={
            adminData ? (
              <EditTeacher />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route path="/admin-dashboard/classes" element={<Classes />} />
        <Route
          path="/admin-dashboard/attendances/mark-attendance"
          element={
            adminData ? (
              <MarkAttendance />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/attendances/attendance-report"
          element={
            adminData ? (
              <AttendanceReport />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/attendances/edit-mark-attendance/:id"
          element={
            adminData ? (
              <EditMarkAttendance />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/result/add-result"
          element={
            adminData ? (
              <AddResult />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/result/view-result"
          element={
            adminData ? (
              <ResultList />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/result/edit-result/:id"
          element={
            adminData ? (
              <EditResult />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/performances"
          element={
            adminData ? (
              <Performance />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/homeworks"
          element={
            adminData ? (
              <Homework />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/fees-payments"
          element={
            adminData ? (
              <FeesPayment />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/fees-payments/add-payment/:id"
          element={
            adminData ? (
              <AddPayment />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/notice/add-notice"
          element={
            adminData ? (
              <AddNotice />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/notice/notice-list"
          element={
            adminData ? (
              <NoticeList />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/ranknings"
          element={
            adminData ? (
              <Rankning />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/reports"
          element={
            adminData ? (
              <Report />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/settings"
          element={
            adminData ? (
              <Setting />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/profile"
          element={
            adminData ? (
              <Profile />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
        <Route
          path="/admin-dashboard/logout"
          element={
            adminData ? (
              <Logout />
            ) : (
              <Navigate to={"/admin-dashboard/admin-signin"} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
