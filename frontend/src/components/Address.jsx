import React from "react";
import { GoArrowRight } from "react-icons/go";
import { ImPhone } from "react-icons/im";
import { IoLocation } from "react-icons/io5";
import { MdEmail, MdOutlineWatchLater, MdWatchLater } from "react-icons/md";

function Address() {
  return (
    <div className="mt-5 px-6">
      <div className="flex items-center gap-7">
        {/* our address */}
        <div className="p-3 relative overflow-hidden shadow border border-gray-300 rounded-[8px] w-[290px] bg-green-50">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-green-700 pointer-events-none"></div>

          <div className="flex items-center justify-center w-8 h-8 bg-green-700 rounded-full text-white">
            <IoLocation size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">Our Address</h3>
          <div className="text-[14px] mt-2 font-semibold">
            <p>123 Education Street,</p>
            <p>Dhaka, Bangladesh</p>
          </div>
          <button className="group relative flex items-center mt-4 gap-3 py-2 px-3 bg-green-200 text-green-700 rounded-[8px] cursor-pointer overflow-hidden">
            <span className="absolute -bottom-full left-0 w-full h-full bg-green-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              View on Map
              <GoArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </button>
        </div>
        {/* phone number */}
        <div className="relative overflow-hidden shadow border border-gray-300 p-3 rounded-[8px] w-[290px] bg-blue-50">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-blue-400 pointer-events-none"></div>

          <div className="flex items-center justify-center w-8 h-8 bg-blue-400 rounded-full text-white">
            <ImPhone size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">Phone Number</h3>
          <div className="text-[14px] mt-2 text-gray-600 font-semibold">
            <p>+880 1234-567890</p>
            <p>+880 1234-567890</p>
          </div>
          <button className="group relative flex items-center mt-4 gap-3 py-2 px-4 bg-blue-100 text-blue-700 rounded-[8px] cursor-pointer overflow-hidden">
            <span className="absolute -bottom-10 left-0 w-full h-full bg-blue-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
              <ImPhone size={18} />
              Call Now
            </span>
          </button>
        </div>
        {/* email address */}
        <div className="relative overflow-hidden shadow border border-gray-300 p-3 rounded-[8px] w-[290px] bg-purple-50">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-purple-700 pointer-events-none"></div>

          <div className="flex items-center justify-center w-8 h-8 bg-purple-700 rounded-full text-white">
            <MdEmail size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">Email Address</h3>
          <div className="text-[14px] mt-2 text-gray-600 font-semibold">
            <p>info@edumanage.com</p>
            <p>support@edumanage.com</p>
          </div>
          <button className="group relative flex items-center mt-4 gap-3 py-2 px-3 text-purple-700 bg-purple-100 rounded-[8px] cursor-pointer overflow-hidden">
            <span className="absolute -bottom-full left-0 w-full h-full bg-purple-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              <MdEmail size={18} />
              Send Email
            </span>
          </button>
        </div>
        {/* wordking hours */}
        <div className="relative overflow-hidden shadow border border-gray-300 p-3 rounded-[8px] w-[290px] bg-orange-50">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-yellow-600 pointer-events-none"></div>
          <div className="flex items-center justify-center w-8 h-8 bg-yellow-600 rounded-full text-white">
            <MdWatchLater size={20} />
          </div>
          <h3 className="text-xl font-bold mt-2">Working Hours</h3>
          <div className="text-[14px] mt-2 text-gray-600 font-semibold">
            <p>Saturday - Thursday</p>
            <p>9:00 AM - 4:00 PM</p>
          </div>
          <button className="group relative flex items-center mt-4 gap-3 py-2 px-3 bg-orange-100 text-orange-500 rounded-[8px] cursor-pointer overflow-hidden">
            <span className="absolute -bottom-full left-0 w-full h-full bg-orange-500 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
              <MdOutlineWatchLater size={18} />
              View Details
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Address;
