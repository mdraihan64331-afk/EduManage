import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHeroSection from "../components/ContactHeroSection";
import Address from "../components/Address";

function Contact() {
  return (
    <div>
      <Navbar />
      <ContactHeroSection />
      <Address />
      <Footer />
    </div>
  );
}

export default Contact;
