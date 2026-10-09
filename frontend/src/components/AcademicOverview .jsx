import React, { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";

const AcademicOverview = ({ studentId }) => {
  const { attendanceData } = useSelector((state) => state.attendance);

  const attendanceList = Array.isArray(attendanceData) ? attendanceData : [];

  // Current month
  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  // Month name
  const monthName = new Date(selectedYear, selectedMonth).toLocaleString(
    "en-US",
    {
      month: "long",
    },
  );

  // Previous Month
  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((prev) => prev - 1);
    } else {
      setSelectedMonth((prev) => prev - 1);
    }
  };

  // Next Month
  const handleNextMonth = () => {
    const now = new Date();

    const isCurrentMonth =
      selectedYear === now.getFullYear() && selectedMonth === now.getMonth();

    // Future month prevent
    if (isCurrentMonth) return;

    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((prev) => prev + 1);
    } else {
      setSelectedMonth((prev) => prev + 1);
    }
  };

  // Filter Student Attendance
  const studentAttendance = useMemo(() => {
    return attendanceList.filter((attendance) => {
      if (!attendance.student || !attendance.date) {
        return false;
      }

      const attendanceStudentId =
        typeof attendance.student === "object"
          ? attendance.student._id
          : attendance.student;

      // Student check
      if (attendanceStudentId !== studentId) {
        return false;
      }

      const attendanceDate = new Date(attendance.date);

      // Month + Year check
      return (
        attendanceDate.getMonth() === selectedMonth &&
        attendanceDate.getFullYear() === selectedYear
      );
    });
  }, [attendanceList, studentId, selectedMonth, selectedYear]);

  // Attendance Count
  const present = studentAttendance.filter(
    (item) => item.status === "Present",
  ).length;

  const absent = studentAttendance.filter(
    (item) => item.status === "Absent",
  ).length;

  const late = studentAttendance.filter(
    (item) => item.status === "Late",
  ).length;

  const totalClasses = studentAttendance.length;

  // Attendance Percentage
  const attendancePercentage =
    totalClasses > 0 ? ((present / totalClasses) * 100).toFixed(1) : 0;

  // Donut Chart Degrees
  const presentDegree = totalClasses > 0 ? (present / totalClasses) * 360 : 0;

  const absentDegree = totalClasses > 0 ? (absent / totalClasses) * 360 : 0;

  const lateStartDegree = presentDegree + absentDegree;

  // Attendance Items
  const attendance = [
    {
      label: "Present",
      value: present,
      dot: "bg-green-600",
    },
    {
      label: "Absent",
      value: absent,
      dot: "bg-red-600",
    },
    {
      label: "Late",
      value: late,
      dot: "bg-orange-400",
    },
  ];

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      {/* ================= HEADER ================= */}
      <div className="mb-5 flex items-center justify-between gap-3">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center text-emerald-600">
            <Users size={22} strokeWidth={2} />
          </div>

          
        </div>

        {/* ================= MONTH NAVIGATION ================= */}
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1">
          {/* Previous */}
          <button
            type="button"
            onClick={handlePreviousMonth}
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-700"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Month */}
          <span className="min-w-[90px] px-1 text-center text-[11px] font-semibold text-slate-700">
            {monthName} {selectedYear}
          </span>

          {/* Next */}
          <button
            type="button"
            onClick={handleNextMonth}
            disabled={
              selectedYear === currentDate.getFullYear() &&
              selectedMonth === currentDate.getMonth()
            }
            className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 transition hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ================= CHART + DETAILS ================= */}
      <div className="flex items-center justify-between gap-4">
        {/* ================= DONUT CHART ================= */}
        <div className="relative flex h-[120px] w-[120px] shrink-0 items-center justify-center">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                totalClasses > 0
                  ? `conic-gradient(
                      #059669 0deg ${presentDegree}deg,
                      #dc2626 ${presentDegree}deg ${
                        presentDegree + absentDegree
                      }deg,
                      #fb923c ${lateStartDegree}deg 360deg
                    )`
                  : "#e2e8f0",
            }}
          />

          {/* Inner Circle */}
          <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[24px] font-semibold leading-none text-slate-800">
              {attendancePercentage}%
            </span>

            <span className="mt-2 text-[11px] text-slate-500">Attendance</span>
          </div>
        </div>

        {/* ================= ATTENDANCE DETAILS ================= */}
        <div className="flex flex-1 flex-col gap-[13px]">
          {attendance.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`h-[9px] w-[9px] rounded-full ${item.dot}`} />

                <span className="text-[12px] text-slate-600">{item.label}</span>
              </div>

              <span className="text-[12px] font-semibold text-slate-700">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= BOTTOM STATISTICS ================= */}
      <div className="mt-5 grid grid-cols-3 border-t border-slate-100 pt-4">
        {/* Total Classes */}
        <div className="border-r border-slate-100 px-2 first:pl-0">
          <div className="mb-1 flex items-center gap-1.5">
            <CalendarDays size={10} className="text-slate-400" />

            <span className="text-[9px] text-slate-400">Total Classes</span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-yellow-500">●</span>

            {totalClasses}
          </p>
        </div>

        {/* Present */}
        <div className="border-r border-slate-100 px-3">
          <div className="mb-1 flex items-center gap-1.5">
            <UserCheck size={10} className="text-slate-400" />

            <span className="text-[9px] text-slate-400">Present</span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-green-600">●</span>

            {present}
          </p>
        </div>

        {/* Absent */}
        <div className="px-3 pr-0">
          <div className="mb-1 flex items-center gap-1.5">
            <UserX size={10} className="text-slate-400" />

            <span className="text-[9px] text-slate-400">Absent</span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-red-600">●</span>

            {absent}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicOverview;
