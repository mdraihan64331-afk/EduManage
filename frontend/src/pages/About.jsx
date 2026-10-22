import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutHeroSection from "../components/AboutHeroSection";
import OurVision from "../components/OurVision";

function About() {
  return (
    <div>
      <Navbar />
      <AboutHeroSection />
      <OurVision />
      <Footer />
    </div>
  );
}

export default About;
