import React, { useState } from "react";

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
  return (
    <div className="mt-13 px-6">
      <div className="bg-white p-2 shadow rounded-[8px]">
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
                  <button className="py-1 px-6 font-semibold bg-green-600 text-white rounded-xl cursor-pointer">
                    Search Result
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CheckResult;
