import React from "react";
import { useSelector } from "react-redux";
import UserDashboard from "../components/UserDashboard";
import LandingHome from "./LandingHome";

function Home() {
  const { userData } = useSelector((state) => state.user);

  if (!userData) {
    return <UserDashboard />;
  }

  return <LandingHome />;
}

export default Home;