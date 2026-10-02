import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { BsPersonAdd } from "react-icons/bs";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiResetLeftFill } from "react-icons/ri";
import { ClipLoader } from "react-spinners";
import { FaRegSave } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddResult() {
  const [selectClass, setSelectClass] = useState("");
  const className = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const [section, setSection] = useState("");
  const sectionName = ["A", "B", "C"];
  const [examType, SetExamType] = useState("");
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
  const [academicYear, setAcademicYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [subjectForm, setSubjectForm] = useState({
    subject: "",
    totalMark: "",
    obtainedMark: "",
  });
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [student, setStudent] = useState("");
  const [remark, setRemark] = useState("");

  const { studentData } = useSelector((state) => state.student);
  const [filteredStudent, setFilteredStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = studentData.filter((student) => {
      const matchClass = selectClass ? student.className === selectClass : true;

      const matchSection = section ? student.section === section : true;

      return matchClass && matchSection;
    });
    setFilteredStudents(filtered);
  }, [studentData, selectClass, section]);

  const handleAddSubject = () => {
    const { subject, totalMark, obtainedMark } = subjectForm;

    if (!subject || !totalMark || !obtainedMark) {
      alert("Please fill all fields");
      return;
    }

    if (Number(obtainedMark) > Number(totalMark)) {
      alert("Obtained mark cannot be greater than total mark");
      return;
    }

    const percentage = (Number(obtainedMark) / Number(totalMark)) * 100;

    let grade;

    if (percentage >= 80) grade = "A+";
    else if (percentage >= 70) grade = "A";
    else if (percentage >= 60) grade = "A-";
    else if (percentage >= 50) grade = "B";
    else if (percentage >= 40) grade = "C";
    else if (percentage >= 33) grade = "D";
    else grade = "F";

    const newSubject = {
      subject,
      totalMark: Number(totalMark),
      obtainedMark: Number(obtainedMark),
      grade,
    };

    setSubjects((prev) => [...prev, newSubject]);

    setSubjectForm({
      subject: "",
      totalMark: "",
      obtainedMark: "",
    });
    console.log(subjectForm);

    setShowAddSubject(false);
  };

  const handleDeleteSubject = (index) => {
    setSubjects((prev) => prev.filter((_, i) => i !== index));
  };

  const totalMarks = subjects.reduce(
    (total, item) => total + Number(item.totalMark),
    0,
  );

  const totalObtainedMark = subjects.reduce(
    (total, item) => total + Number(item.obtainedMark),
    0,
  );

  const averageMarks =
    totalMarks > 0
      ? ((totalObtainedMark / totalMarks) * 100).toFixed(2)
      : "0.00";

  // Failed subject check
  const hasFailedSubject = subjects.some(
    (item) => Number(item.obtainedMark) < 33,
  );

  // Overall Grade
  const calculateOverallGrade = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    if (percentage >= 33) return "D";
    return "F";
  };

  const overallGrade = hasFailedSubject
    ? "F"
    : calculateOverallGrade(Number(averageMarks));

  // Result Status
  const resultStatus = hasFailedSubject ? "Fail" : "Pass";

  // GPA
  const gradePoint = {
    "A+": 5.0,
    A: 4.0,
    "A-": 3.5,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0,
  };

  const gpa =
    hasFailedSubject || subjects.length === 0
      ? "0.00"
      : (
          subjects.reduce(
            (total, item) => total + (gradePoint[item.grade] || 0),
            0,
          ) / subjects.length
        ).toFixed(2);

  const calulateOverallGrade = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "A-";
    if (percentage >= 50) return "B";
    if (percentage >= 40) return "C";
    if (percentage >= 33) return "D";
    return "F";
  };

  const overallMark = calulateOverallGrade(Number(averageMarks));

  const handleSaveResult = async () => {
    try {
      if (subjects.length === 0) {
        return alert("please add at least one subject");
      }

      const resultData = {
        student,
        examType,
        subject: subjects,
        academicYear,
        totalMarks,
        totalObtainedMarks: totalObtainedMark,
        averageMark: Number(averageMarks),
        gpa: Number(gpa),
        grade: overallGrade,
        resultStatus: resultStatus,
        remark,
      };

      console.log("SENDING RESULT:", resultData);

      const result = await axios.post(
        `${serverURL}/api/result/add-result`,
        resultData,
        { withCredentials: true },
      );

      console.log("Result saved:", result.data);

      alert("Result saved successfully");
      navigate("/result/view-result");
    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("BACKEND ERROR:", error.response?.data);

      alert(
        error.response?.data?.message ||
          "Something went wrong while saving result",
      );
    }
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          {/* tital */}
          <div className="flex items-center gap-3 ">
            <BsPersonAdd size={35} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Add New Result</h1>
              <p>
                Enter student marks and generate result. The system will
                caiculate total marks. GPA and grade automatically.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <div className=" w-[560px]">
              <div className="bg-white rounded-[8px] p-2 shadow">
                <h3 className="font-semibold">
                  1. Select student & Exam Details
                </h3>
                <div className="mt-3">
                  {/* select class and section */}
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Class <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={selectClass}
                        onChange={(e) => setSelectClass(e.target.value)}
                        className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option value="">Select Class</option>
                        {className.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Section <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={section}
                        onChange={(e) => setSection(e.target.value)}
                        className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option value="">Select Section</option>
                        {sectionName.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* select student, exam type and academic year */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Student <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={student}
                        onChange={(e) => setStudent(e.target.value)}
                        className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option value="">Select Class</option>
                        {filteredStudent.map((e) => (
                          <option
                            key={e._id}
                            value={e._id}
                            className="flex items-center gap-2"
                          >
                            <h1>
                              {e.fullName} ({e.studentId})
                            </h1>
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Exam Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={examType}
                        onChange={(e) => SetExamType(e.target.value)}
                        className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option value="">Select Section</option>
                        {examName.map((e, index) => (
                          <option key={index}>{e}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Academic Year <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="2025-2026"
                        className="w-40 border border-gray-300 px-2 py-1 rounded-[8px] outline-none"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. calculate & save */}
              <div className="mt-3 bg-white rounded-[8px] p-2 w-[560px] shadow">
                <h3 className="font-semibold">3. Calculate & Save</h3>
                <div className="mt-4 flex items-center gap-2">
                  <div className="bg-green-100 h-[73px] rounded-[8px] p-3 shadow">
                    <p className="text-xs">Total Marks</p>
                    <h2 className="font-bold text-xl">{totalMarks}</h2>
                  </div>
                  <div className="bg-green-100 h-[73px] rounded-[8px] p-3 shadow">
                    <p className="text-xs">Obtained Marks</p>
                    <h2 className="font-bold text-xl">{totalObtainedMark}</h2>
                  </div>
                  <div className="bg-green-100 h-[73px] rounded-[8px] p-3 shadow">
                    <p className="text-xs">Average Marks</p>
                    <h2 className="font-bold text-xl">{averageMarks}</h2>
                  </div>
                  <div className="bg-green-100 h-[73px] rounded-[8px] p-3 shadow">
                    <p className="text-xs">GPA</p>
                    <h2 className="font-bold text-xl">{gpa}</h2>
                  </div>
                  <div className="bg-green-100 h-[73px] rounded-[8px] p-3 shadow">
                    <p className="text-xs">Grade</p>
                    <h2 className="font-bold text-xl">{overallMark}</h2>
                  </div>
                  {resultStatus === "Pass" ? (
                    <div className="bg-green-100 h-[73px] rounded-[8px] p-3 flex items-center justify-center shadow">
                      <p className="text-sx bg-green-300 text-green-600 px-2 py-1 rounded-xl font-semibold">
                        {resultStatus}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-red-100 h-[73px] rounded-[8px] p-3 flex items-center justify-center shadow">
                      <p className="text-sx bg-red-300 text-red-600 px-2 py-1 rounded-xl font-semibold">
                        {resultStatus}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <label htmlFor="">Remarks (Optional)</label>
                  <textarea
                    rows={3}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter Remarks about the student's performance..."
                    className="border border-gray-300 rounded-[8px] p-2 w-full resize-none outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="flex items-center justify-between w-[560px] mt-3 bg-white p-2 rounded-[8px] shadow">
                <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group">
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <RiResetLeftFill /> Reset
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </button>

                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={handleSaveResult}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    {loading ? (
                      <ClipLoader color="white" />
                    ) : (
                      <>
                        <FaRegSave /> Save Result
                      </>
                    )}
                  </span>
                  <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
            {/* add mark */}
            <div className="bg-white p-2 rounded-[8px] w-[449px] shadow">
              <h3 className="font-semibold">2. Add Marks</h3>
              <div className="mt-3">
                <table>
                  <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                    <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                      <th className="text-left py-3 px-2">Subject</th>
                      <th className="text-left py-3 px-2">Total Marks</th>
                      <th className="text-left py-3 px-2">Obtained Marks</th>
                      <th className="text-left py-3 px-2">Grade</th>
                      <th className="text-left py-3 px-2"></th>
                    </tr>
                  </thead>

                  {/* body */}
                  <tbody>
                    {subjects.map((e, index) => (
                      <tr key={index}>
                        <td>
                          <p className="rounded-[8px] border border-gray-300 py-3 px-1 mx-1 mt-3">
                            {e.subject}
                          </p>
                        </td>
                        <td>
                          <p className="rounded-[8px] border border-gray-300 py-3 px-1 mx-1 mt-3">
                            {e.totalMark}
                          </p>
                        </td>
                        <td>
                          <p className="rounded-[8px] border border-gray-300 py-3 px-1 mx-1 mt-3">
                            {e.obtainedMark}
                          </p>
                        </td>
                        <td>
                          <p className="rounded-[8px] border border-gray-300 py-3 px-1 mx-1 text-center mt-3">
                            {e.grade}
                          </p>
                        </td>
                        <td className=" rounded-[8px] py-3 px-2">
                          <button
                            className="cursor-pointer"
                            onClick={() => handleDeleteSubject(index)}
                          >
                            <MdDelete size={18} className="text-red-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-3">
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={() => {
                    setShowAddSubject(true);
                  }}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <FaPlus /> Add Subject
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>

              {/* add subject popup */}
              {showAddSubject && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white p-4 rounded-[8px] shadow">
                    <div className="flex items-center justify-between">
                      <h1 className="font-bold text-xl">Add New Subject</h1>
                      <button
                        className="flex items-end cursor-pointer"
                        onClick={() => {
                          setShowAddSubject(false);
                        }}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                    <div className="flex flex-col gap-3 mt-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">
                          Subject Name<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter subject name"
                          value={subjectForm.subject}
                          onChange={(e) =>
                            setSubjectForm({
                              ...subjectForm,
                              subject: e.target.value,
                            })
                          }
                          className="w-80 border border-gray-300 outline-none px-2 py-1 rounded-[8px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">
                          Total Marks<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter total marks"
                          value={subjectForm.totalMark}
                          onChange={(e) =>
                            setSubjectForm({
                              ...subjectForm,
                              totalMark: e.target.value,
                            })
                          }
                          className="w-80 border border-gray-300 outline-none px-2 py-1 rounded-[8px]"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="">
                          Obtained Marks<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          placeholder="Enter obtained marks"
                          value={subjectForm.obtainedMark}
                          onChange={(e) =>
                            setSubjectForm({
                              ...subjectForm,
                              obtainedMark: e.target.value,
                            })
                          }
                          className="w-80 border border-gray-300 outline-none px-2 py-1 rounded-[8px]"
                        />
                      </div>
                      <button
                        className="relative w-full overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                        onClick={handleAddSubject}
                      >
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          {loading ? (
                            <ClipLoader color="white" />
                          ) : (
                            <>
                              <FaRegSave /> Save Result
                            </>
                          )}
                        </span>
                        <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                      </button>

                      <button
                        className="w-full border border-gray-300 rounded-[8px] py-1 px-2 cursor-pointer"
                        onClick={() => {
                          setShowAddSubject(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddResult;
