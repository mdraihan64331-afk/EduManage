import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeaturesHeroSection from "../components/FeaturesHeroSection";
import KeyFeatures from "../components/KeyFeatures";

function Features() {
  return (
    <div>
      <Navbar />
      <FeaturesHeroSection />
      <KeyFeatures />
      <Footer />
    </div>
  );
}

export default Features;
