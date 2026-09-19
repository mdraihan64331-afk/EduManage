import React from "react";
import adminImage from "../assets/admin-image.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import Overview from "../pages/Overview";
import Menu from "../pages/Menu";
import { useSelector } from "react-redux";

function AdminDashboard() {
  const { userData } = useSelector((state) => state.user);
  
  return (
    <div className="flex ">
      <div>
        <Menu />
      </div>
      <div className="p-2 w-full h-full">
        <div>
          <div className="flex justify-end gap-5 items-center">
            <div className="flex items-center gap-2 border border-gray-400 rounded-[5px] p-1">
              <IoSearchOutline />
              <input
                type="text"
                placeholder="Search anything..."
                className="outline-none"
              />
            </div>
            <IoNotificationsOutline />
            <div className="flex items-center gap-2">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
                  {userData?.fullName?.slice(0, 2).toUpperCase()}
                </h1>
              )}
              <h1 className="font-semibold">{userData?.fullName}</h1>
            </div>
          </div>
          <div>
            <h1 className="font-bold text-xl">Dashboard</h1>
            <p>Welcome back, Admin! Here's what's happening.</p>
            <div className="flex-1 py-6">
              <div className="grid grid-cols-4 gap-4">
                {/* total students */}

                <div className="h-30 w-full flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <MdOutlinePeopleOutline
                      size={25}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Students</p>
                    <h1 className="font-bold text-2xl">2450</h1>
                    <p className="text-xs text-green-600">+12 this month</p>
                  </div>
                </div>

                {/* total teachers */}

                <div className="h-30 w-full flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-purple-100 rounded-xl p-2">
                    <FaChalkboardTeacher
                      size={25}
                      className="text-purple-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Teachers</p>
                    <h1 className="font-bold text-2xl">120</h1>
                    <p className="text-xs text-green-600">+2 this month</p>
                  </div>
                </div>

                {/* total classes */}

                <div className="h-30 w-full flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <SiGoogleclassroom size={25} className="text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Classes</p>
                    <h1 className="font-bold text-2xl">85</h1>
                    <p className="text-xs text-green-600">+5 this month</p>
                  </div>
                </div>

                {/* today's attendence */}
                <div className="h-30 w-full flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-green-100 rounded-xl p-2">
                    <MdEventAvailable size={25} className="text-green-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Today's Attendence</p>
                    <h1 className="font-bold text-2xl">92.5%</h1>
                    <p className="text-xs text-green-600">Present</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Overview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
