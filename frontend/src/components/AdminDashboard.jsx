import React, { useEffect } from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import Overview from "../pages/Overview";
import Menu from "../pages/Menu";
import AdminHeader from "./AdminHeader";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const { studentData } = useSelector((state) => state.student);
  const { userData } = useSelector((state) => state.user);
  const { teacherData } = useSelector((state) => state.teacher);
  const { attendanceData } = useSelector((state) => state.attendance);
  const dispatch = useDispatch();
  const now = new Date();

  const thisMonthStudentJoined = studentData.filter((student) => {
    const admissionDate = new Date(student.admissionDate);

    return (
      admissionDate.getMonth() === now.getMonth() &&
      admissionDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const thisMonthTeacherJoined = teacherData.filter((teacher) => {
    const joiningDate = new Date(teacher.joiningDate);

    return (
      joiningDate.getMonth() === now.getMonth() &&
      joiningDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];

  const today = new Date().toISOString().split("T")[0];

  const todayAttendance = attendanceList.filter((attendance) => {
    const attendanceDate = new Date(attendance.date)
      .toISOString()
      .split("T")[0];

    return attendanceDate === today;
  });

  const totalToday = todayAttendance.length;

  const presentToday = todayAttendance.filter(
    (attendance) => attendance.status === "Present",
  ).length;

  const attendancePercentage =
    totalToday > 0 ? ((presentToday / totalToday) * 100).toFixed(1) : 0;

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full h-full">
        {/* admin header */}
        <AdminHeader />
        <div className="p-2">
          <div>
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <p>
              Welcome back,{" "}
              <span className="font-semibold">{userData?.fullName}</span>!
              Here's what's happening.
            </p>
            <div className="flex-1 py-6">
              <div className="grid grid-cols-4 gap-4">
                {/* total students */}

                <div className="h-30 w-full flex items-center bg-white gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <MdOutlinePeopleOutline
                      size={25}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Students</p>
                    <h1 className="font-bold text-2xl">{studentData.length}</h1>
                    <p className="text-xs text-green-600">
                      +{thisMonthStudentJoined} this month
                    </p>
                  </div>
                </div>

                {/* total teachers */}

                <div className="h-30 w-full flex items-center gap-4 bg-white p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-purple-100 rounded-xl p-2">
                    <FaChalkboardTeacher
                      size={25}
                      className="text-purple-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Teachers</p>
                    <h1 className="font-bold text-2xl">{teacherData.length}</h1>
                    <p className="text-xs text-green-600">
                      +{thisMonthTeacherJoined} this month
                    </p>
                  </div>
                </div>

                {/* total classes */}

                <div className="h-30 w-full flex items-center gap-4 bg-white p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <SiGoogleclassroom size={25} className="text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Total Classes</p>
                    <h1 className="font-bold text-2xl">85</h1>
                    <p className="text-xs text-green-600">+5 this month</p>
                  </div>
                </div>

                {/* today's attendence */}
                <div className="h-30 w-full flex items-center gap-4 bg-white p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-green-100 rounded-xl p-2">
                    <MdEventAvailable size={25} className="text-green-600" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">Today's Attendence</p>
                    <h1 className="font-bold text-2xl">
                      {attendancePercentage}%
                    </h1>
                    <p className="text-xs text-green-600">Present</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Overview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
