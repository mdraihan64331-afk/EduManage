import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import CheckResult from "../components/CheckResult";
import Features from "../components/Features";
import Footer from "../components/Footer";

function LandingHome() {
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

export default LandingHome;
