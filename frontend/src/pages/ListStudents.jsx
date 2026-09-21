import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { IoIosPeople, IoMdAdd } from "react-icons/io";
import { MdEventAvailable } from "react-icons/md";
import { MdPersonAddAlt1 } from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { GiGraduateCap } from "react-icons/gi";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { RiResetLeftFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../App";
import { setStudentData } from "../redux/studentSlice";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ListStudents() {
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
  ];
  const [section, setSection] = useState("");
  const [input, setInput] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const sectionName = ["A", "B", "C"];
  const dispatch = useDispatch();
  const { studentData = [] } = useSelector((state) => state.student);
  const displayStudents = input ? filteredStudents : studentData;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get(`${serverURL}/api/student/all-students`, {
        withCredentials: true,
      });

      dispatch(setStudentData(result.data));
    };

    fetchStudents();
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayJoined = studentData.filter((student) => {
    return student.admissionDate?.split("T")[0] === today;
  }).length;

  const handleDelete = async (id) => {
    try {
      // Delete student
      await axios.delete(`${serverURL}/api/student/delete-student/${id}`, {
        withCredentials: true,
      });

      // Fetch students again
      const result = await axios.get(`${serverURL}/api/student/all-students`, {
        withCredentials: true,
      });

      console.log(result);

      // Update Redux
      dispatch(setStudentData(result.data));
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  useEffect(() => {
    const newList = studentData.filter(
      (student) =>
        student.fullName?.toLowerCase().includes(input.toLowerCase()) ||
        student.studentId?.toLowerCase().includes(input.toLowerCase()) ||
        student.rollNumber?.toString().includes(input) ||
        student.phone?.toString().includes(input),
    );

    setFilteredStudents(newList);
  }, [studentData, input]);

  return (
    <div className="flex bg-blue-50 overflow-hidden">
      <Menu />
      <div className="w-full">
        {/* admin header */}
        <AdminHeader />
        <div className="p-2">
          <div className="flex items-center gap-2">
            <IoIosPeople size={50} className="text-green-700" />
            <div>
              <h1 className="font-bold text-2xl">Student List</h1>
              <p>View and manage all students in your school</p>
            </div>
          </div>
          <div className="flex-1 py-4">
            <div className="grid grid-cols-4 gap-4">
              {/* total students */}

              <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <MdPersonAddAlt1 size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Students</p>
                  <h1 className="font-bold text-2xl">{studentData.length}</h1>
                  <p className="text-xs text-gray-400">Registered students</p>
                </div>
              </div>

              {/* total class */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <SiGoogleclassroom size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Classes</p>
                  <h1 className="font-bold text-2xl">10</h1>
                  <p className="text-xs text-gray-400">Available classes</p>
                </div>
              </div>

              {/* total section */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-purple-200 rounded-xl p-2">
                  <GiGraduateCap size={25} className="text-purple-700" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total section</p>
                  <h1 className="font-bold text-2xl">3</h1>
                  <p className="text-xs text-gray-400">A, B, C</p>
                </div>
              </div>

              {/* today's joined */}
              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <MdEventAvailable size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Today's Joined</p>
                  <h1 className="font-bold text-2xl">{todayJoined}</h1>
                  <p className="text-xs text-gray-400">New Students</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-[8px] shadow">
            {/* search */}
            <div className="flex items-center gap-2 border w-90 border-gray-400 rounded-[5px] p-1">
              <IoSearchOutline />
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search by name, student ID, roll or phone..."
                className="outline-none w-full"
              />
            </div>
            {/* class */}
            <div className="flex flex-col gap-1">
              <select
                value={selectClass}
                onChange={(e) => setSelectClass(e.target.value)}
                className="w-50 border border-gray-300  rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>
            {/* section */}
            <div className="flex flex-col gap-1">
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className=" border w-50 border-gray-300 rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Section</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>
            {/* filter */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
              // onClick={handleAddStudent}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <FiFilter /> Filter
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
            {/* reset */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
              // onClick={handleReset}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <RiResetLeftFill /> Reset
              </span>
              <span className="absolute inset-y-0 right-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>
          <div className="p-4 bg-white mt-4 rounded-[8px]">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
                <BsFillPeopleFill size={20} />
                <h4 className="font-semibold">Student({studentData.length})</h4>
              </div>
              <div>
                {/* add button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
                  onClick={() => navigate("/students/add-student")}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <IoMdAdd /> Add Student
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
            {/* Student Table */}

            <div className="mt-4 w-full overflow-x-auto">
              <table className="w-full min-w-[700px]">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-300 text-gray-600">
                    <th className="text-left py-3 px-2">#</th>
                    <th className="text-left py-3 px-2">Photo</th>
                    <th className="text-left py-3 px-2">Name</th>
                    <th className="text-left py-3 px-2">Student ID</th>
                    <th className="text-left py-3 px-2">Class</th>
                    <th className="text-left py-3 px-2">Roll</th>
                    <th className="text-left py-3 px-2">Section</th>
                    <th className="text-left py-3 px-2">Phone</th>
                    <th className="text-left py-3 px-2">Gender</th>
                    <th className="text-left py-3 px-2">Admission</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>

                {/* Student Data */}
                <tbody>
                  {displayStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">{index + 1}</td>

                      <td className="py-3 px-2">
                        <div className="w-10 h-10">
                          <img
                            src={student.image}
                            alt={student.fullName}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        <div>
                          <h1 className="font-semibold">{student.fullName}</h1>

                          <p className="text-xs text-gray-500">
                            {student.email}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-2">{student.studentId}</td>

                      <td className="py-3 px-2">
                        <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-2xl">
                          {student.className}
                        </div>
                      </td>

                      <td className="py-3 px-2">{student.rollNumber}</td>

                      <td className="py-3 px-2">{student.section}</td>

                      <td className="py-3 px-2">{student.phone}</td>

                      <td className="py-3 px-2">{student.gender}</td>

                      <td className="py-3 px-2">
                        {new Date(student.admissionDate).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            onClick={() =>
                              navigate(`/students/edit-student/${student._id}`)
                            }
                          >
                            <MdOutlineModeEdit size={18} />
                          </button>

                          <button
                            className="p-2 rounded-[8px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                            onClick={() => handleDelete(student._id)}
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </div>
                      </td>
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

export default ListStudents;
