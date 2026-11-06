import React, { useState } from "react";
import { GrDocumentPerformance } from "react-icons/gr";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { useSelector } from "react-redux";
import { IoPerson, IoSearchOutline } from "react-icons/io5";
import {
  FaRegEye,
  FaRegStar,
  FaSearch,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import { MdEventAvailable, MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

function PerformanceList() {
  const { performanceData } = useSelector((state) => state.performance);
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));
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
  const [input, setInput] = useState("");
  const [subject, setSubject] = useState("");
  const subjectName = [
    "Mathematics",
    "English",
    "Bangla",
    "Science",
    "ICT",
    "Social Science",
  ];
  const [filteredPerformance, setFilteredPerformance] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const displayPerformance = isFiltered
    ? filteredPerformance
    : performanceData?.performances || [];

  console.log(displayPerformance?.[0]?.student);

  const performances = Array.isArray(performanceData?.performances)
    ? performanceData.performances
    : [];

  const now = new Date();

  const totalAverage =
    performances.length > 0
      ? performances.reduce(
          (total, performance) =>
            total + (Number(performance?.overallPercentage) || 0),
          0,
        ) / performances.length
      : 0;

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  // Current Month Data
  const currentMonthData = performances.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getMonth() === currentMonth && date.getFullYear() === currentYear
    );
  });

  // Previous Month Data
  const previousMonthData = performances.filter((item) => {
    const date = new Date(item.createdAt);

    return (
      date.getMonth() === previousMonth && date.getFullYear() === previousYear
    );
  });

  // Average Calculation
  const getAverage = (data) => {
    if (!data.length) return 0;

    return (
      data.reduce(
        (total, item) => total + (Number(item.overallPercentage) || 0),
        0,
      ) / data.length
    );
  };

  const currentAverage = getAverage(currentMonthData);
  const previousAverage = getAverage(previousMonthData);

  // Percentage Change
  const percentageChange =
    previousAverage > 0
      ? ((currentAverage - previousAverage) / previousAverage) * 100
      : 0;

  const excellent = performances.filter((performance) => {
    return performance.overallPercentage >= 80;
  }).length;

  const todayRecords = performances.filter((performance) => {
    return (
      new Date(performance?.date).toLocaleDateString("en-CA") ===
      now.toLocaleDateString("en-CA")
    );
  }).length;

  // Monthly Percentage Change
  const monthlyChange = percentageChange;

  // Yesterday Records
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const yesterdayRecords = performances.filter((performance) => {
    return (
      new Date(performance?.date).toLocaleDateString("en-CA") ===
      yesterday.toLocaleDateString("en-CA")
    );
  }).length;

  // Today Percentage Change
  const todayChange =
    yesterdayRecords > 0
      ? ((todayRecords - yesterdayRecords) / yesterdayRecords) * 100
      : 0;

  return (
    <div className="flex bg-blue-50">
      <Menu />

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />

        <div className="p-2">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GrDocumentPerformance size={40} className="text-green-700" />
              <div>
                <h1 className="text-2xl font-bold">Performance List</h1>
                <p>
                  Track the student's daily learning and classroom activities.
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 py-4">
            <div className="grid grid-cols-4 gap-4">
              {/* total Records */}

              <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <IoPerson size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Records</p>
                  <h1 className="font-bold text-2xl">
                    {performanceData?.performances?.length || 0}
                  </h1>
                  <p className="text-xs text-gray-400">Registered students</p>
                </div>
              </div>

              {/* Average performance */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <FaTrophy size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Average Performance</p>
                  <h1 className="font-bold text-2xl">
                    {totalAverage.toFixed(2) + "%"}
                  </h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      percentageChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentageChange >= 0 ? (
                      <IoMdArrowUp />
                    ) : (
                      <IoMdArrowDown />
                    )}

                    {previousAverage > 0
                      ? `${Math.abs(percentageChange).toFixed(1)}% ${
                          percentageChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p>
                </div>
              </div>

              {/* Excellent students */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-purple-200 rounded-xl p-2">
                  <FaRegStar size={25} className="text-purple-700" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Excellent Students</p>
                  <h1 className="font-bold text-2xl">{excellent}</h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      monthlyChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {monthlyChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}

                    {previousAverage > 0
                      ? `${Math.abs(monthlyChange).toFixed(1)}% ${
                          monthlyChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p>
                </div>
              </div>

              {/* today's records */}
              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <MdEventAvailable size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Today's Records</p>
                  <h1 className="font-bold text-2xl">{todayRecords}</h1>
                  <p
                    className={`text-xs flex items-center gap-2 ${
                      todayChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {todayChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}

                    {yesterdayRecords > 0
                      ? `${Math.abs(todayChange).toFixed(1)}% ${
                          todayChange >= 0 ? "up" : "down"
                        } Today`
                      : "No yesterday data"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[8px] shadow mt-4 p-2">
            <div className="flex justify-between items-center">
              {/* date */}
              <div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="border border-gray-300 rounded-[8px] w-35 px-2 py-1 outline-none"
                />
              </div>

              {/* select class */}
              <div>
                <select
                  value={selectClass}
                  onChange={(e) => setSelectClass(e.target.value)}
                  className="w-35 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                >
                  <option>Select Class</option>
                  {className.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>

              {/* select section */}
              <div>
                <select
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  className="w-35 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                >
                  <option>Select Class</option>
                  {sectionName.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>

              {/* search */}
              <div className="flex items-center gap-2 border border-gray-300 rounded-[8px] w-50 px-2 py-1">
                <div>
                  <IoSearchOutline />
                </div>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Search by ID or Name"
                  className="w-full outline-none"
                />
              </div>

              {/* subject */}
              <div>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-35 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                >
                  <option>Select Subject</option>
                  {subjectName.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>

              {/* button  */}
              <div className="flex items-center gap-4">
                {/* filter */}
                <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group">
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Filter
                  </span>
                  <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>

                {/* reset */}
                <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group">
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Reset
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>

            <div className="mt-4 w-full overflow-auto max-h-[400px]">
              <table className="w-full min-w-[699px]">
                {/* Table Header */}
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-300 text-gray-600">
                    <th className="text-center py-3 px-2 text-[14px]">#</th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      Student
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      Subject
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      <p> Classwork</p>
                      <p className="text-xs">(Out of 10)</p>
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      <p> Homework</p>
                      <p className="text-xs">(Out of 10)</p>
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      <p> Participation</p>
                      <p className="text-xs">(Out of 10)</p>
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      <p>Behavior</p>
                      <p className="text-xs">(Out of 10)</p>
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      <p>Learning</p>
                      <p className="text-xs">(Out of 10)</p>
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      Overall
                    </th>
                    <th className="text-center py-3 px-2 text-[14px]">Grade</th>
                    <th className="text-center py-3 px-2 text-[14px]">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* performance Data */}
                <tbody>
                  {displayPerformance.length > 0 ? (
                    displayPerformance.map((performance, index) => {
                      const student = performance.student;

                      return (
                        <tr
                          key={performance._id || index}
                          className="border-b border-gray-200 hover:bg-gray-50"
                        >
                          <td className="py-3 px-2">{index + 1}</td>

                          {/* Student */}
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 shrink-0">
                                {student?.image ? (
                                  <img
                                    src={student.image}
                                    alt={student.fullName}
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="bg-purple-800 w-full h-full flex text-white font-semibold justify-center items-center rounded-full">
                                    {student?.fullName
                                      ?.slice(0, 1)
                                      .toUpperCase()}
                                  </div>
                                )}
                              </div>

                              <div>
                                <h1 className="font-semibold capitalize">
                                  {student?.fullName || "N/A"}
                                </h1>
                                <p className="text-xs text-gray-500">
                                  {student?.className || "N/A"}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* subject */}
                          <td className="py-3 px-2 text-[14px]">
                            {performance.subject}
                          </td>

                          {/* Classwork */}
                          <td className="py-3 px-2 text-[14px]">
                            <p className="px-2 py-1 text-center font-semibold bg-blue-100 rounded-full">
                              {performance.classwork}/10
                            </p>
                          </td>

                          {/* Homework */}
                          <td className="py-3 px-2 text-[14px]">
                            <p className="px-2 py-1 text-center font-semibold bg-green-100 rounded-full">
                              {performance.homework}/10
                            </p>
                          </td>

                          {/* Participation */}
                          <td className="py-3 px-2 text-[14px]">
                            <p className="px-2 py-1 text-center font-semibold bg-orange-100 rounded-full">
                              {performance.participation}/10
                            </p>
                          </td>

                          {/* Behavior */}
                          <td className="py-3 px-2 text-[14px]">
                            <p className="px-2 py-1 text-center font-semibold bg-purple-100 rounded-full">
                              {performance.behavior}/10
                            </p>
                          </td>

                          {/* Learning */}
                          <td className="py-3 px-2 text-[14px]">
                            <p className="px-2 py-1 text-center font-semibold bg-yellow-100 rounded-full">
                              {performance.learning}/10
                            </p>
                          </td>

                          {/* Overall */}
                          <td className="py-3 px-2 text-[14px]">
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-xs">
                              {performance.overallPercentage}%
                            </span>
                          </td>
                          {/* grade */}
                          <td className="py-3 px-2 text-[14px]">
                            {performance.overallPercentage >= 80 ? (
                              <div className="flex items-center gap-2 bg-green-100 text-green-500 px-3 py-1 rounded-full font-semibold text-xs">
                                <FaStar /> <p>Excellent</p>
                              </div>
                            ) : performance.overallPercentage >= 60 ? (
                              <div className="flex items-center gap-2 bg-blue-100 text-blue-500 px-2 py-1 rounded-full font-semibold text-xs">
                                <FaStar /> <p>Good</p>
                              </div>
                            ) : performance.overallPercentage >= 40 ? (
                              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold text-xs">
                                <FaStar /> <p>Average</p>
                              </div>
                            ) : (
                              <p className="flex items-center gap-2 bg-red-100 text-red-500 px-3 py-1 rounded-full font-semibold text-xs">
                                Needs Improvement
                              </p>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-2">
                            <div className="flex gap-1">
                              <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white">
                                <FaRegEye size={18} />
                              </button>

                              <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white">
                                <MdOutlineModeEdit size={18} />
                              </button>

                              <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white">
                                <RiDeleteBin6Line size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
                        className="text-center py-10 text-gray-500"
                      >
                        No performance records found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceList;
