import React from "react";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import CheckResult from "./CheckResult";
import Features from "./Features";
import Footer from "./Footer";

function UserDashboard() {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <HeroSection />
      <CheckResult />
      <Features />
      <Footer />
    </div>
  );
}

export default UserDashboard;
