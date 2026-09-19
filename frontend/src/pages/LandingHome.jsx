import React from "react";
import UserDashboard from "../components/UserDashboard";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";

function LandingHome() {
    const { userData } = useSelector((state) => state.user);
  return (
    <div>
      {userData?.role === "Student/Guardian" && <UserDashboard />}

      {userData?.role === "Admin" && <AdminDashboard />}
    </div>
  )
}

export default LandingHome
