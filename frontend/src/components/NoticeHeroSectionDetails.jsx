import React from "react";
import heroBgImage from "../assets/noticeDetailsHeroBgImage.PNG";
import HeroImage from "../assets/noticeDetailsHeroImage.PNG";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NoticeHeroSectionDetails() {
  const navigate = useNavigate();
  return (
    <div>
      <section
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroBgImage})`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="container mx-auto px-6 w-1/2">
            <div className="font-bold mt-3 text-4xl flex flex-col gap-1">
              <h1>
                Notice <span className="text-green-700">Details</span>
              </h1>
            </div>
            <div className="text-[14px] mt-5 text-gray-500">
              <p>Stay informed with important announcements </p>
              <p>and updates from out school.</p>
            </div>
            <div className="flex items-center gap-3 text-gray-700 text-[14px] mt-5 ">
              <button
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <MdHome size={20} />
                <span>Home</span>
              </button>
              <div>
                <MdKeyboardArrowRight />
              </div>
              <button
                className="cursor-pointer"
                onClick={() => navigate("/notice")}
              >
                Notice
              </button>
              <div>
                <MdKeyboardArrowRight />
              </div>
              <button className="cursor-pointer">Notice Details</button>
            </div>
          </div>
          <div className="w-1/2">
            <svg
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              className="hero-image-clip"
            >
              <defs>
                <clipPath id="waveClip" clipPathUnits="userSpaceOnUse">
                  <path
                    d="
                        M 160 0
                        C 175 70, 75 150, 55 230
                        C 40 310, 70 380, 110 440
                        C 130 465, 155 490, 185 500
                        L 600 500
                        L 600 0
                        Z
                    "
                  />
                </clipPath>
              </defs>

              <image
                href={HeroImage}
                width="600"
                height="400"
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

export default NoticeHeroSectionDetails;
