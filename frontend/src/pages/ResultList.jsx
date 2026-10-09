import React, { useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidReport } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  FaArrowDown,
  FaArrowUp,
  FaClipboardList,
  FaRegCalendarAlt,
  FaRegEye,
  FaTrophy,
} from "react-icons/fa";
import { VscPassFilled } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import { LuScroll, LuSearch } from "react-icons/lu";
import {
  RiArrowLeftLongLine,
  RiDeleteBin6Line,
  RiPrinterLine,
  RiResetLeftFill,
} from "react-icons/ri";
import {
  MdEditDocument,
  MdLocalPhone,
  MdMessage,
  MdOutlineEmail,
  MdOutlineModeEdit,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { BsCalendarDate } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import { TiStarOutline } from "react-icons/ti";
import { IoIosAlert } from "react-icons/io";
import { serverURL } from "../App";
import axios from "axios";
import { setResultData } from "../redux/resultSlice";

function ResultList() {
  const { id } = useParams();
  const { resultData } = useSelector((state) => state.result);
  const { studentData } = useSelector((state) => state.student);

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
  const [search, setSearch] = useState("");
  const [viewResult, setViewResult] = useState(null);
  const [showResultModel, setShowResultModel] = useState(false);
  const [deleteResult, setDeleteResult] = useState(null);
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const [filteredResult, setFilteredResult] = useState([]);
  const displayResult =
    selectClass || section || examType || academic || search
      ? filteredResult
      : resultData;
  const results = Array.isArray(displayResult) ? displayResult : [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passCount = results.filter(
    (pass) => pass.resultStatus === "Pass",
  ).length;

  const failCount = results.filter(
    (fail) => fail.resultStatus === "Fail",
  ).length;

  const studentsWithResult = new Set(
    results.map((result) => result.student?._id),
  );

  const totalExamStudents = studentsWithResult.size;

  const handleSearch = () => {
    const filtered = resultData.filter((result) => {
      const matchClass = selectClass
        ? result.student.className === selectClass
        : true;
      const matchSection = section ? result.student.section === section : true;
      const matchExamType = examType ? result.examType === examType : true;
      const matchAcademicYear = academic
        ? result.academicYear === academic
        : true;

      const matchSearch =
        result.student.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        result.student.studentId?.toString().includes(search) ||
        result.student.rollNumber?.toString().includes(search);

      return (
        matchClass &&
        matchSection &&
        matchExamType &&
        matchAcademicYear &&
        matchSearch
      );
    });
    setFilteredResult(filtered);
  };

  const handleReset = () => {
    setSelectClass("");
    setSection("");
    setExamType("");
    setAcademicYear("");
    setSearch("");
    setFilteredResult("");
  };

  const handleDelete = async (id) => {
    try {
      if (!id) {
        return;
      }

      const response = await axios.delete(
        `${serverURL}/api/result/delete-result/${id}`,
        { withCredentials: true },
      );

      const result = await axios.get(`${serverURL}/api/result/get-result`, {
        withCredentials: true,
      });

      dispatch(setResultData(result.data));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

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
                <h3 className="text-xl font-bold">{totalExamStudents}</h3>
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
                <h3 className="text-xl font-bold">{passCount}</h3>
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
                <h3 className="text-xl font-bold">{failCount}</h3>
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
                <p>Total Students</p>
                <h3 className="text-xl font-bold">{studentData.length}</h3>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Name, ID and roll..."
                className=" outline-none"
              />
            </div>

            {/* search button */}
            <button
              className="flex items-center gap-2 px-2 py-1 bg-green-600 rounded-[8px] text-white hover:bg-green-700 transition-all cursor-pointer"
              onClick={handleSearch}
            >
              <LuSearch />
              Search
            </button>
            <button
              className="flex items-center gap-2 px-2 py-1 border border-gray-300 hover:bg-blue-600 hover:border-blue-600 hover:text-white text-blue-600  transition-all cursor-pointer rounded-[8px]"
              onClick={handleReset}
            >
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
                  <>
                    <tr
                      key={result._id}
                      className="bg-white border border-gray-200 font-semibold"
                    >
                      <td className="py-3 px-2 text-[14px]">{index + 1}</td>
                      <td className="flex items-center gap-2 py-3 px-2 text-xs">
                        <div>
                          {result?.student?.image ? (
                            <img
                              src={result.student?.image}
                              alt={result.student?.fullName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span className="h-10 w-10 rounded-full text-white bg-purple-700 flex items-center justify-center">
                              {result.student?.fullName
                                .slice(0, 1)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="capitalize font-semibold">
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
                      <td className="py-3 px-2 text-xs">
                        {result.academicYear}
                      </td>
                      <td className="py-3 px-2 text-xs">{result.totalMarks}</td>
                      <td className="py-3 px-2 text-xs">
                        {result.totalObtainedMarks}
                      </td>
                      <td className="py-3 px-2 text-xs">
                        {result.averageMark}%
                      </td>
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
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            onClick={() => {
                              setShowResultModel(true);
                              setViewResult(result);
                            }}
                          >
                            <FaRegEye />
                          </button>

                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            onClick={() =>
                              navigate(`/result/edit-result/${result._id}`)
                            }
                          >
                            <MdOutlineModeEdit />
                          </button>
                          <button
                            className="p-2 rounded-[8px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                            onClick={() => {
                              setDeleteResult(result);
                              setShowDeleteModel(true);
                            }}
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
            {/* view result */}
            {viewResult && showResultModel && (
              <>
                <div className="fixed bg-black/40 flex items-center justify-center inset-0 z-110">
                  <div className="bg-blue-50 rounded-[8px] p-3">
                    <div className="flex justify-end">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          setShowResultModel(false);
                        }}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                    <div className="mt-2 flex justify-center gap-3">
                      <div>
                        <div className="bg-white shadow rounded-[8px] p-3 w-[250px]">
                          <div className="flex flex-col items-center">
                            {viewResult.student?.image ? (
                              <img
                                src={viewResult.student?.image}
                                alt=""
                                className="h-20 w-20 object-cover rounded-full"
                              />
                            ) : (
                              <div>
                                <h1 className="text-white h-20 w-20 rounded bg-purple-700 flex items-center justify-center rounded-full text-xl">
                                  {viewResult.student?.fullName
                                    .slice(0, 1)
                                    .toUpperCase()}
                                </h1>
                              </div>
                            )}

                            <h1 className="capitalize font-semibold">
                              {viewResult.student?.fullName}
                            </h1>
                            <p className="text-gray-400 text-xs">
                              Student Id: {viewResult.student?.studentId}
                            </p>
                          </div>

                          <div className="h-[1px] w-full mt-3 bg-gray-300"></div>

                          <div className="mt-3 flex flex-col gap-2">
                            {/* class */}
                            <div className="flex items-center gap-3">
                              <SiGoogleclassroom />
                              <div className="text-gray-500">
                                <p>Class</p>
                                <h5>
                                  {viewResult.student?.className}-
                                  {viewResult.student?.section}
                                </h5>
                              </div>
                            </div>
                            {/* roll */}
                            <div className="flex items-center gap-3">
                              <LuScroll />
                              <div className="text-gray-500">
                                <p>Roll No</p>
                                <h5>{viewResult.student?.rollNumber}</h5>
                              </div>
                            </div>
                            {/* date of birth */}
                            <div className="flex items-center gap-3">
                              <BsCalendarDate />
                              <div className="text-gray-500">
                                <p>Date of Birth</p>
                                <h5>
                                  {new Date(
                                    viewResult.student?.dob,
                                  ).toLocaleDateString()}
                                </h5>
                              </div>
                            </div>
                            {/* phone */}
                            <div className="flex items-center gap-3">
                              <MdLocalPhone />
                              <div className="text-gray-500">
                                <p>Phone</p>
                                <h5>{viewResult.student?.phone}</h5>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <MdOutlineEmail />
                              <div className="text-gray-500">
                                <p>Email</p>
                                <h5>{viewResult.student?.email} </h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          className="relative mt-5 overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 bg-white text-blue-600 rounded-lg cursor-pointer group"
                          onClick={() => {
                            setShowResultModel(false);
                          }}
                        >
                          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            <RiArrowLeftLongLine /> Back to Result List
                          </span>
                          <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                        </button>
                      </div>
                      <div>
                        <div className="bg-white rounded-[8px] shadow p-3">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <div className="p-2 text-blue-800 bg-blue-200 rounded-full">
                                <FaTrophy size={20} />
                              </div>
                              <h2 className="text-xl font-semibold">
                                Result Details
                              </h2>
                            </div>
                            <p
                              className={`py-2 px-4 font-semibold rounded-[8px] ${viewResult.resultStatus === "Pass" ? "bg-green-100 text-green-600" : viewResult.resultStatus === "Fail" ? "bg-red-100 text-red-600" : ""}`}
                            >
                              {viewResult.resultStatus}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* exam type */}
                            <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                              <div className="flex items-center justify-center p-2 bg-purple-200 text-purple-800 rounded-full">
                                <FaClipboardList size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Exam Type
                                </p>
                                <h1>{viewResult.examType}</h1>
                              </div>
                            </div>
                            {/* academic year */}
                            <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                              <div className="flex items-center justify-center p-2 bg-purple-200 text-purple-800 rounded-full">
                                <FaRegCalendarAlt size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Acaemic Year
                                </p>
                                <h1>{viewResult.academicYear}</h1>
                              </div>
                            </div>
                            {/* total mark */}
                            <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                              <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-800 rounded-full">
                                <MdEditDocument size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Total Marks
                                </p>
                                <h1>{viewResult.totalMarks}</h1>
                              </div>
                            </div>
                            {/* obtained marks */}
                            <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                              <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-full">
                                <MdEditDocument size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Obtained Mark
                                </p>
                                <h1>{viewResult.totalObtainedMarks}</h1>
                              </div>
                            </div>
                            {/* percentage */}
                            <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                              <div className="flex items-center justify-center p-2 bg-purple-200 text-purple-800 rounded-full">
                                <FaClipboardList size={20} />
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">
                                  Percentage
                                </p>
                                <h1>{viewResult.averageMark}%</h1>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white mt-3 p-3 rounded-[8px]">
                          <h2 className="font-semibold flex items-center gap-3">
                            <IoBookSharp className="text-blue-600" />{" "}
                            Subject-wise Marks
                          </h2>

                          <div className="mt-3 w-full overflow-auto max-h-[200px]">
                            <table className="w-full min-w-[700px]">
                              <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                                <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                                  <th className="text-left py-3 px-2">#</th>
                                  <th className="text-left py-3 px-2">
                                    Subject
                                  </th>
                                  <th className="text-left py-3 px-2">
                                    Total Marks
                                  </th>
                                  <th className="text-left py-3 px-2">
                                    Obtained Marks
                                  </th>
                                  <th className="text-left py-3 px-2">Grade</th>
                                </tr>
                              </thead>

                              <tbody>
                                {viewResult.subject.map((subject, index) => (
                                  <tr
                                    key={index}
                                    className="bg-white border border-gray-200 font-semibold"
                                  >
                                    <td className="py-3 px-2">{index + 1}</td>
                                    <td className="py-3 px-2 capitalize">
                                      {subject.subject}
                                    </td>
                                    <td className="py-3 px-2">
                                      {subject.totalMark}
                                    </td>
                                    <td className="py-3 px-2">
                                      {subject.obtainedMark}
                                    </td>
                                    <td className="py-3 px-2">
                                      <p
                                        className={`py-1 px-1 rounded-[8px] text-center font-semibold ${["A+", "A", "A-"].includes(subject.grade) ? "bg-green-200" : ["B", "C", "D"].includes(subject.grade) ? "bg-orange-100" : "bg-red-200"}`}
                                      >
                                        {subject.grade}
                                      </p>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          <div className="mt-2 flex items-center gap-3">
                            <div className="p-2 bg-green-50 rounded-[8px] shadow">
                              <h2 className="font-semibold flex items-center gap-3">
                                <TiStarOutline className="text-green-700" />{" "}
                                Overall Result
                              </h2>

                              <div className="px-3 py-1 ">
                                <div className="flex items-center gap-7">
                                  <div>
                                    <p className="text-gray-500">
                                      Tatal Obtained Marks
                                    </p>
                                    <h1 className="text-xl font-semibold">
                                      {viewResult.totalObtainedMarks}/
                                      {viewResult.totalMarks}
                                    </h1>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">
                                      Average Mark
                                    </p>
                                    <h1 className="text-xl font-semibold">
                                      {viewResult.averageMark}%
                                    </h1>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">GPA</p>
                                    <h1 className="text-xl font-semibold">
                                      {viewResult.gpa}/5.0
                                    </h1>
                                  </div>
                                  <div>
                                    <p className="text-gray-500">Grade</p>
                                    <h1
                                      className={`ext-xl font-semibold py-1 px-2 text-xs text-center ${["A+", "A", "A-"].includes(viewResult.grade) ? "text-green-700 bg-green-100 rounded-[8px]" : ["B", "C", "D"].includes(viewResult.grade) ? "text-orange-900 bg-orange-100 rounded-[8px]" : viewResult.grade === "F" ? "text-red-600 bg-red-100 rounded-[8px]" : ""}`}
                                    >
                                      {viewResult.grade}
                                    </h1>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="bg-[#f2f0fe] rounded-[8px] shadow p-2">
                                <h2 className="font-semibold flex items-center gap-3">
                                  <MdMessage className="text-blue-700" />{" "}
                                  Remarks
                                </h2>
                                <div>{viewResult.remark}</div>
                              </div>
                              {/* <button
                                className="relative mt-5 overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 bg-white text-blue-600 rounded-lg cursor-pointer group"
                              >
                                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                                  <RiPrinterLine /> Print Result
                                </span>
                                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                              </button> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* delete popup */}
            {deleteResult && showDeleteModel && (
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
                          <IoIosAlert size={80} className="text-red-500" />
                        </div>
                        <h1 className="text-3xl font-bold">Are you sure?</h1>
                        <div>
                          <p>Do you really want to delete the result records</p>
                          <p>
                            for{" "}
                            <span className="capitalize font-semibold">
                              {deleteResult.student?.fullName}
                            </span>{" "}
                            <span className="capitalize font-semibold">
                              (Roll No: {deleteResult.student?.rollNumber})?
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
                            className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-red-600 text-red-600 rounded-lg cursor-pointer group w-50"
                          >
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                              Cancel
                            </span>
                            <span className="absolute inset-y-0 left-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></span>
                          </button>

                          {/* delete button */}
                          <button
                            onClick={async () => {
                              if (!deleteResult?._id) {
                                console.error("Result ID is missing!");
                                return;
                              }

                              await handleDelete(deleteResult._id);

                              setShowDeleteModel(false);
                              setDeleteResult(null);
                            }}
                            className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-red-600 text-red-600 rounded-lg cursor-pointer group w-50"
                          >
                            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                              <RiDeleteBin6Line /> Delete Student
                            </span>
                            <span className="absolute inset-y-0 right-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></span>
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
  );
}

export default ResultList;
