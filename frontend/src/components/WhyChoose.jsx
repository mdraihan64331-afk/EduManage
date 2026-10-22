import React from "react";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaTrophy,
  FaUserShield,
} from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { useSelector } from "react-redux";

function WhyChoose() {
  const { studentData } = useSelector((state) => state.student);
  const { teacherData } = useSelector((state) => state.teacher);
  const { attendanceData } = useSelector((state) => state.attendance);
  const { resultData } = useSelector((state) => state.result);
  const now = new Date();

  const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];

  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendanceList.filter((attendance) => {
    const attendanceDate = new Date(attendance.date)
      .toISOString()
      .split("T")[0];

    return attendanceDate === today;
  });

  const totalToday = todayAttendance.length;

  const presentToday = todayAttendance.filter(
    (attendance) => attendance.status === "Present",
  ).length;

  const attendancePercentage =
    totalToday > 0 ? ((presentToday / totalToday) * 100).toFixed(1) : 0;

  const resultThisYear = resultData.filter((result) => {
    const resultDate = new Date(result.createdAt);

    return resultDate.getFullYear() === now.getFullYear();
  });

  const totalResultThisYear = resultThisYear.length;

  const passStudent = resultData.filter(
    (result) => result?.resultStatus === "Pass",
  ).length;

  const resultPercentage =
    totalResultThisYear > 0
      ? ((passStudent / totalResultThisYear) * 100).toFixed(1)
      : 0;
  return (
    <div className="mt-6 px-6">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className="text-center bg-green-100/70 py-1 px-3 rounded-2xl text-green-500 font-semibold text-[12px]">
          Why Choose EduManage?
        </p>
        <h1 className="text-3xl font-bold">
          A Smarter Way to Manage Your School
        </h1>
        <div className="text-[14px] text-gray-500">
          <p>We provide everything you need to simplify school operations,</p>
          <p>improve communication and build a better future for students.</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        {/* easy student management */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-green-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-green-200 text-green-600 rounded-full">
              <IoPeople size={22} />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">Easy Student</h2>
            <h2 className="text-xl font-bold">Management</h2>
          </div>
          <div className="text-[14px] text-gray-500">
            <p>Add, update and manage student</p>
            <p>information with just a few clicks.</p>
          </div>
        </div>
        {/* transparent result */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-blue-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-blue-200 text-blue-600 rounded-full">
              <FaFileAlt size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Transparent Result</h2>
          <div className="text-[14px] text-gray-500">
            <p>Track exam result, grade and </p>
            <p>performance easily and</p>
            <p>accurately.</p>
          </div>
        </div>

        {/* smart Attendance */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-orange-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-orange-200 text-orange-600 rounded-full">
              <FaCalendarAlt size={22} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Smart Attendance</h2>
          <div className="text-[14px] text-gray-500">
            <p>Monitor attendance and</p>
            <p>keep track of student progress</p>
            <p>daily.</p>
          </div>
        </div>
        {/* connect guardians */}
        <div className="relative overflow-hidden py-3 px-8 w-[290px] flex flex-col gap-2 bg-white rounded-[8px] shadow border border-gray-100">
          <div className="absolute -top-0 -right-0 w-15 h-10 rounded-bl-full bg-purple-100/70 pointer-events-none"></div>
          <div className="flex items-center">
            <div className="p-2 bg-purple-200 text-purple-600 rounded-full">
              <FaUserShield size={24} />
            </div>
          </div>
          <h2 className="text-xl font-bold">Connected Guardians</h2>
          <div className="text-[14px] text-gray-500">
            <p>Keep parents and guardians</p>
            <p>informed with real-time updates</p>
            <p>and notifications.</p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="relative overflow-hidden py-6 px-7 flex items-center justify-between bg-[#effcf7] rounded-[8px] shadow border border-blue-100">
          {/* Bottom-left corner design */}
          <div className="absolute -bottom-0 -left-0 w-20 h-8 rounded-tr-full bg-green-100 pointer-events-none"></div>
          {/* total students */}
          <div className="flex w-[250px] gap-3">
            <div className="flex items-center">
              <div className="p-2 bg-green-200 text-green-600 rounded-full">
                <IoPeople size={26} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {Number(studentData.length).toLocaleString("en-BD")}
              </h1>
              <p className="text-[14px] text-gray-500 font-semibold">
                Students
              </p>
              <p className="mt-2 text-xs text-gray-500 font-semibold">
                Learning today, leading tomorrow.
              </p>
            </div>
          </div>

          {/* total teacher */}
          <div className="flex w-[250px] gap-3 border-l border-gray-200 px-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                <IoIosPerson size={26} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {Number(teacherData.length).toLocaleString("en-BD")}
              </h1>
              <p className="text-xs text-gray-500 font-semibold">Teachers</p>
              <p className="mt-2 text-xs text-gray-500 font-semibold">
                Dedicated to student success.
              </p>
            </div>
          </div>

          {/* today attendance */}
          <div className="flex w-[250px] gap-3 border-l border-gray-200 px-4">
            <div className="flex items-center">
              <div className="p-2 bg-orange-200 text-orange-600 rounded-full">
                <FaCalendarAlt size={26} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{attendancePercentage}%</h1>
              <p className="text-xs text-gray-500 font-semibold">
                Today's Attendance
              </p>
              <p className="mt-2 text-xs text-green-600 font-semibold">
                Present
              </p>
            </div>
          </div>

          {/* Success Rate */}
          <div className="flex w-[250px] gap-3 border-l border-gray-200 px-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-200 text-green-600 rounded-full">
                <FaTrophy size={26} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{resultPercentage}%</h1>
              <p className="text-xs text-gray-500 font-semibold">
                Success Rate
              </p>
              <p className="mt-2 text-xs text-gray-500 font-semibold">
                Building brighter futures.
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;
