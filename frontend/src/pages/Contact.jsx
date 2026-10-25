import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactHeroSection from "../components/ContactHeroSection";
import Address from "../components/Address";
import DropUs from "../components/DropUs";
import Map from "../components/Map";

function Contact() {
  return (
    <div>
      <Navbar />
      <ContactHeroSection />
      <Address />
      <DropUs />
      <Map />
      <Footer />
    </div>
  );
}

export default Contact;
