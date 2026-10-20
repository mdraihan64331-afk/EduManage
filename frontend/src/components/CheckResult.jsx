import React, { useState } from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaClipboardList, FaRegCalendarAlt, FaTrophy } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { LuScroll } from "react-icons/lu";
import {
  MdEditDocument,
  MdLocalPhone,
  MdMessage,
  MdOutlineEmail,
} from "react-icons/md";
import { RiArrowLeftLongLine, RiPrinterLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { TiStarOutline } from "react-icons/ti";
import { useSelector } from "react-redux";

function CheckResult() {
  const [rollId, setRollId] = useState("");
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
  const [examType, setExamType] = useState("");
  const examName = [
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
  const [showResultModel, setShowResultModel] = useState(false);
  const [viewResult, setViewResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const { resultData = [] } = useSelector((state) => state.result);

  const handleSearchResult = () => {
    if (!rollId.trim() || !selectClass || !examType) {
      setSearchError("Please enter student information, class and exam type.");
      setShowResultModel(false);
      return;
    }

    const searchValue = rollId.trim().toLowerCase();

    const foundResult = resultData.find((item) => {
      // Student information
      const student = item.student || item.addStudent;

      if (!student || typeof student !== "object") {
        return false;
      }

      const fullName = student.fullName?.toLowerCase() || "";
      const studentId = student.studentId?.toLowerCase() || "";
      const rollNumber = String(student.rollNumber ?? "").toLowerCase();

      // Student Name / ID / Roll Number
      const matchesStudent =
        fullName === searchValue ||
        studentId === searchValue ||
        rollNumber === searchValue;

      // Class and Exam
      const matchesClass = student.className === selectClass;
      const matchesExam = item.examType === examType;

      return matchesStudent && matchesClass && matchesExam;
    });

    if (!foundResult) {
      setViewResult(null);
      setShowResultModel(false);
      setSearchError("No result found for this student and exam.");
      return;
    }

    setViewResult(foundResult);
    setSearchError("");
    setShowResultModel(true);
  };

  return (
    <div className="mt-13 px-6">
      <div className="bg-white p-2 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px]">
        <div className="text-center">
          <h1 className="text-xl font-bold">Check Student Result</h1>
          <p className="text-gray-600 text-[14px]">
            Search by student ID, Roll Number or Class to view result
          </p>
        </div>
        <div className="flex items-center justify-center mt-3">
          <table>
            <thead>
              <tr className="text-gray-600">
                <th className="text-left px-4">Student ID/Roll Number</th>
                <th className="text-left px-4">Class</th>
                <th className="text-left px-4">Exam Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Student ID/Roll Number */}
                <td className=" px-4">
                  <input
                    type="text"
                    placeholder="Enter ID or Roll Number"
                    value={rollId}
                    onChange={(e) => setRollId(e.target.value)}
                    className="border border-gray-300 rounded-[8px] w-70 px-2 py-1 outline-none"
                  />
                </td>
                {/* Class */}
                <td className=" px-4">
                  <select
                    value={selectClass}
                    onChange={(e) => setSelectClass(e.target.value)}
                    className="w-70 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                  >
                    <option value="">Select Class</option>
                    {className.map((e, index) => (
                      <option key={index}>{e}</option>
                    ))}
                  </select>
                </td>
                {/* Exam Type */}
                <td className=" px-4">
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-70 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                  >
                    <option value="">Select Exam</option>
                    {examName.map((e, index) => (
                      <option key={index}>{e}</option>
                    ))}
                  </select>
                </td>
                {/* button */}
                <td className="py-3 px-2">
                  <button
                    className="py-1 px-6 font-semibold bg-green-600 text-white rounded-[8px] cursor-pointer"
                    onClick={handleSearchResult}
                  >
                    Search Result
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {showResultModel && viewResult && (
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
                          <p className="text-xs text-gray-500">Exam Type</p>
                          <h1>{viewResult.examType}</h1>
                        </div>
                      </div>
                      {/* academic year */}
                      <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                        <div className="flex items-center justify-center p-2 bg-purple-200 text-purple-800 rounded-full">
                          <FaRegCalendarAlt size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Acaemic Year</p>
                          <h1>{viewResult.academicYear}</h1>
                        </div>
                      </div>
                      {/* total mark */}
                      <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                        <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-800 rounded-full">
                          <MdEditDocument size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Total Marks</p>
                          <h1>{viewResult.totalMarks}</h1>
                        </div>
                      </div>
                      {/* obtained marks */}
                      <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                        <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-full">
                          <MdEditDocument size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Obtained Mark</p>
                          <h1>{viewResult.totalObtainedMarks}</h1>
                        </div>
                      </div>
                      {/* percentage */}
                      <div className="flex items-center gap-3 bg-blue-50 shadow p-3 mt-3 rounded-[8px]">
                        <div className="flex items-center justify-center p-2 bg-purple-200 text-purple-800 rounded-full">
                          <FaClipboardList size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Percentage</p>
                          <h1>{viewResult.averageMark}%</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white mt-3 shadow p-3 rounded-[8px]">
                    <h2 className="font-semibold flex items-center gap-3">
                      <IoBookSharp className="text-blue-600" /> Subject-wise
                      Marks
                    </h2>

                    <div className="mt-3 w-full overflow-auto max-h-[200px]">
                      <table className="w-full min-w-[700px]">
                        <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                          <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                            <th className="text-left py-3 px-2">#</th>
                            <th className="text-left py-3 px-2">Subject</th>
                            <th className="text-left py-3 px-2">Total Marks</th>
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
                              <td className="py-3 px-2">{subject.totalMark}</td>
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
                          <TiStarOutline className="text-green-700" /> Overall
                          Result
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
                              <p className="text-gray-500">Average Mark</p>
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
                            <MdMessage className="text-blue-700" /> Remarks
                          </h2>
                          <div>{viewResult.remark}</div>
                        </div>
                        <button className="relative mt-5 overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 bg-white text-blue-600 rounded-lg cursor-pointer group">
                          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                            <RiPrinterLine /> Print Result
                          </span>
                          <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {searchError && (
        <p className="text-red-600 text-sm text-center mt-3">{searchError}</p>
      )}
    </div>
  );
}

export default CheckResult;
