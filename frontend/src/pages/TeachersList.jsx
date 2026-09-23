import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { GoAlertFill } from "react-icons/go";
import { RiDeleteBin6Line, RiResetLeftFill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { IoIosPeople, IoMdAdd } from "react-icons/io";
import { BsFillPeopleFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdEventAvailable, MdPersonAddAlt1 } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { SiGoogleclassroom } from "react-icons/si";
import { useSelector } from "react-redux";

function TeachersList() {
  const [input, setInput] = useState("");
  const [filteredTeachers, setFilteredStudents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const { teacherData = [] } = useSelector((state) => state.teacher);
  const displayStudents = isFiltered ? filteredTeachers : teacherData;

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
                  <MdPersonAddAlt1 size={25} className="text-green-600" />
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
                  <GiGraduateCap size={25} className="text-purple-700" />
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
                  {/* <h1 className="font-bold text-2xl">{todayJoined}</h1> */}
                  <p className="text-xs text-gray-400">+ New Teachers</p>
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
                // onChange={(e) => setInput(e.target.value)}
                // value={input}
                placeholder="Search by name, student ID, roll or phone..."
                className="outline-none w-full"
              />
            </div>
            {/* class */}
            <div className="flex flex-col gap-1">
              {/* <select
                value={selectClass}
                onChange={(e) => setSelectClass(e.target.value)}
                className="w-50 border border-gray-300  rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select> */}
            </div>
            {/* section */}
            <div className="flex flex-col gap-1">
              {/* <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className=" border w-50 border-gray-300 rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Section</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select> */}
            </div>
            {/* filter */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
              // onClick={handleFilter}
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
                {/* <h4 className="font-semibold">Student({studentData.length})</h4> */}
              </div>
              <div>
                {/* add button */}
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  // onClick={() => navigate("/students/add-student")}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <IoMdAdd /> Add Student
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
            {/* Student Table */}

            <div className="mt-4 w-full overflow-auto max-h-[300px]">
              <table className="w-full min-w-[700px]">
                {/* Table Header */}
                <thead className="sticky top-0 bg-white z-10">
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
                  {/* {displayStudents.map((student, index) => (
                    <tr
                      key={student._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">{index + 1}</td>

                      <td className="py-3 px-2">
                        <div className="w-10 h-10">
                          {student.image ? (
                            <img
                              src={student.image}
                              alt={student.fullName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-purple-800 w-full h-full flex text-white font-semibold justify-center items-center rounded-full">
                              {student?.fullName?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
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
                            onClick={() => {
                              setDeleteStudent(student);
                              setShowDeleteModal(true);
                            }}
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>

              {/* delete popup */}
              {/* {showDeleteModal && deleteStudent && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                  <div className="bg-white w-[600px] rounded-xl shadow-xl p-6">
                    
                    Header

                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-xl flex items-center gap-2 font-bold text-gray-800">
                          <RiDeleteBin6Line size={30} color="red" /> Delete
                          Student
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                          Are you sure you want to delete this student?
                        </p>
                      </div>
                      <div
                        className="flex justify-end text-gray-600 cursor-pointer"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setDeleteStudent(null);
                        }}
                      >
                        <RxCross2 />
                      </div>
                    </div>

                    <div className="mt-5 flex gap-4 rounded-xl p-4">
                      <div className="">
                        <div className="w-30 h-30">
                          {deleteStudent.image ? (
                            <img
                              src={deleteStudent.image}
                              alt={deleteStudent.fullName}
                              className="w-full h-full rounded-[8px] object-cover"
                            />
                          ) : (
                            <div className="w-full h-full rounded-[8px] bg-purple-800 text-white flex items-center justify-center text-2xl font-bold">
                              {deleteStudent.fullName
                                ?.slice(0, 1)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-sm">
                        <div>
                          <h3 className="font-bold text-lg">
                            {deleteStudent.fullName}
                          </h3>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Student ID: </p>
                            <p>{deleteStudent.studentId}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Roll No: </p>
                            <p>{deleteStudent.rollNumber}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Class:</p>
                            <p>{deleteStudent.className}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Section: </p>
                            <p>{deleteStudent.section}</p>
                          </div>

                          <div className="flex items-center gap-3 text-gray-400">
                            <p>Gender</p>
                            <p>{deleteStudent.gender}</p>
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
                            All data related to this student will be permanently
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

                      cancel button

                      <button
                        onClick={() => {
                          setShowDeleteModal(false);
                          setDeleteStudent(null);
                        }}
                        className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-red-600 text-red-600 rounded-lg cursor-pointer group w-50"
                      >
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          Cancel
                        </span>
                        <span className="absolute inset-y-0 left-0 w-0 bg-red-600 transition-all duration-500 group-hover:w-full"></span>
                      </button>

                      delete button

                      <button
                        onClick={async () => {
                          await handleDelete(deleteStudent._id);
                          setShowDeleteModal(false);
                          setDeleteStudent(null);
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
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachersList;
