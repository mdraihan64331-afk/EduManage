import React from "react";
import mordernImage from "../assets/mordernSchool.png";
import mordernBGImage from "../assets/mordernSchooleBG.PNG";
import { FaCalendarAlt, FaCloud, FaFileAlt } from "react-icons/fa";
import { IoIosPerson, IoMdSettings } from "react-icons/io";
import { IoPeople, IoShieldCheckmarkSharp } from "react-icons/io5";
import { TbReportMoneyFilled } from "react-icons/tb";
import { GrAnnounce } from "react-icons/gr";
import { SiGoogleanalytics, SiGoogleclassroom } from "react-icons/si";
import { BiSupport } from "react-icons/bi";
import { FcOk } from "react-icons/fc";
import { useSelector } from "react-redux";

function KeyFeatures() {
  const { studentData } = useSelector((state) => state.student);
  const { teacherData } = useSelector((state) => state.teacher);
  return (
    <div className="mt-3">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <p className="py-0.5 px-3 rounded-full text-[14px] bg-green-200 text-green-700">
            Key Features
          </p>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mt-2">
          Everything You Need{" "}
          <span className="text-green-600">in One Place</span>
        </h1>
        <div className="text-[14px] text-gray-600 mt-3">
          <p>
            From student adminniont to final reports, EduManage covers all
            aspects
          </p>
          <p>of school management with powerful and easy-to-use features</p>
        </div>
      </div>

      {/* categorty */}
      <div className="flex items-center justify-between mt-4 px-6">
        {/* student management */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-green-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-green-200 text-green-600 rounded-full">
              <IoPeople size={22} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Student Management</h2>
          </div>
          <div className="text-[14px] text-gray-500">
            <p>Add, update and manage student</p>
            <p>information with ease. Keep track of</p>
            <p>admission, class, section and more.</p>
          </div>
        </div>
        {/* Teacher Management */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-blue-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-blue-200 text-blue-600 rounded-full">
              <IoIosPerson size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Teacher Management</h2>
          <div className="text-[14px] text-gray-500">
            <p>Manage teacher profiles, subjects,</p>
            <p>designations and their class</p>
            <p>assignments.</p>
          </div>
        </div>
        {/* result */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-purple-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-purple-200 text-purple-600 rounded-full">
              <FaFileAlt size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Result Management</h2>
          <div className="text-[14px] text-gray-500">
            <p>Publish exam result, grades and</p>
            <p>performance reports with complete</p>
            <p>details.</p>
          </div>
        </div>

        {/* Attendance */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-green-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-green-200 text-green-600 rounded-full">
              <FaCalendarAlt size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Attendance Tracking</h2>
          <div className="text-[14px] text-gray-500">
            <p>Track daily attendance and</p>
            <p>generate reports for student and </p>
            <p>teachers.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 px-6">
        {/* fees & payments */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-red-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-red-200 text-red-600 rounded-full">
              <TbReportMoneyFilled size={22} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Fees & Payments</h2>
          </div>
          <div className="text-[14px] text-gray-500">
            <p>Manage fee structure, collect </p>
            <p>payments. Supports multiple </p>
            <p>payment methods.</p>
          </div>
        </div>
        {/* notice & announcements */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-orange-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-orange-200 text-orange-600 rounded-full">
              <GrAnnounce size={22} />
            </div>
          </div>
          <h2 className="text-[18px] font-bold">Notice & Announcements</h2>
          <div className="text-[14px] text-gray-500">
            <p>Publish notice and important</p>
            <p>announcements for studens,</p>
            <p>parents and teachers.</p>
          </div>
        </div>
        {/* Reports & Analytics */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-teal-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-teal-200 text-teal-600 rounded-full">
              <SiGoogleanalytics size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Reports & Analytics</h2>
          <div className="text-[14px] text-gray-500">
            <p>Get details reports and insights to </p>
            <p>improve academic performance</p>
            <p>and school operations.</p>
          </div>
        </div>

        {/* Secure & Reliable */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-blue-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-blue-200 text-blue-600 rounded-full">
              <IoShieldCheckmarkSharp size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Secure & Reliable</h2>
          <div className="text-[14px] text-gray-500">
            <p>Your data is protected with</p>
            <p>advanced security and regular </p>
            <p>backups.</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 px-6">
        {/* Cloud Access */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-purple-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-purple-200 text-purple-600 rounded-full">
              <FaCloud size={22} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Cloud Access</h2>
          </div>
          <div className="text-[14px] text-gray-500">
            <p>Access your data anytime, </p>
            <p>any where from any </p>
            <p>device.</p>
          </div>
        </div>
        {/* Customizable Settings */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-teal-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-teal-200 text-teal-600 rounded-full">
              <IoMdSettings size={22} />
            </div>
          </div>
          <h2 className="text-[18px] font-bold">Customizable Settings</h2>
          <div className="text-[14px] text-gray-500">
            <p>Easily configure the system</p>
            <p>according to your school's</p>
            <p>needs.</p>
          </div>
        </div>
        {/* Role Based Acccess */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-red-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-red-200 text-red-600 rounded-full">
              <IoPeople size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Role Based Acccess</h2>
          <div className="text-[14px] text-gray-500">
            <p>Different dashboards for</p>
            <p> Admin, Teacher, student and</p>
            <p>Guardian.</p>
          </div>
        </div>

        {/* Dedicated Support */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-purple-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-purple-200 text-purple-600 rounded-full">
              <BiSupport size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Dedicated Support</h2>
          <div className="text-[14px] text-gray-500">
            <p>Get help whenever you</p>
            <p>need is from our support</p>
            <p>team.</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div
          className="min-h-[50vh] flex items-center gap-12 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${mordernBGImage})`,
          }}
        >
          <div className="w-[50%] px-6">
            <div className="flex items-center animate-pulse">
              <p className="flex items-center gap-2 text-[14px] font-semibold bg-green-200 text-green-600 rounded-2xl px-3 py-0.5">
                Why Choose EduManage?
              </p>
            </div>

            <h1 className="text-4xl font-bold mt-3">
              Built for <span className="text-green-600">Mordern Schools</span>
            </h1>
            <div className="text-[14px] text-gray-500 mt-4">
              <p>
                EduManage is more than just a management system - it's a smarter
              </p>
              <p>
                why to connect, communicate and create a better learning
                environment
              </p>
              <p>for everyone.</p>
            </div>
            <div className="text-[14px] text-gray-500 mt-3">
              <div className="flex items-center gap-2">
                <FcOk /> <p>Saves time and reduces manual work</p>
              </div>
              <div className="flex items-center gap-2">
                <FcOk />{" "}
                <p>Improves communication between school and parents</p>
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> <p>Provides real-time data and insights</p>
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> <p>Easy to use for everyone</p>
              </div>
            </div>
          </div>

          <div className="w-[40%]">
            <img src={mordernImage} alt="" className="w-full" />
          </div>
        </div>
      </div>
      <div className="mt-3 px-6">
        <div className="bg-green-100 rounded-[8px] p-4">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <p className="py-0.5 px-3 rounded-full text-[14px] bg-green-200 text-green-700">
                Our Impact
              </p>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">
              Trusted by Schools,{" "}
              <span className="text-green-600">Loved by Users</span>
            </h1>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="bg-white rounded-[8px] w-[280px] flex items-center justify-center gap-3 py-2 px-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-200 text-green-600 rounded-full">
                  <IoPeople size={22} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{studentData.length}</h1>
                <p className="text-[14px] text-gray-500">Students</p>
              </div>
            </div>
            <div className="bg-white rounded-[8px] w-[280px] flex items-center justify-center gap-3 py-2 px-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-200 text-blue-600 rounded-full">
                  <IoIosPerson size={22} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{teacherData.length}</h1>
                <p className="text-[14px] text-gray-500">Teachers</p>
              </div>
            </div>
            <div className="bg-white rounded-[8px] w-[280px] flex items-center justify-center gap-3 py-2 px-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-200 text-purple-600 rounded-full">
                  <SiGoogleclassroom size={22} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">85</h1>
                <p className="text-[14px] text-gray-500">Classes</p>
              </div>
            </div>
            <div className="bg-white rounded-[8px] w-[280px] flex items-center justify-center gap-3 py-2 px-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-200 text-blue-600 rounded-full">
                  <IoShieldCheckmarkSharp size={22} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold">99.99%</h1>
                <p className="text-[14px] text-gray-500">System Uptime</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KeyFeatures;
