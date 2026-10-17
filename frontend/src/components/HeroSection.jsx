import React from "react";
import heroBgImage from "../assets/heroBg.PNG";
import heroImage from "../assets/heroLogo.PNG";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HeroSection() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const { studentData } = useSelector((state) => state.student);
  const { teacherData } = useSelector((state) => state.teacher);
  const { attendanceData } = useSelector((state) => state.attendance);
  const { resultData } = useSelector((state) => state.result);
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

  const resultThisYear = resultData.filter((result) => {
    const resultDate = new Date(result.createdAt);

    return resultDate.getFullYear() === now.getFullYear();
  });

  const totalResultThisYear = resultThisYear.length;

  const passStudent = resultData.filter(
    (result) => result?.resultStatus === "Pass",
  ).length;

  const resultPercentage =
    totalResultThisYear > 0
      ? ((passStudent / totalResultThisYear) * 100).toFixed(1)
      : 0;

  return (
    <div className="relative">
      <section
        className="min-h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(232,248,237,0.3), rgba(220,238,255,0.3)), url(${heroBgImage})`,
        }}
      >
        {/* Hero content */}
        <div className="flex items-center ">
          <div className="container mx-auto px-6 py-20 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-bold text-gray-800">
                Manage Students.
              </h1>
              <h1 className="text-4xl font-bold text-green-600">
                Track Performance.
              </h1>
              <h1 className="text-4xl font-bold text-gray-800">
                Build Success.
              </h1>
            </div>

            <div>
              <p>A complete management solution to manage students, track</p>
              <p>
                result, attendance, performance, homework and academic reports
                in one place.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <button className="py-2 px-6 font-semibold bg-green-600 text-white rounded-xl cursor-pointer">
                Check Result
              </button>

              {userData?.role ? null : (
                <button
                  className="py-2 px-6 font-semibold bg-blue-800 text-white rounded-xl cursor-pointer"
                  onClick={() => navigate("/sign-in")}
                >
                  Login Now
                </button>
              )}
            </div>
          </div>
          <div>
            <img src={heroImage} alt="hero image" />
          </div>
        </div>
      </section>
      <div className="px-15 absolute w-full -bottom-8.5">
        <div className="py-2 px-7 flex items-center justify-between bg-white rounded-[8px] shadow">
          {/* total students */}
          <div>
            <p className="text-xs text-gray-500 font-semibold">
              Total Students
            </p>
            <h1 className="text-xl text-blue-600 font-bold">
              {Number(studentData.length).toLocaleString("en-BD")}
            </h1>
            <p className="text-xs text-green-600 font-semibold">
              +{thisMonthStudentJoined} this month
            </p>
          </div>

          {/* total teacher */}
          <div className="border-l border-gray-200 px-4">
            <p className="text-xs text-gray-500 font-semibold">
              Total Teachers
            </p>
            <h1 className="text-xl text-green-600 font-bold">
              {Number(teacherData.length).toLocaleString("en-BD")}
            </h1>
            <p className="text-xs text-green-600 font-semibold">
              +{thisMonthTeacherJoined} this month
            </p>
          </div>

          {/* total classes */}
          <div className="border-l border-gray-200 px-4">
            <p className="text-xs text-gray-500 font-semibold">Total Classes</p>
            <h1 className="text-xl text-black font-bold">
              {Number("80").toLocaleString("en-BD")}
            </h1>
            <p className="text-xs text-gray-500 font-semibold">
              Classes & Sections
            </p>
          </div>

          {/* today attendance */}
          <div className="border-l border-gray-200 px-4">
            <p className="text-xs text-gray-500 font-semibold">
              Today's Attendance
            </p>
            <h1 className="text-xl text-blue-600 font-bold">{attendancePercentage}%</h1>
            <p className="text-xs text-green-600 font-semibold">Present</p>
          </div>

          {/* Success Rate */}
          <div className="border-l border-gray-200 px-4">
            <p className="text-xs text-gray-500 font-semibold">Success Rate</p>
            <h1 className="text-xl text-blue-600 font-bold">{resultPercentage}%</h1>
            <p className="text-xs text-gray-500 font-semibold">
              Overall Success
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
