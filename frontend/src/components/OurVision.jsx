import React from "react";
import { FcOk } from "react-icons/fc";
import { IoDiamond, IoEye } from "react-icons/io5";
import { RiTargetFill } from "react-icons/ri";

function OurVision() {
  return (
    <div className="mt-5 px-6 flex items-center justify-center gap-9">
      {/* our mission */}
      <div className="relative overflow-hidden w-[335px] bg-white rounded-[8px] shadow py-4 px-8 border border-gray-100">
        {/* Top-right corner design */}
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-bl-full bg-green-100/70 pointer-events-none"></div>

        {/* Bottom-left corner design */}
        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-tr-full bg-green-100/70 pointer-events-none"></div>

        <div className="relative z-10 flex items-start gap-2">
          <div className="flex items-center p-1 bg-green-200 text-green-700 rounded-full">
            <RiTargetFill size={30} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Our Mission</h1>

            <div className="text-[14px] text-gray-500 mt-3">
              <p>To provide a smart and reliable</p>
              <p>platform that simplifies school</p>
              <p>management and supports quality</p>
              <p>education for every learner</p>
            </div>
          </div>
        </div>
      </div>
      {/* our vision */}
      <div className="relative overflow-hidden w-[335px] bg-white rounded-[8px] shadow py-4 px-8 border border-gray-100">
        {/* Top-right corner design */}
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-bl-full bg-blue-100/70 pointer-events-none"></div>

        {/* Bottom-left corner design */}
        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-tr-full bg-blue-100/70 pointer-events-none"></div>

        <div className="relative z-10 flex items-start gap-2">
          <div className="flex items-center p-1 bg-blue-200 text-blue-700 rounded-full">
            <IoEye size={30} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Our Vision</h1>

            <div className="text-[14px] text-gray-500 mt-3">
              <p>To be a leading school management</p>
              <p>solution, creating a connected</p>
              <p>education ecosystem for a</p>
              <p>brighter future</p>
            </div>
          </div>
        </div>
      </div>
      {/* our values */}
      <div className="relative overflow-hidden w-[335px] bg-white rounded-[8px] shadow py-4 px-8 border border-gray-100">
        {/* Top-right corner design */}
        <div className="absolute -top-5 -right-5 w-20 h-20 rounded-bl-full bg-purple-100/70 pointer-events-none"></div>

        {/* Bottom-left corner design */}
        <div className="absolute -bottom-5 -left-5 w-20 h-20 rounded-tr-full bg-purple-100/70 pointer-events-none"></div>

        <div className="relative z-10 flex items-start gap-2">
          <div className="flex items-center p-1 bg-purple-200 text-purple-700 rounded-full">
            <IoDiamond size={30} />
          </div>

          <div>
            <h1 className="text-xl font-bold">Our Values</h1>

            <div className="text-[14px] text-gray-500 mt-3">
              <div className="flex items-center gap-2">
                <FcOk /> Integrity & Trust
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Innovation
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Collaboration
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Student Success
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurVision;
