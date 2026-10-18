import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import LandingHome from "./LandingHome";

function Home() {
  const { userData } = useSelector((state) => state.user);

  if (userData?.role === "Student/Guardian") {
    return <UserDashboard />;
  }

  if (userData?.role === "Admin") {
    return <AdminDashboard />;
  }

  return <LandingHome />;
}

export default Home;