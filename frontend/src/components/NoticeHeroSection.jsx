import React from "react";
import heroImage from "../assets/noticeHeroImage.PNG";
import heroSectionBgImage from "../assets/noticeHeroSectionBGImage.PNG";
import leaf from "../assets/leaf.PNG";
import { GrAnnounce } from "react-icons/gr";

function NoticeHeroSection() {
  return (
    <div>
      <section
        className="min-h-[40vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroSectionBgImage})`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="container mx-auto px-6 w-1/2">
            <div className="flex items-center justify-center animate-pulse gap-2 w-43 bg-green-200 rounded-2xl p-1">
              <GrAnnounce size={20} className="text-green-600" />
              <p className="text-green-600 text-[14px] font-bold">
                Latest Update
              </p>
            </div>
            <div className="font-bold mt-3 text-4xl flex flex-col gap-1">
              <h1>
                Notice & <span className="text-green-600">Announcements</span>
              </h1>
            </div>
            <div className="text-[14px] mt-5 text-gray-500">
              <p>Stay updated with the latest news, important announcements</p>
              <p>
                and events from our school. Check below for all recent notices
              </p>
              <p>and keep yourself informed.</p>
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
              src={heroImage}
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

export default NoticeHeroSection;
