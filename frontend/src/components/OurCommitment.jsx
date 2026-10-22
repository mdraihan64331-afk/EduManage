import React from "react";
import ourCommitmentBGImage from "../assets/ourCommitmentBGImage.PNG";
import ourCommitmentImage from "../assets/Our Commitment.PNG";
import { FaHeart } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

function OurCommitment() {
  return (
    <div className="mt-5 px-6">
      <section
        className="bg-cover py-3 px-5 rounded-[8px] flex items-center gap-12 bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${ourCommitmentBGImage})`,
        }}
      >
        <div className="w-[40%]">
          <img
            src={ourCommitmentImage}
            className="rounded-[8px] w-full "
            alt=""
          />
        </div>
        <div className="w-[50%]">
          <div className="flex items-center animate-pulse">
            <p className="flex items-center gap-2 text-[14px] font-semibold bg-green-200 text-green-600 rounded-2xl px-3 py-1">
              <FaHeart /> Our Commitment
            </p>
          </div>
          <div className="mt-2 text-3xl font-bold">
            <h1>Our Commitment to</h1>
            <h1 className="text-green-600">Every Student</h1>
          </div>
          <div className="text-[14px] text-gray-500 mt-2">
            <p>At EduManage, we are committed to creating a supportive,</p>
            <p>transparent and efficient learning environment. We believe</p>
            <p>every student deserves the right tools, guidance and</p>
            <p>opportunities to reach their full potential.</p>
          </div>
          <button
            className="relative mt-2 overflow-hidden flex items-center justify-center gap-2 py-1 px-4  border border-green-600 text-white bg-green-600 rounded-lg cursor-pointer group transition-colors duration-500 hover:bg-transparent hover:text-green-600"
            onClick={() => navigate("/learn-more")}
          >
            <span className="flex items-center gap-2 transition-colors duration-300 group-hover:text-green-600">
              Learn More
              <LuArrowRight />
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}

export default OurCommitment;
