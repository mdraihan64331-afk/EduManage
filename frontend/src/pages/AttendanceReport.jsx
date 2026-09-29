import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { TbReportAnalytics } from "react-icons/tb";
import { BsPeopleFill } from "react-icons/bs";
import {
  FaArrowUp,
  FaCheckCircle,
  FaClock,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { data } from "react-router-dom";
import { RiResetLeftFill } from "react-icons/ri";
import { TfiReload } from "react-icons/tfi";
import { IoPerson } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";

function AttendanceReport() {
  const [selectClass, setSelectClass] = useState("");
  const className = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const [section, setSection] = useState("");
  const sectionName = ["A", "B", "C"];
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { attendanceData } = useSelector((state) => state.attendance);
  const { studentData } = useSelector((state) => state.student);
  const now = new Date();

  // ============ new this month ==============

  const thisMonthStudentJoined = studentData.filter((student) => {
    const admissionDate = new Date(student.admissionDate);

    return (
      admissionDate.getMonth() === now.getMonth() &&
      admissionDate.getFullYear() === now.getFullYear()
    );
  }).length;

  // ============ present, absent and late =================
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
    (attendance) => attendance?.status === "Present",
  ).length;

  const absentToday = todayAttendance.filter(
    (attendance) => attendance?.status === "Absent",
  ).length;

  const lateToday = todayAttendance.filter(
    (attendance) => attendance?.status === "Late",
  ).length;

  const attendancePresentPercentage =
    totalToday > 0 ? (presentToday / totalToday) * 100 : 0;

  const attendanceAbsentPercentage =
    totalToday > 0 ? (absentToday / totalToday) * 100 : 0;

  const attendanceLatePercentage =
    totalToday > 0 ? (lateToday / totalToday) * 100 : 0;

  // ============ present, absent and late =================

  // ============ total school days =================

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const totalSchoolDays = new Set(
    attendanceList
      .filter((attendance) => {
        const attendanceDate = new Date(attendance.date);

        return (
          attendanceDate.getMonth() === currentMonth &&
          attendanceDate.getFullYear() === currentYear
        );
      })
      .map(
        (attendance) => new Date(attendance.date).toISOString().split("T")[0],
      ),
  ).size;

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          <div className="flex items-center gap-3">
            <TbReportAnalytics size={40} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-semibold">Attendance Management</h1>
              <p>
                Mark and manage student attendance. Track attendance recodes and
                generate reports.
              </p>
            </div>
          </div>

          {/* catagory */}
          <div className="mt-4 flex items-center justify-between">
            {/* total students */}
            <div className="flex items-center gap-3 w-[198px] bg-white rounded-[8px] shadow py-3 px-4">
              <div className="bg-green-100 p-2 rounded-full">
                <BsPeopleFill size={25} className="text-green-700" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[13px]">Total Student</p>
                <h1 className="font-bold text-2xl">{studentData.length}</h1>
                <p className="text-[10px] font-semibold text-green-400 flex items-center gap-1">
                  <FaArrowUp /> +{thisMonthStudentJoined} new this month
                </p>
              </div>
            </div>

            {/* total school days */}
            <div className="flex items-center gap-3 w-[198px] bg-white rounded-[8px] shadow py-3 px-4">
              <div className="bg-blue-100 p-2 rounded-full">
                <FaCalendarDays size={25} className="text-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[13px]">Total School Days</p>
                <h1 className="font-bold text-2xl">{totalSchoolDays}</h1>
                <p className="text-[10px] font-semibold text-gray-600 flex items-center gap-2">
                  <FaPlus className="text-blue-500" /> This Month
                </p>
              </div>
            </div>

            {/* present today */}
            <div className="flex items-center gap-3 w-[198px] bg-white rounded-[8px] shadow py-3 px-4">
              <div className="bg-green-100 p-2 rounded-full">
                <FaCheckCircle size={25} className="text-green-700" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[13px]">Present Today</p>
                <h1 className="font-bold text-2xl">{presentToday}</h1>
                <p className="text-[10px] font-semibold text-green-400 flex items-center gap-1">
                  <FaArrowUp /> {attendancePresentPercentage}%
                </p>
              </div>
            </div>

            {/* absent today */}
            <div className="flex items-center gap-3 w-[198px] bg-white rounded-[8px] shadow py-3 px-4">
              <div className="bg-red-100 p-2 rounded-full">
                <BsPeopleFill size={25} className="text-red-700" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[13px]">Total Student</p>
                <h1 className="font-bold text-2xl">{absentToday}</h1>
                <p className="text-[10px] font-semibold text-red-500 flex items-center gap-1">
                  <FaArrowUp className="rotate-180" />{" "}
                  {attendanceAbsentPercentage}%
                </p>
              </div>
            </div>

            {/* late today */}
            <div className="flex items-center gap-3 w-[198px] bg-white rounded-[8px] shadow py-3 px-4">
              <div className="bg-orange-100 p-2 rounded-full">
                <FaClock size={25} className="text-orange-400" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-[13px]">Late Today</p>
                <h1 className="font-bold text-2xl">{lateToday}</h1>
                <p className="text-[10px] font-semibold text-orange-400 flex items-center gap-1">
                  <FaMinus /> {attendanceLatePercentage}%
                </p>
              </div>
            </div>
          </div>

          {/* select class section and date */}
          <div className="flex items-center justify-between bg-white rounded-[8px] shadow p-2 mt-3">
            {/* class */}
            <div className="flex flex-col gap-2">
              <select
                onChange={(e) => setSelectClass(e.target.value)}
                value={selectClass}
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* section */}
            <div className="flex flex-col gap-2">
              <select
                onChange={(e) => setSection(e.target.value)}
                value={section}
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <input
                type="date"
                value={date}
                readOnly
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              />
            </div>

            {/* load button */}
            <div>
              <div className="flex items-center gap-4">
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  // onClick={handleLoadStudents}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <TfiReload /> Load Students
                  </span>
                  <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
                {/* reset button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                  // onClick={handleLoadReset}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <RiResetLeftFill /> Reset
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </div>

          {/* all student attendance*/}
          <div className="mt-3 bg-white rounded-[8px] shadow p-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BsPeopleFill size={25} className="text-green-700" />
                <h4>Student Attendance ({studentData.length})</h4>
              </div>
              {/* present, absent and late */}
              <div className="flex items-center justify-end gap-5">
                <div className="flex items-center gap-1">
                  <GoDotFill size={20} className="text-green-600" />
                  <p>Present</p>
                </div>
                <div className="flex items-center gap-1">
                  <GoDotFill size={20} className="text-red-600" />
                  <p>Absent</p>
                </div>
                <div className="flex items-center gap-1">
                  <GoDotFill size={20} className="text-orange-400" />
                  <p>Late</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceReport;
