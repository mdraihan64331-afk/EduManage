import React from "react";
import messageImage from "../assets/messageImage.PNG";
import { FaRegMessage } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";

function DropUs() {
  return (
    <div className="mt-5 px-6">
      <div className="rounded-[8px] flex items-center justify-between gap-10 w-full border border-gray-200 p-3">
        <div className="w-1/2">
          <p className="bg-green-100 rounded-2xl text-xs font-semibold animate-pulse py-0.5 px-2 w-33 text-green-600 flex items-center justify-center">
            Send Us a Message
          </p>
          <h1 className="font-bold text-2xl mt-3">
            Drop Us a <span className="text-green-600">Message</span>
          </h1>
          <div className="text-[14px] text-gray-500 mt-2">
            <p>Fill out the form below and we'll get back to you as soon</p>
            <p>as possible.</p>
          </div>
          <div className="mt-3">
            <label>
              Your Name <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-[8px] py-1 px-2">
              <GoPerson className="text-gray-500" />
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="mt-3">
            <label>
              Your Email <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 border border-gray-300 rounded-[8px] py-1 px-2">
              <MdOutlineEmail className="text-gray-500" size={18} />
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full outline-none"
              />
            </div>
          </div>
          <div className="mt-3">
            <label>
              Message <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2 border border-gray-300 rounded-[8px] py-1 px-2">
              <FaRegMessage className="text-gray-500 mt-1" size={18} />
              <textarea
                placeholder="Write your message here..."
                rows={4}
                className="w-full resize-none outline-none"
              />
            </div>
          </div>
          <button className="group relative flex items-center mt-4 gap-3 py-1 px-3 bg-green-200 text-green-700 rounded-[8px] cursor-pointer overflow-hidden">
            <span className="absolute -bottom-full left-0 w-full h-full bg-green-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              Send Message
              <FaPaperPlane
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center w-1/2">
          <div>
            <div>
              <div className="relative mx-auto w-full max-w-[500px]">
                {/* Curved Background Border */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 500 420"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="blueBackground"
                      x1="50"
                      y1="30"
                      x2="450"
                      y2="400"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E0F2FE" />
                      <stop offset="1" stopColor="#F0F9FF" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 55 115
                    C 95 65, 145 85, 190 45
                    C 245 0, 315 25, 350 80
                    C 375 120, 420 105, 445 145
                    C 475 190, 445 235, 425 275
                    C 400 325, 430 360, 385 380
                    C 335 405, 285 370, 235 385
                    C 175 405, 130 370, 95 335
                    C 55 300, 25 265, 40 220
                    C 55 180, 20 150, 55 115 Z"
                    fill="url(#blueBackground)"
                  />
                </svg>
                {/* Decorative Dots */}
                <div className="absolute left-[18%] top-[15%] h-3 w-3 rounded-full bg-sky-200" />
                <div className="absolute left-[23%] top-[10%] h-5 w-5 rounded-full bg-sky-200" />
                <div className="absolute right-[15%] top-[12%] h-6 w-6 rounded-full bg-sky-200" />
                <div className="absolute right-[10%] top-[17%] h-2 w-2 rounded-full bg-sky-200" />
                {/* Support Image */}
                <img
                  src={messageImage}
                  alt="EduManage Support"
                  className="relative z-10 w-[350px] object-contain"
                />
              </div>
              {/* <img src={messageImage} className="w-[300px]" alt="" /> */}
            </div>
            <div className="flex justify-center">
              <div className="mt-6 rotate-[-8deg] text-center">
                <p className="font-serif text-2xl italic leading-8 text-cyan-700">
                  We’re Always
                  <br />
                  <span className="text-emerald-600">Here for You</span>
                </p>
                <div className="mx-auto mt-2 h-[2px] w-32 rotate-[-5deg] rounded-full bg-emerald-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropUs;
