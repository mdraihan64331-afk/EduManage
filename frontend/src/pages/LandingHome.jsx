import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CheckResult from "../components/CheckResult";
import Features from "../components/Features";

function LandingHome() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <HeroSection />
      <CheckResult />
      <Features />
    </div>
  );
}

export default LandingHome;
