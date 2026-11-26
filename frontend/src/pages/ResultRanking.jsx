import React, { useState } from "react";
import firstPlace from "../assets/firstPlace.PNG";
import secondPlace from "../assets/secondPlace.PNG";
import threePlace from "../assets/threePlace.PNG";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import trophy from "../assets/trophy.PNG";
import { useSelector } from "react-redux";
import { BsDot, BsFillPeopleFill } from "react-icons/bs";
import { FaStar, FaTrophy, FaPercentage } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { RiResetLeftFill } from "react-icons/ri";

function ResultRanking() {  
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

  // Select academic year
  // If no year is selected, use the latest academic year
  const rankingAcademicYear = academic || academicYears[0] || "";

  // Get all exam results of students for the selected academic year
  // Important: Do NOT apply examType filter here
  const rankingResults = (Array.isArray(resultData) ? resultData : []).filter(
    (result) => {
      const matchClass = selectClass
        ? result.student?.className === selectClass
        : true;

      const matchSection = section ? result.student?.section === section : true;

      const matchAcademicYear = rankingAcademicYear
        ? result.academicYear === rankingAcademicYear
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

      return matchClass && matchSection && matchAcademicYear && matchSearch;
    },
  );

  // Calculate average GPA of all exams for each student
  const uniqueStudentResults = Object.values(
    rankingResults.reduce((acc, result) => {
      const student = result.student;
      const key = student?._id || student?.studentId;

      if (!key) return acc;

      const examGPA = Number(result.gpa);

      if (!Number.isFinite(examGPA)) return acc;

      if (!acc[key]) {
        acc[key] = {
          ...result,
          totalGPA: 0,
          totalExams: 0,
        };
      }

      acc[key].totalGPA += examGPA;
      acc[key].totalExams += 1;

      return acc;
    }, {}),
  ).map((student) => ({
    ...student,
    gpa: student.totalExams ? student.totalGPA / student.totalExams : 0,
  }));

  // Sort students by average GPA
  const totalDisplay = [...uniqueStudentResults]
    .filter((student) => student.resultStatus === "Pass")
    .sort((a, b) => b.gpa - a.gpa);

  const totalStudents = uniqueStudentResults.length;

  // Top GPA
  const topGPA = totalDisplay.length
    ? Math.max(...totalDisplay.map((student) => student.gpa))
    : 0;

  const classGPA = Object.values(
    uniqueStudentResults.reduce((acc, student) => {
      const className = student.student?.className;

      if (!className) return acc;

      if (!acc[className]) {
        acc[className] = {
          totalGPA: 0,
          totalStudents: 0,
        };
      }

      acc[className].totalGPA += student.gpa;
      acc[className].totalStudents += 1;

      return acc;
    }, {}),
  ).map((item, index) => ({
    ...item,
    averageGPA: item.totalGPA / item.totalStudents,
    className: Object.keys(
      uniqueStudentResults.reduce((acc, student) => {
        const name = student.student?.className;
        if (name) acc[name] = true;
        return acc;
      }, {}),
    )[index],
  }));

  const topClass = classGPA.sort((a, b) => b.averageGPA - a.averageGPA)[0];

  const overallRate = totalStudents
    ? (
        (uniqueStudentResults.reduce(
          (total, student) => total + student.gpa,
          0,
        ) /
          totalStudents /
          5) *
        100
      ).toFixed(2)
    : 0;

  const passCount = rankingResults.filter(
    (result) => result.resultStatus === "Pass",
  ).length;

  // Get Top 3 students
  const topThree = totalDisplay.slice(0, 3);

  // Display order: 2nd, 1st, 3rd
  const rankingDisplay = [
    { result: topThree[1], position: 2 },
    { result: topThree[0], position: 1 },
    { result: topThree[2], position: 3 },
  ];

  // Handle Reset
  const handleReset = () => {
    setSelectClass("");
    setSection("");
    setExamType("");
    setAcademicYear("");
    setSearch("");
  };

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
                <h3 className="text-2xl font-bold">{overallRate}%</h3>

                <p className="text-xs text-gray-400">
                  {passCount} Students Passed
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-[8px] shadow">
            <div className="flex flex-wrap items-end gap-3 p-3 mt-4">
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

            {/* position */}
            <div className="flex items-end justify-center gap-5 mt-5 ">
              {rankingDisplay.map((result, position) => {
                if (!result) {
                  return null;
                }

                const placeImage =
                  position === 1
                    ? firstPlace
                    : position === 2
                      ? threePlace
                      : secondPlace;

                return (
                  <div
                    key={position}
                    className="flex flex-col items-center relative"
                  >
                    <img
                      src={placeImage}
                      alt={`${placeImage} place`}
                      className={`object-center h-80 ${position === 1 && "h-90"}`}
                    />

                    <div>
                      {result?.result?.student?.image ? (
                        <img
                          src={result?.result?.student?.image}
                          alt={result?.result?.student?.fullName || "Student"}
                          className={`absolute left-1/2 -translate-x-1/2 rounded-full object-cover shadow-md ${
                            position === 1
                              ? "h-[144px] w-[145px] top-[15.6%]"
                              : "h-[126px] w-[127px] top-[15.4%]"
                          }`}
                        />
                      ) : (
                        <div
                          className={`absolute left-1/2 -translate-x-1/2  rounded-full flex items-center justify-center bg-purple-700 text-white font-bold shadow-md ${
                            position === 1
                              ? "h-[144px] w-[145px] text-3xl top-[15.6%]"
                              : position === 2
                                ? "h-[120px] w-[123px] text-3xl top-[17%]"
                                : "h-[126px] w-[127px] text-3xl top-[15.4%]"
                          }`}
                        >
                          {result?.result?.student?.fullName
                            .slice(0, 1)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div
                      className={`absolute flex items-center justify-center w-[176px] left-1/2 -translate-x-1/2 ${position === 1 ? "top-[55%]" : "top-[54%]"}`}
                    >
                      <div>
                        <h1
                          className={`capitalize font-bold text-xl text-center`}
                        >
                          {result.result?.student?.fullName || "name not found"}
                        </h1>
                        <div className="flex items-center justify-center font-semibold">
                          <p>{result.result?.student?.className}</p>
                          <p>
                            <BsDot />
                          </p>
                          <p>Roll: {result.result?.student?.rollNumber}</p>
                        </div>

                        <div className="flex items-center justify-center">
                          <div className="w-[150px] py-[1px] font-bold text-white text-center bg-green-600 rounded-full">
                            <p>GPA: {result.result?.gpa}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`absolute flex items-center justify-center w-[176px] left-1/2 -translate-x-1/2 ${position === 1 ? "top-[80%]" : "top-[80%]"}`}
                    >
                      <div className="text-xl font-bold">
                        {position === 1 ? (
                          <div>
                            <h1>1st Position</h1>
                          </div>
                        ) : position === 2 ? (
                          <div>
                            <h1>3rd Position</h1>
                          </div>
                        ) : (
                          <div>
                            <h1>2nd Position</h1>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* student rank list */}
            <div className="mt-4 w-full overflow-auto max-h-[400px]">
              <table className="w-full min-w-[699px]">
                {/* Table Header */}
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-300 text-gray-600">
                    <th className="text-left py-3 px-2">#</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Roll</th>
                    <th className="text-left py-3 px-2">Class</th>
                    <th className="text-left py-3 px-2">GPA</th>
                    <th className="text-left py-3 px-2">Percentage</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>

                {/* Student Data */}
                <tbody>
                  {totalDisplay.splice(0, 51).map((result, index) => (
                    <tr
                      key={result._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">{index + 1}</td>

                      <td className="py-3 px-2 font-semibold capitalize">
                        {result.student?.fullName}
                      </td>

                      <td className="py-3 px-2">
                        {result.student?.rollNumber}
                      </td>

                      <td className="py-3 px-2">{result.student?.className}</td>

                      <td className="py-3 px-2">{result.gpa}</td>

                      <td className="py-3 px-2">{result.averageMark}</td>

                      <td className="py-3 px-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultRanking;
