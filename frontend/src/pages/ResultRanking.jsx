import React, { useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import trophy from "../assets/trophy.PNG";
import { useSelector } from "react-redux";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaStar, FaTrophy, FaPercentage } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";

function ResultRanking() {
  const { studentData } = useSelector((state) => state.student);
  const { resultData } = useSelector((state) => state.result);

  // Filter states
  const [selectClass, setSelectClass] = useState("");
  const [section, setSection] = useState("");
  const [examType, setExamType] = useState("");
  const [academic, setAcademicYear] = useState("");
  const [search, setSearch] = useState("");

  // Filter options
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

  const sectionName = ["A", "B", "C"];

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

  // Academic years dynamically from Result Data
  const academicYears = [
    ...new Set(
      (Array.isArray(resultData) ? resultData : [])
        .map((item) => item.academicYear)
        .filter(Boolean),
    ),
  ]
    .sort()
    .reverse();

  // Filter Results
  const results = (Array.isArray(resultData) ? resultData : []).filter(
    (result) => {
      const matchClass = selectClass
        ? result.student?.className === selectClass
        : true;

      const matchSection = section ? result.student?.section === section : true;

      const matchExamType = examType ? result.examType === examType : true;

      const matchAcademicYear = academic
        ? result.academicYear === academic
        : true;

      const searchValue = search.toLowerCase();

      const matchSearch =
        result.student?.fullName?.toLowerCase().includes(searchValue) ||
        result.student?.studentId
          ?.toString()
          .toLowerCase()
          .includes(searchValue) ||
        result.student?.rollNumber
          ?.toString()
          .toLowerCase()
          .includes(searchValue);

      return (
        matchClass &&
        matchSection &&
        matchExamType &&
        matchAcademicYear &&
        matchSearch
      );
    },
  );

  // Total Students in filtered results
  const totalStudents = new Set(
    results.map((item) => item.student?._id).filter(Boolean),
  ).size;

  // Top GPA
  const topGPA = results.length
    ? Math.max(...results.map((item) => Number(item.gpa) || 0))
    : 0;

  // Top Class Calculation
  const classPerformance = Object.values(
    results.reduce((acc, item) => {
      const className = item.student?.className;

      if (!className) return acc;

      if (!acc[className]) {
        acc[className] = {
          className,
          totalGPA: 0,
          totalStudents: 0,
        };
      }

      acc[className].totalGPA += Number(item.gpa) || 0;
      acc[className].totalStudents += 1;

      return acc;
    }, {}),
  ).map((item) => ({
    ...item,
    averageGPA: item.totalGPA / item.totalStudents,
  }));

  const topClass = [...classPerformance].sort(
    (a, b) => b.averageGPA - a.averageGPA,
  )[0];

  // Overall Pass Rate
  const passCount = results.filter(
    (item) => item.resultStatus === "Pass",
  ).length;

  const overallRate = results.length ? (passCount / results.length) * 100 : 0;

  // Reset Filters
  const handleReset = () => {
    setSelectClass("");
    setSection("");
    setExamType("");
    setAcademicYear("");
    setSearch("");
  };

  // Get unique students and their highest GPA
  const uniqueStudentResults = Object.values(
    results.reduce((acc, result) => {
      const student = result.student;
      const key = student?._id || student?.studentId;

      if (!key) return acc;

      if (!acc[key] || Number(result.gpa) > Number(acc[key].gpa)) {
        acc[key] = result;
      }

      return acc;
    }, {}),
  );

  // Sort by GPA and get Top 3
  const topThree = [...uniqueStudentResults]
    .sort((a, b) => Number(b.gpa) - Number(a.gpa))
    .slice(0, 3);

  const rankingDisplay = [
    { result: topThree[1], position: 2 },
    { result: topThree[0], position: 1 },
    { result: topThree[2], position: 3 },
  ];

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Menu />

      <div className="w-full">
        <AdminHeader />

        <div className="p-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <img src={trophy} alt="trophy" className="w-24" />

            <div>
              <h1 className="text-3xl font-bold text-green-900">Ranking</h1>
              <p className="text-gray-500">
                Top performing students, classes and more.
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-4">
            {/* Total Students */}
            <div className="flex h-30 items-center justify-center gap-3 bg-white rounded-lg shadow p-3">
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <BsFillPeopleFill size={28} />
              </div>

              <div>
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{totalStudents}</h3>
              </div>
            </div>

            {/* Top GPA */}
            <div className="flex h-30 items-center justify-center gap-3 bg-white rounded-lg shadow p-3">
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <FaStar size={28} />
              </div>

              <div>
                <p className="text-gray-500">Top GPA</p>
                <h3 className="text-2xl font-bold">{topGPA.toFixed(2)}</h3>
              </div>
            </div>

            {/* Top Class */}
            <div className="flex h-30 items-center justify-center gap-3 bg-white rounded-lg shadow p-3">
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <FaTrophy size={28} />
              </div>

              <div>
                <p className="text-gray-500">Top Class</p>

                <h3 className="text-2xl font-bold">
                  {topClass?.className || "N/A"}
                </h3>

                <p className="text-xs text-gray-400">
                  Average GPA:{" "}
                  {topClass ? topClass.averageGPA.toFixed(2) : "0.00"}
                </p>
              </div>
            </div>

            {/* Overall Rate */}
            <div className="flex h-30 items-center justify-center gap-3 bg-white rounded-lg shadow p-3">
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <FaPercentage size={28} />
              </div>

              <div>
                <p className="text-gray-500">Overall Pass Rate</p>
                <h3 className="text-2xl font-bold">
                  {overallRate.toFixed(2)}%
                </h3>

                <p className="text-xs text-gray-400">
                  {passCount} Students Passed
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-end gap-3 bg-white rounded-lg shadow p-3 mt-4">
            {/* Class */}
            <div className="flex flex-col gap-1">
              <label>Class</label>
              <select
                value={selectClass}
                onChange={(e) => setSelectClass(e.target.value)}
                className="border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option value="">All Classes</option>
                {className.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div className="flex flex-col gap-1">
              <label>Section</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option value="">All Sections</option>
                {sectionName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Type */}
            <div className="flex flex-col gap-1">
              <label>Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option value="">All Exams</option>
                {examTypeName.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* Academic Year */}
            <div className="flex flex-col gap-1">
              <label>Academic Year</label>
              <select
                value={academic}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="border w-40 border-gray-300 rounded-lg px-2 py-1 outline-none"
              >
                <option value="">All Years</option>
                {academicYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1">
              <LuSearch />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, ID and roll..."
                className="outline-none w-40"
              />
            </div>

            {/* Reset */}
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-2 py-1 border border-gray-300 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all cursor-pointer"
            >
              <RiResetLeftFill />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultRanking;
