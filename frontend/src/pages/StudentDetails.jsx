import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";
import axios from "axios";
import {
  IoNotificationsOutline,
  IoPerson,
  IoSearchOutline,
} from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fatchStudent = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/student/student/${id}`,
          { withCredentials: true },
        );

        setStudent(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchStudent();
  }, [id]);

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        {/* student details head section */}
        <div className="flex justify-end gap-5 items-center bg-white p-2">
          <IoNotificationsOutline />
          <div className="flex items-center gap-2">
            {student?.image ? (
              <img
                src={student.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
                {student?.fullName?.slice(0, 1).toUpperCase()}
              </h1>
            )}
            <div>
              <h1 className="font-semibold">{student?.fullName}</h1>
              <p className="text-gray-400 text-xs">Student</p>
            </div>
          </div>
        </div>

        {/* student body section */}
        <div className="p-2">
          {/* dashboard, student list, student details */}
          <div className="flex gap-3 items-center text-gray-500">
            <span
              className="cursor-pointer"
              onClick={() => navigate("/admin-dashboard")}
            >
              Dashboard
            </span>
            <span className="-rotate-90">
              <IoIosArrowDown />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => navigate("/students/list-student")}
            >
              Student List
            </span>
            <span className="-rotate-90">
              <IoIosArrowDown />
            </span>
            <span className="cursor-pointer">Student details</span>
          </div>

          {/* text student details and back button */}
          <div className="mt-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <IoPerson size={35} className="text-green-700" />
              <div>
                <h1 className="text-2xl font-bold">Student Details</h1>
                <p>
                  View your complete information, academic records and more.
                </p>
              </div>
            </div>
            {/* back button */}
            <div
              className="flex gap-2 items-center px-4 py-1 bg-white rounded-[8px] shadow cursor-pointer"
              onClick={() => navigate("/students/list-student")}
            >
              <IoIosArrowDown className="rotate-90" /> Back to List
            </div>
          </div>

          {/* student card */}
          <div className="mt-3 p-3 flex justify-between items-start bg-white rounded-[8px] shadow">
            <div className="flex gap-3">
              <div className="w-30 h-30">
                {student?.image ? (
                  <img
                    src={student.image}
                    alt="Profile"
                    className="w-full h-full rounded-[8px] object-cover"
                  />
                ) : (
                  <h1 className="font-semibold text-xl bg-purple-800 flex justify-center items-center text-white w-full h-full rounded-[8px]">
                    {student?.fullName?.slice(0, 1).toUpperCase()}
                  </h1>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold capitalize">{student?.fullName}</h1>
                <p className="text-gray-500">Student ID: <span className="font-semibold text-gray-700">{student?.studentId}</span></p>

                {/* class, section and roll no */}
                <div className="flex items-center gap-4">
                    <p className="text-gray-500">Class <span className="font-semibold text-gray-700">{student?.className?.slice(6,7)}</span></p>
                    <span className="w-[1px] h-3 bg-gray-400"></span>
                    <p className="text-gray-500">Section <span className="font-semibold text-gray-700">{student?.section}</span></p>
                    <span className="w-[1px] h-3 bg-gray-400"></span>
                    <p className="text-gray-500">Roll No: <span className="font-semibold text-gray-700">{student?.rollNumber}</span></p>
                </div>

                {/* email and phone */}
                <div className="flex items-center gap-7 mt-2">
                    <p className="text-gray-500 flex items-center gap-2"><MdOutlineEmail /> {student?.email}</p>
                    <span className="w-[1px] h-4 bg-gray-400"></span>
                    <p className="text-gray-500 flex items-center gap-2"><FiPhone /> {student?.phone}</p>
                </div>

                {/* dob and gender */}
                <div className="flex items-center gap-7 mt-2">
                    <p className="text-gray-500 flex items-center gap-2"><FaRegCalendarAlt />Date of Birth: {new Date(student?.dob).toLocaleDateString()}</p>
                    <span className="w-[1px] h-4 bg-gray-400"></span>
                    <p className="text-gray-500 flex items-center gap-2">Gender: {student?.gender}</p>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 py-1 px-4 rounded-[8px] border border-gray-300 cursor-pointer" onClick={()=> navigate(`/students/edit-student/${student._id}`)}>
                <FaRegEdit /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
