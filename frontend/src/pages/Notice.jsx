import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NoticeHeroSection from "../components/NoticeHeroSection";
import ShowNotice from "../components/ShowNotice";

function Notice() {
  return (
    <div>
      <Navbar />
      <NoticeHeroSection />
      <ShowNotice />
      <Footer />
    </div>
  );
}

export default Notice;
