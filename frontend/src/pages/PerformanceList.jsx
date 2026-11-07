import React, { useState } from "react";
import { GrDocumentPerformance } from "react-icons/gr";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux";
import { IoPeopleSharp, IoPerson, IoSearchOutline } from "react-icons/io5";
import {
  FaBookOpen,
  FaRegEye,
  FaRegStar,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import { IoMdArrowUp, IoMdArrowDown } from "react-icons/io";
import {
  MdDeleteForever,
  MdEventAvailable,
  MdOutlineModeEdit,
} from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { serverURL } from "../App";
import { setPerformanceData } from "../redux/performanceSlice";
import { AiFillHome } from "react-icons/ai";
import { ChartNoAxesColumnIncreasing, Info, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [deletePerformance, setDeletePerformance] = useState(null);
  const [viewPerformance, setViewPerformance] = useState(null);
  const [showViewModel, setShowViewModel] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performances = Array.isArray(performanceData?.performances)
    ? performanceData.performances
    : [];

  const displayPerformance = isFiltered
    ? filteredPerformance
    : performances.filter(
        (performance) =>
          new Date(performance.date).toLocaleDateString("en-CA") ===
          new Date().toLocaleDateString("en-CA"),
      );

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

  const handleFilter = () => {
    let filtered = Array.isArray(performanceData?.performances)
      ? [...performanceData.performances]
      : [];

    if (input.trim()) {
      filtered = filtered.filter(
        (performance) =>
          performance.student?.fullName
            ?.toLowerCase()
            .includes(input.toLowerCase()) ||
          performance.student?.studentId
            ?.toLowerCase()
            .includes(input.toLowerCase()) ||
          String(performance.student?.rollNumber || "")
            .toLowerCase()
            .includes(input.toLowerCase()),
      );
    }

    if (date) {
      filtered = filtered.filter(
        (performance) =>
          new Date(performance.date).toLocaleDateString("en-CA") === date,
      );
    }

    if (selectClass) {
      filtered = filtered.filter(
        (performance) => performance.student?.className === selectClass,
      );
    }

    if (section) {
      filtered = filtered.filter(
        (performance) => performance.student?.section === section,
      );
    }

    if (subject) {
      filtered = filtered.filter(
        (performance) => performance.subject === subject,
      );
    }

    setFilteredPerformance(filtered);
    setIsFiltered(true);
  };

  const handleReset = () => {
    setDate(new Date().toLocaleDateString("en-CA"));
    setSelectClass("");
    setSection("");
    setInput("");
    setSubject("");
    setFilteredPerformance([]);
    setIsFiltered(false);
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        return;
      }

      await axios.delete(
        `${serverURL}/api/performance/delete-performance/${id}`,
        { withCredentials: true },
      );

      const result = await axios.get(
        `${serverURL}/api/performance/get-all-performance`,
        { withCredentials: true },
      );

      dispatch(setPerformanceData(result.data));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };
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
                  <option>Select Section</option>
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
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={handleFilter}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    Filter
                  </span>
                  <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>

                {/* reset */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                  onClick={handleReset}
                >
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
                                <h1 className="text-[14px] font-semibold capitalize">
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
                              <button
                                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                                onClick={() => {
                                  setViewPerformance(performance);
                                  setShowViewModel(true);
                                }}
                              >
                                <FaRegEye size={18} />
                              </button>

                              <button
                                className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white"
                                onClick={() =>
                                  navigate(
                                    `/admin-dashboard/performances/edit-performance/${performance._id}`,
                                  )
                                }
                              >
                                <MdOutlineModeEdit size={18} />
                              </button>

                              <button
                                className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white"
                                onClick={() => {
                                  setDeletePerformance(performance);
                                  setShowDeleteModel(true);
                                }}
                              >
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

              {/* view performance */}
              {viewPerformance && showViewModel && (
                <div className="fixed bg-black/40 flex items-center justify-center inset-0 z-110">
                  <div className="p-3 bg-white rounded-[8px] shadow  max-w-[90%]">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3 text-[18px] font-semibold">
                        <FaRegEye className="text-blue-700" />
                        <h2>View Performance Details</h2>
                      </div>
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setShowViewModel(false);
                        }}
                      >
                        <RxCross2 />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-5">
                        <div>
                          {viewPerformance.student?.image ? (
                            <img
                              src={viewPerformance.student?.image}
                              alt={viewPerformance.student?.fullName}
                              className="h-15 w-15 rounded-full object-cover"
                            />
                          ) : (
                            <p className="h-15 w-15 rounded-full flex items-center justify-center text-white bg-purple-700 font-bold">
                              {viewPerformance.student?.fullName
                                .slice(0, 1)
                                .toUpperCase()}
                            </p>
                          )}
                        </div>

                        <div>
                          <h1 className="font-bold capitalize">
                            {viewPerformance.student?.fullName}
                          </h1>
                          <div className="text-[14px] text-gray-500">
                            <p>ID: {viewPerformance.student?.studentId}</p>
                            <p>Subject: {viewPerformance?.subject}</p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-0.5 bg-blue-100 text-blue-900 font-semibold rounded-full">
                        <p>
                          {new Date(viewPerformance.date).toLocaleDateString(
                            "en-CA",
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4">
                      {/* class work */}
                      <div className="bg-blue-50 h-[100px] w-[130px] rounded-[8px] flex items-center justify-center text-center">
                        <div>
                          <div className="bg-blue-100 text-blue-600 rounded-full h-8 w-8 flex items-center justify-center mx-auto">
                            <FaBookOpen size={20} />
                          </div>
                          <p className="font-semibold">Classwork</p>
                          <p className="font-semibold">
                            {viewPerformance?.classwork}/10
                          </p>
                        </div>
                      </div>
                      {/* home work */}
                      <div className="bg-green-50 h-[100px] w-[130px] rounded-[8px] flex items-center justify-center text-center">
                        <div>
                          <div className="bg-green-100 text-green-600 rounded-full h-8 w-8 flex items-center justify-center mx-auto">
                            <AiFillHome size={20} />
                          </div>
                          <p className="font-semibold">Homework</p>
                          <p className="font-semibold">
                            {viewPerformance?.homework}/10
                          </p>
                        </div>
                      </div>
                      {/* participation */}
                      <div className="bg-orange-50 h-[100px] w-[130px] rounded-[8px] flex items-center justify-center text-center">
                        <div>
                          <div className="bg-orange-100 text-orange-600 rounded-full h-8 w-8 flex items-center justify-center mx-auto">
                            <IoPeopleSharp size={20} />
                          </div>
                          <p className="font-semibold">participation</p>
                          <p className="font-semibold">
                            {viewPerformance?.participation}/10
                          </p>
                        </div>
                      </div>
                      {/* behavior */}
                      <div className="bg-purple-50 h-[100px] w-[130px] rounded-[8px] flex items-center justify-center text-center">
                        <div>
                          <div className="bg-purple-100 text-purple-600 rounded-full h-8 w-8 flex items-center justify-center mx-auto">
                            <FaStar size={20} />
                          </div>
                          <p className="font-semibold">Behavior</p>
                          <p className="font-semibold">
                            {viewPerformance?.behavior}/10
                          </p>
                        </div>
                      </div>
                      {/* Learning */}
                      <div className="bg-yellow-50 h-[100px] w-[130px] rounded-[8px] flex items-center justify-center text-center">
                        <div>
                          <div className="bg-yellow-100 text-yellow-600 rounded-full h-8 w-8 flex items-center justify-center mx-auto">
                            <FaBookOpen size={20} />
                          </div>
                          <p className="font-semibold">Learning</p>
                          <p className="font-semibold">
                            {viewPerformance?.learning}/10
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      {/* Header */}
                      <div className="flex items-center gap-2 mb-5">
                        <ChartNoAxesColumnIncreasing
                          className="text-blue-600"
                          size={22}
                        />
                        <h3 className="text-lg font-bold text-blue-950">
                          Overall Performance
                        </h3>
                      </div>

                      {/* Performance */}
                      <div className="flex items-center gap-5 px-5">
                        {/* Circular Progress */}
                        <div className="relative w-28 h-28">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="56"
                              cy="56"
                              r="48"
                              stroke="#E5E7EB"
                              strokeWidth="10"
                              fill="none"
                            />

                            <circle
                              cx="56"
                              cy="56"
                              r="48"
                              stroke="#16A34A"
                              strokeWidth="10"
                              fill="none"
                              strokeDasharray="301.59"
                              strokeDashoffset="48.25"
                              strokeLinecap="round"
                            />
                          </svg>

                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-2xl font-bold text-blue-950">
                              {viewPerformance?.overallPercentage}%
                            </span>
                          </div>
                        </div>

                        {/* Grade */}
                        <div className="flex-1">
                          <div className="inline-flex items-center gap-2 rounded-full font-semibold">
                            {viewPerformance?.overallPercentage >= 80 ? (
                              <div className="flex items-center gap-2 bg-green-100 text-green-500 px-4 py-1 rounded-full font-semibold ">
                                <FaStar /> <p>Excellent</p>
                              </div>
                            ) : viewPerformance?.overallPercentage >= 60 ? (
                              <div className="flex items-center gap-2 bg-blue-100 text-blue-500 px-4 py-1 rounded-full font-semibold ">
                                <FaStar /> <p>Good</p>
                              </div>
                            ) : viewPerformance?.overallPercentage >= 40 ? (
                              <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1 rounded-full font-semibold">
                                <FaStar /> <p>Average</p>
                              </div>
                            ) : (
                              <p className="flex items-center gap-2 bg-red-100 text-red-500 px-4 py-1 rounded-full font-semibold ">
                                Needs Improvement
                              </p>
                            )}
                          </div>

                          <p className="text-gray-500 mt-3 text-sm">
                            A great performance! Keep it up.
                          </p>
                        </div>
                      </div>

                      {/* Remarks */}
                      <div className="mt-3 p-4 rounded-xl bg-blue-50">
                        <div className="flex items-center gap-2 mb-1">
                          <Info size={18} className="text-blue-600" />
                          <h4 className="font-semibold text-blue-950">
                            Remarks
                          </h4>
                        </div>

                        <p className="text-sm text-blue-950">
                          {viewPerformance?.teacherComment}.
                        </p>
                      </div>

                      <div className="mt-3 flex justify-end">
                        <button
                          className="px-5 py-0.5 text-white bg-blue-950 hover:bg-blue-700 transition-all rounded-[8px] text-center"
                          onClick={() => setShowViewModel(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* delete popup */}
              {deletePerformance && showDeleteModel && (
                <>
                  <div className="fixed bg-black/40 flex items-center justify-center inset-0 z-110">
                    <div className="p-3 bg-white rounded-[8px] shadow w-[440px] max-w-[90%]">
                      <div className="flex justify-end">
                        <button
                          className="cursor-pointer"
                          onClick={() => {
                            setShowDeleteModel(false);
                          }}
                        >
                          <RxCross2 />
                        </button>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="text-center flex flex-col gap-2">
                          <div className="flex items-center justify-center">
                            <MdDeleteForever
                              size={80}
                              className="text-red-500"
                            />
                          </div>
                          <h1 className="text-3xl font-bold">Are you sure?</h1>
                          <div>
                            <p>
                              Do you really want to delete the performance
                              records
                            </p>
                            <p>
                              for{" "}
                              <span className="capitalize font-semibold">
                                {deletePerformance.student?.fullName}
                              </span>{" "}
                              <span className="capitalize font-semibold">
                                ({deletePerformance.student?.className})?
                              </span>
                            </p>
                            <p>This action cannot be undone.</p>
                          </div>
                          <div className="flex items-center justify-center gap-3 mt-6">
                            {/* cancel button */}
                            <button
                              onClick={() => {
                                setShowDeleteModel(false);
                              }}
                              className="flex items-center justify-center gap-2 px-5 py-1 border border-gray-300 hover:bg-gray-300 transition-all rounded-lg cursor-pointer w-50"
                            >
                              Cancel
                            </button>

                            {/* delete button */}
                            <button
                              onClick={async () => {
                                if (!deletePerformance?._id) {
                                  console.error("Result ID is missing!");
                                  return;
                                }

                                await handleDelete(deletePerformance._id);

                                setShowDeleteModel(false);
                                setDeletePerformance(null);
                              }}
                              className="flex items-center justify-center gap-2 px-5 py-1 border border-red-500 bg-red-500 hover:bg-red-700 transition-all text-white rounded-lg cursor-pointer  w-50"
                            >
                              <RiDeleteBin6Line /> Delete Student
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceList;
