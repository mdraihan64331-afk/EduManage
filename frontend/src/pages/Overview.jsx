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

const attendanceData = [
  { month: "Jan", attendance: 92 },
  { month: "Feb", attendance: 88 },
  { month: "Mar", attendance: 94 },
  { month: "Apr", attendance: 90 },
  { month: "May", attendance: 96 },
  { month: "Jun", attendance: 91 },
  { month: "Jul", attendance: 93 },
  { month: "Aug", attendance: 89 },
  { month: "Sep", attendance: 95 },
  { month: "Oct", attendance: 92 },
  { month: "Nov", attendance: 94 },
  { month: "Dec", attendance: 97 },
];

const resultData = [
  { grade: "A+", students: 45 },
  { grade: "A", students: 68 },
  { grade: "B", students: 42 },
  { grade: "C", students: 25 },
  { grade: "D", students: 12 },
  { grade: "F", students: 5 },
];

const Overview = () => {
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
              data={attendanceData}
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

// import { useEffect, useState } from "react";
// import axios from "axios";

// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Overview = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [resultData, setResultData] = useState([]);

//   useEffect(() => {
//     const getOverview = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:8000/api/dashboard/overview",
//           {
//             withCredentials: true,
//           }
//         );

//         setAttendanceData(res.data.attendance);
//         setResultData(res.data.results);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getOverview();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

//       {/* Attendance */}
//       <div className="rounded-2xl bg-white p-5 shadow-sm">

//         <div className="mb-5">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Attendance Overview
//           </h2>

//           <p className="mt-1 text-sm text-gray-400">
//             Monthly student attendance
//           </p>
//         </div>

//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={attendanceData}>

//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#E5E7EB"
//               />

//               <XAxis
//                 dataKey="month"
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <YAxis
//                 domain={[0, 100]}
//                 axisLine={false}
//                 tickLine={false}
//                 tickFormatter={(value) => `${value}%`}
//               />

//               <Tooltip
//                 formatter={(value) => [
//                   `${value}%`,
//                   "Attendance",
//                 ]}
//               />

//               <Line
//                 type="monotone"
//                 dataKey="attendance"
//                 stroke="#6366F1"
//                 strokeWidth={3}
//                 dot={{ r: 4 }}
//                 activeDot={{ r: 6 }}
//               />

//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>


//       {/* Result */}
//       <div className="rounded-2xl bg-white p-5 shadow-sm">

//         <div className="mb-5">
//           <h2 className="text-lg font-semibold text-gray-800">
//             Result Overview
//           </h2>

//           <p className="mt-1 text-sm text-gray-400">
//             Students by grade
//           </p>
//         </div>

//         <div className="h-[300px]">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={resultData}>

//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#E5E7EB"
//               />

//               <XAxis
//                 dataKey="grade"
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <YAxis
//                 axisLine={false}
//                 tickLine={false}
//               />

//               <Tooltip />

//               <Bar
//                 dataKey="students"
//                 fill="#8B5CF6"
//                 radius={[6, 6, 0, 0]}
//               />

//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Overview;