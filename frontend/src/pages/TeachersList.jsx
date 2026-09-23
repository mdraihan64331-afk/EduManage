import React, { useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { GoAlertFill } from "react-icons/go";
import { RiDeleteBin6Line, RiResetLeftFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoIosPeople, IoMdAdd } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdEventAvailable,
  MdOutlineModeEdit,
} from "react-icons/md";
import { SiGoogleclassroom } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { serverURL } from "../App";
import axios from "axios";
import { setTeacherData } from "../redux/teacherSlice";
import { useNavigate } from "react-router-dom";
import { GiBlackBook } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";

function TeachersList() {
  const [input, setInput] = useState("");
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [deleteTeacher, setDeleteTeacher] = useState(null);
  const [subject, setSubject] = useState();
  const selectSubject = [
    "Bangle",
    "English",
    "Mathematics",
    "Science",
    "Bangladesh and Global Studies",
    "ICT",
    "Religion and Moral Education",
  ];
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { teacherData = [] } = useSelector((state) => state.teacher);
  const displayTeachers = isFiltered ? filteredTeachers : teacherData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentYear = new Date().getFullYear();

  const joiningThisYear = teacherData.filter((teacher) => {
    if (!teacher.joiningDate) return false;

    return new Date(teacher.joiningDate).getFullYear() === currentYear;
  }).length;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${serverURL}/api/teacher/delete-teacher/${id}`, {
        withCredentials: true,
      });

      const result = await axios.get(`${serverURL}/api/teacher/all-teacher`, {
        withCredentials: true,
      });

      dispatch(setTeacherData(result.data));
    } catch (error) {
      console.log("delete error: ", error);
    }
  };

  const handleFilter = () => {
    let filtered = teacherData;

    if (input) {
      filtered = filtered.filter(
        (teacher) =>
          teacher.fullName?.toLowerCase().includes(input.toLowerCase()) ||
          teacher.teacherId?.toLowerCase().includes(input.toLowerCase()) ||
          teacher.subject?.toLowerCase().includes(input.toLowerCase()) ||
          teacher.phone?.toString().includes(input),
      );
    }

    if (subject) {
      filtered = filtered.filter((teacher) => teacher.subject === subject);
    }

    setFilteredTeachers(filtered);
    setIsFiltered(true);
  };

  const handleReset = () => {
    setInput("");
    setSubject("");
    setFilteredTeachers([]);
    setIsFiltered(false);
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          <div className="flex items-center gap-2">
            <IoIosPeople size={50} className="text-green-700" />
            <div>
              <h1 className="font-bold text-2xl">Teacher Management</h1>
              <p>
                Manage your school teachers. You can add, edit, delete and
                search teachers.
              </p>
            </div>
          </div>
          <div className="flex-1 py-4">
            <div className="grid grid-cols-4 gap-4">
              {/* Total Teachers */}

              <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <IoPerson size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Teachers</p>
                  <h1 className="font-bold text-2xl">{teacherData.length}</h1>
                  <p className="text-xs text-gray-400">Registered teachers</p>
                </div>
              </div>

              {/* Assigned Classes */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <SiGoogleclassroom size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Assigned Classes</p>
                  <h1 className="font-bold text-2xl">15</h1>
                  <p className="text-xs text-gray-400">Total class Assigned</p>
                </div>
              </div>

              {/* Subjects */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-purple-200 rounded-xl p-2">
                  <GiBlackBook size={25} className="text-purple-700" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Subjects</p>
                  <h1 className="font-bold text-2xl">8</h1>
                  <p className="text-xs text-gray-400">+ Total Subjects</p>
                </div>
              </div>

              {/* Joining This Year */}
              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <MdEventAvailable size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Joining This Year</p>
                  <h1 className="font-bold text-2xl">{joiningThisYear}</h1>
                  <p className="text-xs text-gray-400">+ New Teachers</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-[8px] shadow">
            {/* search */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border w-90 border-gray-400 rounded-[5px] p-1">
                <IoSearchOutline />
                <input
                  type="text"
                  onChange={(e) => setInput(e.target.value)}
                  value={input}
                  placeholder="Search by name, teacher ID, roll or phone..."
                  className="outline-none w-full"
                />
              </div>
              {/* subject */}
              <div className="flex flex-col gap-1">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-50 border border-gray-300  rounded-[8px] px-2 py-1 outline-none"
                >
                  <option value="">All Subject</option>
                  {selectSubject.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-center gap-3">
              {/* filter */}
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
                onClick={handleFilter}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <FiFilter /> Filter
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
              {/* reset */}
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                onClick={handleReset}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <RiResetLeftFill /> Reset
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>
          <div className="p-4 bg-white mt-4 rounded-[8px]">
            <div className="flex justify-between w-full">
              <div className="flex items-center gap-2">
                <BsFillPeopleFill size={20} />
                <h4 className="font-semibold">Teacher({teacherData.length})</h4>
              </div>
              <div>
                {/* add button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={() => navigate("/teacher/add-teacher")}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <IoMdAdd /> Add Teacher
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
            {/* teacher Table */}

            <div className="mt-4 w-full overflow-auto max-h-[300px]">
              <table className="w-full min-w-[700px]">
                {/* Table Header */}
                <thead className="sticky top-0 bg-white z-10">
                  <tr className="border-b border-gray-300 text-gray-600">
                    <th className="text-left py-3 px-2">Photo</th>
                    <th className="text-left py-3 px-2">Teacher Name</th>
                    <th className="text-left py-3 px-2">Teacher ID</th>
                    <th className="text-left py-3 px-2">Subject</th>
                    <th className="text-left py-3 px-2">Assigned Class</th>
                    <th className="text-left py-3 px-2">Phone</th>
                    <th className="text-left py-3 px-2">Teacher Role</th>
                    <th className="text-left py-3 px-2">Joining Date</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>

                {/* teacher Data */}
                <tbody>
                  {displayTeachers.map((teacher, index) => (
                    <tr
                      key={teacher._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">
                        <div className="w-10 h-10">
                          {teacher.image ? (
                            <img
                              src={teacher.image}
                              alt={teacher.fullName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-purple-800 w-full h-full flex text-white font-semibold justify-center items-center rounded-full">
                              {teacher?.fullName?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        <div>
                          <h1 className="font-semibold">{teacher.fullName}</h1>

                          <p className="text-xs text-gray-500">
                            {teacher.email}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-2">{teacher.teacherId}</td>

                      <td className="py-3 px-2">
                        <div className="bg-blue-100 text-center text-blue-600 px-2 py-1 rounded-2xl">
                          {teacher.subject}
                        </div>
                      </td>

                      <td className="py-3 px-2">{teacher.assignedClass}</td>

                      <td className="py-3 px-2">{teacher.phone}</td>

                      <td className="py-3 px-2">{teacher.teacherRole}</td>

                      <td className="py-3 px-2">
                        {new Date(teacher.joiningDate).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            onClick={() =>
                              navigate(`/teacher/edit-teacher/${teacher._id}`)
                            }
                          >
                            <MdOutlineModeEdit size={18} />
                          </button>

                          <button
                            className="p-2 rounded-[8px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                            onClick={() => {
                              setDeleteTeacher(teacher);
                              setShowDeleteModal(true);
                            }}
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* delete popup */}
              {showDeleteModal && deleteTeacher && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white w-[600px] rounded-xl shadow-xl p-6">
                    {/* Header */}

                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-xl flex items-center gap-2 font-bold text-gray-800">
                          <RiDeleteBin6Line size={30} color="red" /> Delete
                          teacher
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Are you sure you want to delete this teacher?
                        </p>
                      </div>
                      <div
                        className="flex justify-end text-gray-600 cursor-pointer"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setDeleteTeacher(null);
                        }}
                      >
                        <RxCross2 />
                      </div>
                    </div>

                    <div className="mt-5 flex gap-4 rounded-xl p-4">
                      <div className="">
                        <div className="w-30 h-30">
                          {deleteTeacher.image ? (
                            <img
                              src={deleteTeacher.image}
                              alt={deleteTeacher.fullName}
                              className="w-full h-full rounded-[8px] object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-[8px] bg-purple-800 text-white flex items-center justify-center text-2xl font-bold">
                              {deleteTeacher.fullName
                                ?.slice(0, 1)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-sm">
                        <div>
                          <h3 className="font-bold text-lg">
                            {deleteTeacher.fullName}
                          </h3>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Teacher ID: </p>
                            <p>{deleteTeacher.teacherId}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Subject: </p>
                            <p>{deleteTeacher.subject}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Assigned Class:</p>
                            <p>{deleteTeacher.assignedClass}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Teacher Role: </p>
                            <p>{deleteTeacher.teacherRole}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Gender</p>
                            <p>{deleteTeacher.gender}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-50 p-4 rounded-[8px]">
                      <div className="flex gap-3">
                        <div className="text-red-500">
                          <GoAlertFill size={20} />
                        </div>
                        <div>
                          <p className="text-red-500">
                            This action cannot be undone!
                          </p>
                          <p>
                            All data related to this teacher will be permanently
                            removed
                          </p>
                          <p>
                            from the system including results, attendance, fees
                            and more.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 mt-6">
                      {/* cancel button */}

                      <button
                        onClick={() => {
                          setShowDeleteModal(false);
                          setDeleteTeacher(null);
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
                          await handleDelete(deleteTeacher._id);
                          setShowDeleteModal(false);
                          setDeleteTeacher(null);
                        }}
                        className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-red-600 text-red-600 rounded-lg cursor-pointer group w-50"
                      >
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          <RiDeleteBin6Line /> Delete teacher
                        </span>
                        <span className="absolute inset-y-0 right-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></span>
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

export default TeachersList;
