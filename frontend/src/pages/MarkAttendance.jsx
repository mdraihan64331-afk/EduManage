import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { IoCalendarNumber } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";

function MarkAttendance() {
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
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          {/* add attendance */}
          <div className="flex items-center gap-3">
            <IoCalendarNumber size={40} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Add Attendance</h1>
              <p>
                Mark and save student attendance for a specific class and date.
              </p>
            </div>
          </div>

          {/* check to load students of selected class & section */}
          <div className="mt-3 p-3 bg-white rounded-[8px] flex items-center justify-between shadow">
            {/* select class */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Class <span className="text-red-500">*</span>
              </label>
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

            {/* select section */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Seaction <span className="text-red-500">*</span>
              </label>
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
              <label htmlFor="">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                readOnly
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              />
            </div>

            {/* load students */}
            <div>
              <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group">
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <TfiReload /> Load Students
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
              <p className="text-gray-500 text-[13px]">
                Click to load students of selected
              </p>
              <p className="text-gray-500 text-[13px]">class & section.</p>
            </div>
          </div>

          {/*  */}
          <div className=" p-3 mt-3 bg-white rounded-[8px] shadow">
            {/* status */}
            <div className="flex items-center justify-end gap-5">
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-green-600" />
                <p>Present</p>
              </div>
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-red-600" />
                <p>Absent</p>
              </div>
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-orange-400" />
                <p>Late</p>
              </div>
            </div>

            {/* head line */}
            <table className="w-full min-w-[700px] mt-3">
                {/* table head */}
              <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Student Name</th>
                  <th className="text-left py-3 px-2">Roll No</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Remark</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                <tr bg-white border border-gray-200 font-semibold>
                    <td className="py-3 px-2">1</td>
                    <td className="py-3 px-2 flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-full bg-purple-700">R</div>
                        <h1>Raihan Ahmed</h1>
                    </td>
                    <td className="py-3 px-2">01</td>
                    <td className="py-3 px-2">Present</td>
                    <td className="py-3 px-2">Remark</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;
