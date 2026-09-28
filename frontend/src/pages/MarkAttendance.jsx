import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { IoCalendarNumber } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { FaRegSave } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../App";
import { setStudentData } from "../redux/studentSlice";
import { useNavigate } from "react-router-dom";
import { setAttendanceData } from "../redux/attendanceSlice";

function MarkAttendance() {
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
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const statusName = ["Present", "Absent", "Late"];
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const [markedAttendance, setMarkedAttendance] = useState({});
  const { studentData } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const attendance = studentData.map((student) => ({
        student: student._id,
        date,
        status: markedAttendance[student._id]?.status || "Absent",
        remark: markedAttendance[student._id]?.remark || "",
      }));

      console.log(attendance);

      const result = await axios.post(
        `${serverURL}/api/attendance/add-attendance`,
        attendance,
        {
          withCredentials: true,
        },
      );

      dispatch(setAttendanceData(result.data.attendance))
      navigate("/attendances/attendance-report")
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleLoadStudents = async () => {
    try {
      if (!selectClass || !section) {
        return alert("Please select class and section");
      }

      const result = await axios.get(`${serverURL}/api/student/all-students`, {
        withCredentials: true,
      });

      const students = result.data;

      const filteredStudents = students.filter(
        (student) =>
          student.className === selectClass && student.section === section,
      );

      dispatch(setStudentData(filteredStudents));

      console.log(filteredStudents);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          {/* add attendance */}
          <div className="flex items-center gap-3">
            <IoCalendarNumber size={40} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Add Attendance</h1>
              <p>
                Mark and save student attendance for a specific class and date.
              </p>
            </div>
          </div>

          {/* check to load students of selected class & section */}
          <div className="mt-3 p-3 bg-white rounded-[8px] flex items-center justify-between shadow">
            {/* select class */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Class <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setSelectClass(e.target.value)}
                value={selectClass}
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* select section */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Seaction <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setSection(e.target.value)}
                value={section}
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="flex flex-col gap-2">
              <label htmlFor="">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={date}
                readOnly
                className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
              />
            </div>

            {/* load students */}
            <div>
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                onClick={handleLoadStudents}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <TfiReload /> Load Students
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
              <p className="text-gray-500 text-[13px]">
                Click to load students of selected
              </p>
              <p className="text-gray-500 text-[13px]">class & section.</p>
            </div>
          </div>

          {/*  */}
          <div className=" p-3 mt-3 bg-white rounded-[8px] shadow">
            {/* status */}
            <div className="flex items-center justify-end gap-5">
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-green-600" />
                <p>Present</p>
              </div>
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-red-600" />
                <p>Absent</p>
              </div>
              <div className="flex items-center gap-2">
                <GoDotFill size={20} className="text-orange-400" />
                <p>Late</p>
              </div>
            </div>

            {/* head line */}
            <table className="w-full min-w-[700px] mt-3">
              {/* table head */}
              <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Student Name</th>
                  <th className="text-left py-3 px-2">Class</th>
                  <th className="text-left py-3 px-2">Roll No</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Remark</th>
                </tr>
              </thead>

              {/* table body */}
              {studentData.map((student, index) => (
                <tbody key={student._id}>
                  <tr bg-white border border-gray-200 font-semibold>
                    <td className="py-3 px-2">{index + 1}</td>
                    <td className="py-3 px-2 flex items-center gap-4">
                      <div className="h-10 w-10 flex items-center justify-center text-white rounded-full bg-purple-700">
                        {student.image ? (
                          <img
                            src={student.image}
                            className="h-full w-full object-cover rounded-full"
                          />
                        ) : (
                          <div>
                            {student.fullName.slice(0, 1).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <h1>{student.fullName}</h1>
                    </td>
                    <td className="py-3 px-2">{student.className}</td>
                    <td className="py-3 px-2">{student.rollNumber}</td>
                    <td className="py-3 px-2">
                      <select
                        value={markedAttendance[student._id]?.status || ""}
                        onChange={(e) =>
                          setMarkedAttendance((prev) => ({
                            ...prev,
                            [student._id]: {
                              ...prev[student._id],
                              status: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="">Status</option>

                        {statusName.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-2">
                      <input
                        type="text"
                        placeholder="Write remark..."
                        value={markedAttendance[student._id]?.remark || ""}
                        onChange={(e) =>
                          setMarkedAttendance((prev) => ({
                            ...prev,
                            [student._id]: {
                              ...prev[student._id],
                              remark: e.target.value,
                            },
                          }))
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>

            <div className="flex justify-between items-center">
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                // onClick={handleReset}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <RiResetLeftFill /> Reset
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                onClick={handleSave}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <FaRegSave /> Save Attendance
                </span>

                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkAttendance;
