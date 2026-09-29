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
import { GiGraduateCap } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import AcademicOverview from "../components/AcademicOverview ";
import { IoStatsChartSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

function StudentDetails() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const { teacherData } = useSelector((state) => state.teacher);
  const { attendanceData } = useSelector((state) => state.attendance);
  const navigate = useNavigate();
  const performance = [
    { subject: "Mathematics", marks: 95, grade: "A+" },
    { subject: "English", marks: 88, grade: "A" },
    { subject: "Physics", marks: 92, grade: "A+" },
    { subject: "Chemistry", marks: 90, grade: "A+" },
    { subject: "Biology", marks: 85, grade: "A" },
    { subject: "Bangla", marks: 88, grade: "A" },
  ];

  const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];

  const attendanceSummary = Array.from({ length: 12 }, (_, index) => {
    const monthAttendance = attendanceList.filter((attendance) => {
      if (!attendance.student || !attendance.date) return false;

      const studentId =
        typeof attendance.student === "object"
          ? attendance.student._id
          : attendance.student;

      const attendanceDate = new Date(attendance.date);

      return (
        studentId === id &&
        attendanceDate.getMonth() === index &&
        attendanceDate.getFullYear() === new Date().getFullYear()
      );
    });

    return {
      month: new Date(new Date().getFullYear(), index).toLocaleString(
        "default",
        {
          month: "long",
        },
      ),

      present: monthAttendance.filter((item) => item.status === "Present")
        .length,

      absent: monthAttendance.filter((item) => item.status === "Absent").length,

      leave: monthAttendance.filter((item) => item.status === "Leave").length,

      late: monthAttendance.filter((item) => item.status === "Late").length,
    };
  });

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

  const classTeacherName = teacherData.find(
    (teacher) => teacher._id === student?.classTeacher,
  )?.fullName;

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
                <h1 className="text-xl font-semibold capitalize">
                  {student?.fullName}
                </h1>
                <p className="text-gray-500">
                  Student ID:{" "}
                  <span className="font-semibold text-gray-700">
                    {student?.studentId}
                  </span>
                </p>

                {/* class, section and roll no */}
                <div className="flex items-center gap-4">
                  <p className="text-gray-500">
                    Class{" "}
                    <span className="font-semibold text-gray-700">
                      {student?.className?.slice(6, 7)}
                    </span>
                  </p>
                  <span className="w-[1px] h-3 bg-gray-400"></span>
                  <p className="text-gray-500">
                    Section{" "}
                    <span className="font-semibold text-gray-700">
                      {student?.section}
                    </span>
                  </p>
                  <span className="w-[1px] h-3 bg-gray-400"></span>
                  <p className="text-gray-500">
                    Roll No:{" "}
                    <span className="font-semibold text-gray-700">
                      {student?.rollNumber}
                    </span>
                  </p>
                </div>

                {/* email and phone */}
                <div className="flex items-center gap-7 mt-2">
                  <p className="text-gray-500 flex items-center gap-2">
                    <MdOutlineEmail /> {student?.email}
                  </p>
                  <span className="w-[1px] h-4 bg-gray-400"></span>
                  <p className="text-gray-500 flex items-center gap-2">
                    <FiPhone /> {student?.phone}
                  </p>
                </div>

                {/* dob and gender */}
                <div className="flex items-center gap-7 mt-2">
                  <p className="text-gray-500 flex items-center gap-2">
                    <FaRegCalendarAlt />
                    Date of Birth: {new Date(student?.dob).toLocaleDateString()}
                  </p>
                  <span className="w-[1px] h-4 bg-gray-400"></span>
                  <p className="text-gray-500 flex items-center gap-2">
                    Gender: {student?.gender}
                  </p>
                </div>
              </div>
            </div>
            <button
              className="flex items-center gap-2 py-1 px-4 rounded-[8px] border border-gray-300 cursor-pointer"
              onClick={() => navigate(`/students/edit-student/${student._id}`)}
            >
              <FaRegEdit /> Edit Profile
            </button>
          </div>

          {/* information */}
          <div className="mt-4 flex justify-between flex-wrap gap-3">
            {/* personal information */}
            <div className="bg-white shadow rounded-[8px] p-5 ">
              <div className="flex items-center gap-4 text-xl">
                <IoPerson /> Personal Information
              </div>
              <div className="flex mt-3 justify-between">
                <div>
                  <p>Full Name</p>
                  <p>Student ID</p>
                  <p>Date of Birth</p>
                  <p>Gender</p>
                  <p>Blood Group</p>
                  <p>Religion</p>
                  <p>Nationality</p>
                  <p>Phone</p>
                  <p>Email</p>
                  <p>Present Address</p>
                </div>
                <div className="mx-5">
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <p className="capitalize">{student?.fullName}</p>
                  <p>{student?.studentId}</p>
                  <p>{new Date(student?.dob).toLocaleDateString()}</p>
                  <p>{student?.gender}</p>
                  <p>{student?.bloodGroup}</p>
                  <p>{student?.religion}</p>
                  <p className="capitalize">{student?.nationality}</p>
                  <p>{student?.phone}</p>
                  <p>{student?.email}</p>
                  <p className="capitalize">{student?.address}</p>
                </div>
              </div>
            </div>
            {/* academic information */}
            <div className="bg-white shadow rounded-[8px] p-5 ">
              <div className="flex items-center gap-4 text-xl">
                <GiGraduateCap /> Academic Information
              </div>
              <div className="flex mt-3">
                <div>
                  <p>Class</p>
                  <p>Section</p>
                  <p>Roll Number</p>
                  <p>Admission Date</p>
                  <p>Class Teacher</p>
                  <p>Guardian Phone</p>
                  <p>Guardian</p>
                </div>
                <div className="mx-5">
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <p>{student?.className?.slice(6, 7)}</p>
                  <p>{student?.section}</p>
                  <p>{student?.rollNumber}</p>
                  <p>{new Date(student?.admissionDate).toLocaleDateString()}</p>
                  <p className="capitalize">
                    {classTeacherName || "Not Assigned"}
                  </p>
                  <p>{student?.guardianPhone}</p>
                  <p className="capitalize">{student?.guardianName}</p>
                </div>
              </div>
            </div>
            {/* Guardian Information */}
            <div className="bg-white shadow rounded-[8px] p-5 ">
              <div className="flex items-center gap-4 text-xl">
                <BsFillPeopleFill /> Guardian Information
              </div>
              <div className="flex mt-3">
                <div>
                  <p>Father's Name</p>
                  <p>Father's Phone</p>
                  <p>Father's Occupation</p>
                  <p>Mother's Name</p>
                  <p>Mother's Phone</p>
                  <p>Mother's Occupation</p>
                  <p>Guardian Address</p>
                </div>
                <div className="mx-5">
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                  <div>:</div>
                </div>
                <div>
                  <p className="capitalize">{student?.fatherName}</p>
                  <p>{student?.fatherPhone}</p>
                  <p className="capitalize">{student?.fatherOccupation}</p>
                  <p className="capitalize">{student?.motherName}</p>
                  <p>{student?.motherPhone}</p>
                  <p className="capitalize">{student?.motherOccupation}</p>
                  <p className="capitalize">{student?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* class, attendance and academic overview */}
          <div className="mt-3 flex justify-between">
            {/* class performance */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="flex items-center gap-3 text-xl mb-4">
                <IoStatsChartSharp />
                Class Performance
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="px-4 py-3 font-semibold text-slate-500">
                        Subject
                      </th>

                      <th className="px-4 py-3 font-semibold text-slate-500">
                        Marks
                      </th>

                      <th className="px-4 py-3 font-semibold text-slate-500">
                        Grade
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {performance.map((item) => (
                      <tr
                        key={item.subject}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 font-medium text-slate-700">
                          {item.subject}
                        </td>

                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {item.marks}
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded-md bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            {item.grade}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* attendance summary */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-5">
                <h3 className="text-xl flex items-center gap-3">
                  <FaRegCalendarAlt /> Attendance Summary
                </h3>
              </div>

              <div className="overflow-x-auto max-h-[300px]">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                    <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                      <th className="px-3 py-3 font-semibold text-slate-500">
                        Month
                      </th>

                      <th className="px-3 py-3 text-center font-semibold text-slate-500">
                        Present
                      </th>

                      <th className="px-3 py-3 text-center font-semibold text-slate-500">
                        Absent
                      </th>

                      <th className="px-3 py-3 text-center font-semibold text-slate-500">
                        Late
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {attendanceSummary.map((item) => (
                      <tr key={item.month}>
                        <td className="px-3 py-3 font-medium text-slate-700">
                          {item.month}
                        </td>

                        <td className="px-3 py-3 text-center font-semibold text-emerald-600">
                          {item.present}
                        </td>

                        <td className="px-3 py-3 text-center text-slate-600">
                          {item.absent}
                        </td>

                        <td className="px-3 py-3 text-center text-slate-600">
                          {item.late}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* academic Overview */}
            <div>
              <AcademicOverview studentId={id}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
