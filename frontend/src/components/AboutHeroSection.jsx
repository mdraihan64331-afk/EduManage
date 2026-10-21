import React from "react";
import heroBG from "../assets/aboutSectionBG.PNG";
import heroImage from "../assets/aboutHeroImage.PNG";
import { IoAlertCircle } from "react-icons/io5";
import { LuArrowRight } from "react-icons/lu";
import { CgMail } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function AboutHeroSection() {
  const navigate = useNavigate();
  return (
    <div>
      <section
        className="min-h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroBG})`,
        }}
      >
        {/* hero contant */}
        <div className="flex items-center w-full">
          <div className="container mx-auto px-6 py-20 w-1/2">
            <div className="flex items-center justify-center gap-2 w-43 bg-green-200 rounded-2xl p-1">
              <IoAlertCircle size={20} className="rotate-180 text-green-600" />
              <p className="text-green-700 text-[14px] font-bold">
                About EduManage
              </p>
            </div>

            <div className="font-bold mt-3 text-4xl flex flex-col gap-1">
              <h1>Empowering Education.</h1>
              <h1 className="text-green-700">Building a Brighter Future.</h1>
            </div>
            <div className="text-[14px] mt-5 text-gray-500">
              <p>EduManage is a modern school management platform that </p>
              <p>
                helps students, guardians, teachers and schools stay connected
              </p>
              <p>and work together for a better learning experience.</p>
            </div>
            <div className="flex items-center gap-5 mt-5">
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 py-2 px-4  border border-green-600 text-white bg-green-600 rounded-lg cursor-pointer group transition-colors duration-500 hover:bg-transparent hover:text-green-600"
                onClick={() => navigate("/features")}
              >
                <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-green-600">
                  Explore Features
                  <LuArrowRight />
                </span>
              </button>

              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 py-2 px-4 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                onClick={() => navigate("/Contact")}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <CgMail size={20} />
                  Contact Us
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>

          <div className="hero-image w-1/2">
            <svg
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
              className="hero-image-clip"
            >
              <defs>
                <clipPath id="waveClip" clipPathUnits="userSpaceOnUse">
                  <path
                    d="
                        M 110 0
                        C 10 70, 35 150, 60 230
                        C 100 310, 55 380, 75 440
                        C 80 465, 105 490, 140 500
                        L 600 500
                        L 600 0
                        Z
                    "
                  />
                </clipPath>
              </defs>

              <image
                href={heroImage}
                width="600"
                height="500"
                preserveAspectRatio="xMaxYMid slice"
                clipPath="url(#waveClip)"
                x="0"
                y="0"
              />
            </svg>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutHeroSection;
