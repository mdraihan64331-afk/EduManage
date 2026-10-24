import React from "react";
import heroImage from "../assets/featuresHeroImage.PNG";
import heroBGImage from "../assets/featuresHeroBackgroundImage.PNG";
import { IoAlertCircle, IoShieldCheckmarkSharp } from "react-icons/io5";
import { BsFillLightningFill } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";

function FeaturesHeroSection() {
  return (
    <div>
      <section
        className="min-h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroBGImage})`,
        }}
      >
        <div className="flex items-center w-full">
          <div className="container mx-auto px-6  w-1/2">
            <div className="flex items-center justify-center animate-pulse gap-2 w-43 bg-green-200 rounded-2xl p-1">
              <IoAlertCircle size={20} className="rotate-180 text-green-600" />
              <p className="text-green-600 text-[14px] font-bold">
                Our Features
              </p>
            </div>
            <div className="font-bold mt-3 text-4xl flex flex-col gap-1">
              <h1>Powerful Features for</h1>
              <h1 className="text-green-600">Better School Management</h1>
            </div>
            <div className="text-[14px] mt-5 text-gray-500">
              <p>EduManage provides a complete set of tools to make school</p>
              <p>
                management simple, effcient and smart. Explore our Key features
              </p>
              <p>
                that help students, teachers and administrators work together
              </p>
              <p>for a brighter future.</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center gap-2">
                <div className="p-2 flex items-center bg-green-200 text-green-700 rounded-full">
                  <BsFillLightningFill />
                </div>
                <div>
                  <p className="text-[14px] text-green-500">Easy to use</p>
                  <p className="text-xs text-gray-500">
                    Simple & intultive interface
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 flex items-center bg-green-200 text-green-700 rounded-full">
                  <IoShieldCheckmarkSharp />
                </div>
                <div>
                  <p className="text-[14px] text-green-500">Secure</p>
                  <p className="text-xs text-gray-500">
                    Your data is always safe
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 flex items-center bg-green-200 text-green-700 rounded-full">
                  <BiSupport />
                </div>
                <div>
                  <p className="text-[14px] text-green-500">24/7 Support</p>
                  <p className="text-xs text-gray-500">We're here to help</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <img src={heroImage} className="w-full" alt="" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default FeaturesHeroSection;
