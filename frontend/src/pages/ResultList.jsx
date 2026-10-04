import React, { useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";
import { BiSolidReport } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { VscPassFilled } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { LuSearch } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";

function ResultList() {
  const { resultData } = useSelector((state) => state.result);
  const results = Array.isArray(resultData) ? resultData : [];

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

  const [examType, setExamType] = useState("");
  const examTypeName = [
    "Class Test",
    "Weekly Exam",
    "Monthly Exam",
    "Quiz",
    "Half-Yearly Exam",
    "Annual Exam",
    "Pre-Test Exam",
    "Test Exam",
    "Mid-Term Exam",
    "Final Exam",
    "Practical Exam",
    "Viva Exam",
  ];

  const [academic, setAcademicYear] = useState("");

  const navigate = useNavigate();

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BiSolidReport size={40} className="text-green-700" />
              <div>
                <h1 className="text-2xl font-bold">Result List</h1>
                <p>
                  View and manage all student results. You can filter, search
                  and check datailed information.
                </p>
              </div>
            </div>

            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
              onClick={() => navigate("/result/add-result")}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <FaPlus /> Add New Result
              </span>
              <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>

          {/* category */}
          <div className="flex items-center justify-between gap-3 mt-4">
            {/* total students */}
            <div className="flex h-30 w-full items-center justify-center gap-3 bg-white rounded-[8px] shadow py-2 px-3">
              <div className="flex items-center justify-center p-2 bg-purple-100 rounded-full text-purple-600">
                <BsFillPeopleFill size={30} />
              </div>

              <div className="flex flex-col gap-1">
                <p>Total Results</p>
                <h3 className="text-xl font-bold">254</h3>
                <p className="flex items-center gap-2 text-xs text-green-500">
                  <FaArrowUp /> 12% this year
                </p>
              </div>
            </div>

            {/* pass */}
            <div className="flex h-30 w-full items-center justify-center gap-3 bg-white rounded-[8px] shadow py-2 px-3">
              <div className="flex items-center justify-center text-green-600 p-2 bg-green-100 rounded-full">
                <VscPassFilled size={30} />
              </div>

              <div className="flex flex-col gap-1">
                <p>Pass</p>
                <h3 className="text-xl font-bold">212</h3>
                <p className="flex items-center gap-2 text-xs text-green-500">
                  <FaArrowUp /> 14% this year
                </p>
              </div>
            </div>

            {/* fail */}
            <div className="flex h-30 w-full items-center justify-center gap-3 bg-white rounded-[8px] shadow py-2 px-3">
              <div className="flex items-center justify-center p-3 bg-red-100 rounded-full text-red-600">
                <ImCross size={24} />
              </div>

              <div className="flex flex-col gap-1">
                <p>Fail</p>
                <h3 className="text-xl font-bold">33</h3>
                <p className="flex items-center gap-2 text-xs text-red-500">
                  <FaArrowDown /> 5% this year
                </p>
              </div>
            </div>

            {/* total students */}
            <div className="flex h-30 w-full items-center justify-center gap-3 bg-white rounded-[8px] shadow py-2 px-3">
              <div className="flex items-center justify-center p-2 bg-blue-100 rounded-full text-blue-600">
                <BsFillPeopleFill size={30} />
              </div>

              <div className="flex flex-col gap-1">
                <p>Total Results</p>
                <h3 className="text-xl font-bold">254</h3>
                <p className="flex items-center gap-2 text-xs text-green-500">
                  <FaArrowUp /> 2 new this year
                </p>
              </div>
            </div>
          </div>

          {/* select, search and button */}
          <div className="flex items-center justify-between bg-white rounded-[8px] shadow p-2 mt-3">
            {/* class */}
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                Class <span className="text-red-500">*</span>
              </label>

              <select
                value={selectClass}
                onChange={(e) => setSelectClass(e.target.value)}
                className=" border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option>Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* section */}
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                Section <span className="text-red-500">*</span>
              </label>

              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className=" border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option>Select Section</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* exam type */}
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                Exam Type <span className="text-red-500">*</span>
              </label>

              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className=" border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option>Exam Type</option>
                {examTypeName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* Academic year */}
            <div className="flex flex-col gap-1">
              <label htmlFor="">
                Academic Year <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                value={academic}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2025-2026"
                className=" border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border w-45 border-gray-300 rounded-lg px-2 py-1 ">
              <div>
                <LuSearch />
              </div>
              <input
                type="text"
                value={academic}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="Name, ID and roll..."
                className=" outline-none"
              />
            </div>

            {/* search button */}
            <button className="flex items-center gap-2 px-2 py-1 bg-green-600 rounded-[8px] text-white hover:bg-green-700 transition-all cursor-pointer">
              <LuSearch />
              Search
            </button>
            <button className="flex items-center gap-2 px-2 py-1 border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-blue-600  transition-all cursor-pointer rounded-[8px]">
              <RiResetLeftFill />
              Reset
            </button>
          </div>

          {/* student list */}
          <div className="mt-3 w-full overflow-auto max-h-[400px]">
            <table className="w-full min-w-[700px]">
              {/* table head */}
              <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                  <th className="text-left py-3 px-2 text-xs">#</th>
                  <th className="text-left py-3 px-2 text-xs">Student Info</th>
                  <th className="text-left py-3 px-2 text-xs">Class</th>
                  <th className="text-left py-3 px-2 text-xs">Section</th>
                  <th className="text-left py-3 px-2 text-xs">Exam Type</th>
                  <th className="text-left py-3 px-2 text-xs">Academic Year</th>
                  <th className="text-left py-3 px-2 text-xs">Total Marks</th>
                  <th className="text-left py-3 px-2 text-xs">
                    Obtained Marks
                  </th>
                  <th className="text-left py-3 px-2 text-xs">Percentage</th>
                  <th className="text-left py-3 px-2 text-xs">Grade</th>
                  <th className="text-left py-3 px-2 text-xs">GPA</th>
                  <th className="text-left py-3 px-2 text-xs">Status</th>
                  <th className="text-left py-3 px-2 text-xs">Action</th>
                </tr>
              </thead>

              {/* table body */}
              <tbody>
                {results.map((result, index) => (
                  <tr
                    key={result._id}
                    className="bg-white border border-gray-200 font-semibold"
                  >
                    <td className="py-3 px-2 text-[14px]">{index + 1}</td>
                    <td className="flex items-center gap-2 py-3 px-2 text-[14px]">
                      <div>
                        {result?.student?.image ? (
                          <img
                            src={result.student?.image}
                            alt={result.student?.fullName}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <span className="h-10 w-10 rounded-full text-white bg-purple-700 flex items-center justify-center">
                            {result.student?.fullName.slice(0, 1).toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="capitalize">
                          {result.student?.fullName}
                        </h4>
                        <p className="text-xs">
                          Roll No. {result.student?.rollNumber}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-xs">
                      {result.student?.className}
                    </td>
                    <td className="py-3 px-2 text-xs">
                      {result.student?.section}
                    </td>
                    <td className="py-3 px-2 text-xs">{result.examType}</td>
                    <td className="py-3 px-2 text-xs">{result.academicYear}</td>
                    <td className="py-3 px-2 text-xs">{result.totalMarks}</td>
                    <td className="py-3 px-2 text-xs">
                      {result.totalObtainedMarks}
                    </td>
                    <td className="py-3 px-2 text-xs">{result.averageMark}%</td>
                    <td className="py-3 px-2 text-xs">
                      <p
                        className={`py-1 px-2 text-xs text-center ${["A+", "A", "A-"].includes(result.grade) ? "text-green-700 bg-green-100 rounded-[8px]" : ["B", "C", "D"].includes(result.grade) ? "text-orange-900 bg-orange-100 rounded-[8px]" : result.grade === "F" ? "text-red-600 bg-red-100 rounded-[8px]" : ""}`}
                      >
                        {result.grade}
                      </p>
                    </td>
                    <td className="py-3 px-2 text-xs">{result.gpa}</td>
                    <td className="py-3 px-2 text-xs">
                      <p
                      className={`py-1 px-2 text-xs text-center ${result.resultStatus === "Pass" ? "bg-green-100 text-green-700 rounded-[8px]" : result.resultStatus === "Fail" ? "bg-red-100 text-red-600 rounded-[8px]" : ""}`}
                      >
                      {result.resultStatus}
                      </p>
                      </td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultList;
