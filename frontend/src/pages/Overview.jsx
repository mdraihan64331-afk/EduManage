import React, { useMemo, useState } from "react";
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

const GRADES = ["A+", "A", "A-", "B", "C", "D", "F"];

const getGrade = (result) => {
  if (result.resultStatus === "Fail") {
    return "F";
  }

  if (GRADES.includes(result.grade)) {
    return result.grade;
  }

  const average = Number(result.averageMark);

  if (!Number.isFinite(average)) return null;
  if (average >= 80) return "A+";
  if (average >= 70) return "A";
  if (average >= 60) return "A-";
  if (average >= 50) return "B";
  if (average >= 40) return "C";
  if (average >= 33) return "D";

  return "F";
};

const Overview = () => {
  const { attendanceData } = useSelector((state) => state.attendance);

  const { resultData } = useSelector((state) => state.result);

  const [selectedExamType, setSelectedExamType] = useState("All Exams");

  const [selectedAcademicYear, setSelectedAcademicYear] = useState("All Years");

  const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];

  const results = Array.isArray(resultData) ? resultData : [];

  const currentYear = new Date().getFullYear();

  // Monthly Attendance
  const attendanceChartData = Array.from({ length: 12 }, (_, index) => {
    const monthAttendance = attendanceList.filter((attendance) => {
      const attendanceDate = new Date(attendance.date);

      return (
        attendanceDate.getMonth() === index &&
        attendanceDate.getFullYear() === currentYear
      );
    });

    const total = monthAttendance.length;

    const present = monthAttendance.filter(
      (attendance) => attendance.status === "Present",
    ).length;

    const percentage =
      total > 0 ? Number(((present / total) * 100).toFixed(1)) : 0;

    return {
      month: new Date(currentYear, index).toLocaleString("default", {
        month: "short",
      }),
      attendance: percentage,
    };
  });

  const examTypes = useMemo(() => {
    return [
      ...new Set(results.map((result) => result.examType).filter(Boolean)),
    ].sort();
  }, [results]);

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const examMatch =
        selectedExamType === "All Exams" ||
        result.examType === selectedExamType;

      const yearMatch =
        selectedAcademicYear === "All Years" ||
        result.academicYear === selectedAcademicYear;

      return examMatch && yearMatch;
    });
  }, [results, selectedExamType, selectedAcademicYear]);

  const resultChartData = useMemo(() => {
    const gradeCounts = Object.fromEntries(GRADES.map((grade) => [grade, 0]));

    filteredResults.forEach((result) => {
      const grade = getGrade(result);

      if (grade && grade in gradeCounts) {
        gradeCounts[grade] += 1;
      }
    });

    return GRADES.map((grade) => ({
      grade,
      students: gradeCounts[grade],
    }));
  }, [filteredResults]);

  const academicYears = useMemo(() => {
    return [
      ...new Set(results.map((result) => result.academicYear).filter(Boolean)),
    ].sort((a, b) => b.localeCompare(a));
  }, [results]);

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {/* Attendance Overview */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Overview
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Monthly student attendance ({currentYear})
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
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />

              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
              />

              <Tooltip
                formatter={(value) => [`${value}%`, "Attendance"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
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
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Dynamic Result Overview */}
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Result Overview
            </h2>

            <p className="mt-1 text-sm text-gray-400">Students by grade</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Exam Type */}
            <select
              value={selectedExamType}
              onChange={(event) => setSelectedExamType(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-500 sm:w-auto"
            >
              <option value="All Exams">All Exams</option>

              {examTypes.map((examType) => (
                <option key={examType} value={examType}>
                  {examType}
                </option>
              ))}
            </select>

            {/* Academic Year */}
            <select
              value={selectedAcademicYear}
              onChange={(event) => setSelectedAcademicYear(event.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-violet-500 sm:w-auto"
            >
              <option value="All Years">All Years</option>

              {academicYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result Summary */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-violet-50 px-4 py-3">
          <div>
            <p className="text-xs text-gray-500">
              {selectedExamType === "All Exams"
                ? "All exam records"
                : selectedExamType}
            </p>

            <p className="mt-1 text-xl font-bold text-violet-700">
              {filteredResults.length}
            </p>
          </div>

          <span className="text-sm text-violet-600">Result records</span>
        </div>

        <div className="h-[300px] w-full">
          {filteredResults.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-medium text-gray-500">No result data found</p>

              <p className="mt-1 text-sm text-gray-400">
                Add a result to see the chart.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={resultChartData}
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
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />

                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />

                <Tooltip
                  formatter={(value) => [value, "Students"]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }}
                />

                <Bar
                  dataKey="students"
                  name="Students"
                  fill="#8B5CF6"
                  radius={[6, 6, 0, 0]}
                  barSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
