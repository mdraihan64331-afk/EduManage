import React, { useEffect } from "react";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import Overview from "../pages/Overview";
import Menu from "../pages/Menu";
import AdminHeader from "./AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { setStudentData } from "../redux/studentSlice";
import { serverURL } from "../App";
import axios from "axios";

function AdminDashboard() {
  const { studentData } = useSelector((state) => state.student);
  const { userData } = useSelector((state) => state.user);
  const { teacherData } = useSelector((state) => state.teacher)
  const dispatch = useDispatch();
  const now = new Date();

  const thisMonthJoined = studentData.filter((student) => {
    const admissionDate = new Date(student.admissionDate);

    return (
      admissionDate.getMonth() === now.getMonth() &&
      admissionDate.getFullYear() === now.getFullYear()
    );
  }).length;

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/student/all-students`,
          {
            withCredentials: true,
          },
        );

        dispatch(setStudentData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [dispatch]);
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full h-full">
        {/* admin header */}
        <AdminHeader />
        <div className="p-2">
          <div>
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <p>Welcome back, <span className="font-semibold">{userData?.fullName}</span>! Here's what's happening.</p>
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
                      +{thisMonthJoined} this month
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
                    <p className="text-xs text-green-600">+2 this month</p>
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
                    <h1 className="font-bold text-2xl">92.5%</h1>
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
