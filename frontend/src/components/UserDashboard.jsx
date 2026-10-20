import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import CheckResult from "./CheckResult";
import Features from "./Features";

function UserDashboard() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <HeroSection />
      <CheckResult />
      <Features />
    </div>
  );
}

export default UserDashboard;
