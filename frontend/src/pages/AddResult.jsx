import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { BsPersonAdd } from "react-icons/bs";
import { useSelector } from "react-redux";

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
  const [exam, SetExam] = useState("");
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

  const { studentData } = useSelector((state) => state.student);
  const [filteredStudent, setFilteredStudents] = useState([]);

  useEffect(() => {
    const filtered = studentData.filter((student) => {
      const matchClass = selectClass ? student.className === selectClass : true;

      const matchSection = section ? student.section === section : true;

      return matchClass && matchSection;
    });
    setFilteredStudents(filtered);
  }, [studentData, selectClass, section]);

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          {/* tital */}
          <div className="flex items-center gap-3">
            <BsPersonAdd size={35} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Add New Result</h1>
              <p>
                Enter student marks and generate result. The system will
                caiculate total marks. GPA and grade automatically.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="bg-white rounded-[8px] p-2">
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
                <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Student <span className="text-red-500">*</span>
                    </label>
                    <select className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]">
                      <option value="">Select Class</option>
                      {filteredStudent.map((e, index) => (
                        <option key={index} className="flex items-center gap-2">
                          {e.image ? (
                            <img
                              src={e.image}
                              alt={e.fullName}
                              className="h-10 w-10 object-cover rounded-full"
                            />
                          ) : (
                            <span className="h-10 w-10 bg-purple-700 rounded-full">
                              {e?.fullName.slice(0, 1).toUpperCase}
                            </span>
                          )}
                          <h1 className="capitalize">{e?.fullName}</h1>
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Exam Type <span className="text-red-500">*</span>
                    </label>
                    <select className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]">
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
                      className="w-50 border border-gray-300 px-2 py-1 rounded-[8px] outline-none"
                      value={academicYear}
                      onChange={(e) => setAcademicYear(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddResult;
