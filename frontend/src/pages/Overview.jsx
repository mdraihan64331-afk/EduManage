import React from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const Overview = () => {
  const { attendanceData } = useSelector(
    (state) => state.attendance
  );

  const attendanceList = Array.isArray(attendanceData)
    ? attendanceData
    : [];

  const currentYear = new Date().getFullYear();

  // Monthly Attendance
  const attendanceChartData = Array.from(
    { length: 12 },
    (_, index) => {
      const monthAttendance = attendanceList.filter((attendance) => {
        const attendanceDate = new Date(attendance.date);

        return (
          attendanceDate.getMonth() === index &&
          attendanceDate.getFullYear() === currentYear
        );
      });

      const total = monthAttendance.length;

      const present = monthAttendance.filter(
        (attendance) => attendance.status === "Present"
      ).length;

      const percentage =
        total > 0
          ? (((present / total) * 100).toFixed(1))
          : 0;

      return {
        month: new Date(
          currentYear,
          index
        ).toLocaleString("default", {
          month: "short",
        }),
        attendance: percentage,
      };
    }
  );

  const resultData = [
    { grade: "A+", students: 45 },
    { grade: "A", students: 68 },
    { grade: "B", students: 42 },
    { grade: "C", students: 25 },
    { grade: "D", students: 12 },
    { grade: "F", students: 5 },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      
      {/* Attendance Overview */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monthly student attendance
          </p>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={attendanceChartData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) => [
                  `${value}%`,
                  "Attendance",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />

              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#6366F1"
                strokeWidth={3}
                dot={{
                  r: 4,
                  strokeWidth: 2,
                  fill: "#fff",
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Result Overview */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Result Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Students by grade
          </p>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={resultData}
              margin={{
                top: 10,
                right: 10,
                left: -15,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="grade"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: "#9CA3AF",
                  fontSize: 12,
                }}
              />

              <Tooltip
                formatter={(value) => [
                  value,
                  "Students",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow:
                    "0 4px 20px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="students"
                fill="#8B5CF6"
                radius={[6, 6, 0, 0]}
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Overview;