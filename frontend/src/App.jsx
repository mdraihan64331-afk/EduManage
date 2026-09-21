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
import Teacher from "./components/Teacher";
import Classes from "./components/Classes";
import Attendance from "./components/Attendance";
import Result from "./components/Result";
import Performance from "./components/Performance";
import Homework from "./components/Homework";
import FeesPayment from "./components/FeesPayment";
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

export const serverURL = "http://localhost:8000";
function App() {
  useGetCurrentUser();
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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/sign-in"
          element={!userData ? <Signin /> : <Navigate to={"/"} />}
        />
        <Route
          path="/sign-up"
          element={!userData ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/students/add-student" element={<AddStudent />} />
        <Route path="/students/edit-student/:id" element={<EditStudent />} />
        <Route path="/students/list-student" element={<ListStudents />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/attendances" element={<Attendance />} />
        <Route path="/results" element={<Result />} />
        <Route path="/performances" element={<Performance />} />
        <Route path="/homeworks" element={<Homework />} />
        <Route path="/fees-payments" element={<FeesPayment />} />
        <Route path="/notice-announcements" element={<NoticeAnnouncement />} />
        <Route path="/ranknings" element={<Rankning />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
