import React from "react";
import heroSectionBg from "../assets/contactHeroSectionBG.PNG";
import heroSectionImage from "../assets/contactHeroSection.PNG";
import leaf from "../assets/leaf.PNG";
import { MdMessage } from "react-icons/md";

function ContactHeroSection() {
  return (
    <div>
      <section
        className="min-h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroSectionBg})`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="container mx-auto px-6 w-1/2">
            <div className="flex items-center justify-center animate-pulse gap-2 w-43 bg-green-200 rounded-2xl p-1">
              <MdMessage size={20} className="text-green-600" />
              <p className="text-green-600 text-[14px] font-bold">
                Get in Touch
              </p>
            </div>

            <div className="mt-3 text-4xl font-bold">
              <h1>Contact Us</h1>
              <h1>
                We're Here to <span className="text-green-700">Help</span>
              </h1>
            </div>
            <div className="mt-3 text-gray-500 text-[14px]">
              <p>Have any questions, suggestions or need support?</p>
              <p>Feel free reach out to us. We are always here to</p>
              <p>assist you and make your experience better.</p>
            </div>
            <div className="mt-6 -rotate-5 origin-left">
              <p className="font-semibold italic text-emerald-600 text-lg leading-6">
                Together for a
                <br />
                Better Education
              </p>
              <div className="ml-2 mt-1 h-[2px] w-32 -rotate-2 rounded-full bg-emerald-600" />
            </div>
          </div>

          <div className="w-1/2 relative">
            <img
              src={heroSectionImage}
              className="relative z-10 w-full rounded-tl-[200px] rounded-bl-[200px]"
              alt=""
            />

            <div className="absolute -bottom-1 -left-13 z-0">
              <img src={leaf} width={250} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactHeroSection;
