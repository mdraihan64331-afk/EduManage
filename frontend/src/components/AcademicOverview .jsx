import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
} from "lucide-react";

const AcademicOverview = () => {
  const attendance = [
    {
      label: "Present",
      value: 83,
      color: "bg-emerald-500",
      dot: "bg-emerald-500",
    },
    {
      label: "Absent",
      value: 6,
      color: "bg-indigo-600",
      dot: "bg-indigo-600",
    },
    {
      label: "Leave",
      value: 2,
      color: "bg-rose-500",
      dot: "bg-rose-500",
    },
    {
      label: "Late",
      value: 1,
      color: "bg-violet-600",
      dot: "bg-violet-600",
    },
  ];

  return (
    <div className="w-full rounded-xl border border-slate-100 bg-white p-5 shadow-sm">
      
      {/* Header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center text-emerald-600">
          <Users size={22} strokeWidth={2} />
        </div>

        <h2 className="text-[15px] font-semibold text-slate-800">
          Academic Overview
        </h2>
      </div>

      {/* Chart + Attendance */}
      <div className="flex items-center justify-between gap-4">
        
        {/* Donut Chart */}
        <div className="relative flex h-[120px] w-[120px] shrink-0 items-center justify-center">
          
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(#059669 0deg 332deg, #e2e8f0 332deg 360deg)",
            }}
          />

          {/* Inner circle */}
          <div className="absolute inset-[9px] flex flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[24px] font-semibold leading-none text-slate-800">
              92.3%
            </span>

            <span className="mt-2 text-[11px] text-slate-500">
              Overall GPA
            </span>
          </div>
        </div>

        {/* Attendance Details */}
        <div className="flex flex-1 flex-col gap-[13px]">
          {attendance.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-[9px] w-[9px] rounded-full ${item.dot}`}
                />

                <span className="text-[12px] text-slate-600">
                  {item.label}
                </span>
              </div>

              <span className="text-[12px] font-semibold text-slate-700">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Statistics */}
      <div className="mt-5 grid grid-cols-3 border-t border-slate-100 pt-4">
        
        {/* Total Classes */}
        <div className="border-r border-slate-100 px-2 first:pl-0">
          <div className="mb-1 flex items-center gap-1.5">
            <CalendarDays
              size={10}
              className="text-slate-400"
            />

            <span className="text-[9px] text-slate-400">
              Total Classes
            </span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-yellow-500">●</span>
            92
          </p>
        </div>

        {/* Attended */}
        <div className="border-r border-slate-100 px-3">
          <div className="mb-1 flex items-center gap-1.5">
            <UserCheck
              size={10}
              className="text-slate-400"
            />

            <span className="text-[9px] text-slate-400">
              Attended
            </span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-emerald-400">●</span>
            83
          </p>
        </div>

        {/* Absent */}
        <div className="px-3 pr-0">
          <div className="mb-1 flex items-center gap-1.5">
            <UserX
              size={10}
              className="text-slate-400"
            />

            <span className="text-[9px] text-slate-400">
              Absent
            </span>
          </div>

          <p className="text-[13px] font-semibold text-slate-700">
            <span className="mr-1 text-slate-400">●</span>
            6
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcademicOverview;