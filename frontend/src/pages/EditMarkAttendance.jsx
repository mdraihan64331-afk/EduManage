import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverURL } from "../App";
import { setAttendanceData } from "../redux/attendanceSlice";

function EditMarkAttendance() {
  const { id } = useParams();

  const { attendanceData } = useSelector((state) => state.attendance);

  const [attendance, setAttendance] = useState(null);
  const [status, setStatus] = useState("");
  const [remark, setRemark] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectStatus = ["Present", "Absent", "Late"];

  // Find attendance by ID
  useEffect(() => {
    if (attendanceData?.length > 0) {
      const findAttendance = attendanceData.find((item) => item._id === id);

      if (findAttendance) {
        setAttendance(findAttendance);
        setStatus(findAttendance.status || "Absent");
        setRemark(findAttendance.remark || "");
      }
    }
  }, [attendanceData, id]);

  // Update Attendance
  const handleUpdate = async () => {
    try {
      console.log("ID:", id);

      console.log("URL:", `${serverURL}/api/attendance/edit-attendance/${id}`);

      const result = await axios.put(
        `${serverURL}/api/attendance/edit-attendance/${id}`,
        {
          status,
          remark,
        },
        {
          withCredentials: true,
        },
      );

      const updatedAttendance = result.data.attendance;

      // Redux data update
      const updatedData = attendanceData.map((item) =>
        item._id === updatedAttendance._id ? updatedAttendance : item,
      );

      dispatch(setAttendanceData(updatedData));
      navigate("/attendances/attendance-report");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Menu />

      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          {/* Header */}
          <div className="flex items-center gap-3">
            <MdOutlineModeEdit size={35} className="text-green-700" />

            <div>
              <h1 className="text-2xl font-bold">Edit Attendance</h1>

              <p className="text-gray-600">Edit and save student attendance.</p>
            </div>
          </div>

          {/* Table */}
          <div className="mt-4 bg-white rounded-lg overflow-x-auto border border-gray-200">
            <table className="w-full min-w-[900px]">
              <thead className="font-semibold text-slate-700">
                <tr className="bg-blue-50 border-b border-gray-200 text-gray-600">
                  <th className="text-left py-3 px-3">Photo</th>

                  <th className="text-left py-3 px-3">Student Name</th>

                  <th className="text-left py-3 px-3">Roll No</th>

                  <th className="text-left py-3 px-3">Section</th>

                  <th className="text-left py-3 px-3">Class</th>

                  <th className="text-left py-3 px-3">Status</th>

                  <th className="text-left py-3 px-3">Remark</th>

                  <th className="text-left py-3 px-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {attendance ? (
                  <tr className="bg-white border-b border-gray-200">
                    {/* Photo */}
                    <td className="py-3 px-3">
                      {attendance.student?.image ? (
                        <img
                          src={attendance.student?.image}
                          alt={attendance.student?.fullName}
                          className="w-11 h-11 rounded-full object-cover"
                        />
                      ) : (
                        <h1 className="w-11 h-11 rounded-full flex justify-center items-center bg-purple-700 text-white">
                          {attendance.student?.fullName
                            .slice(0, 1)
                            .toUpperCase()}
                        </h1>
                      )}
                    </td>

                    {/* Student Name */}
                    <td className="py-3 px-3 font-semibold capitalize">
                      {attendance.student?.fullName}
                    </td>

                    {/* Roll Number */}
                    <td className="py-3 px-3">
                      {attendance.student?.rollNumber}
                    </td>

                    {/* Section */}
                    <td className="py-3 px-3">{attendance.student?.section}</td>

                    {/* Class */}
                    <td className="py-3 px-3">
                      {attendance.student?.className}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`w-30 border border-gray-300  rounded-lg px-3 py-2 outline-none ${status === "Present" ? "bg-green-100 text-green-600" : status === "Absent" ? "bg-red-100 text-red-600" : status === "Late" ? "bg-amber-100 text-orange-400" : "bg-white"}`}
                      >
                        {selectStatus.map((e, index) => (
                          <option value={e} key={index}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Remark */}
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        placeholder="Enter remark"
                        className="border border-gray-300 rounded-md px-3 py-2 outline-none w-40"
                      />
                    </td>

                    {/* Update Button */}
                    <td className="py-3 px-3">
                      <button
                        onClick={handleUpdate}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                      >
                        Save
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-gray-500">
                      Attendance not found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMarkAttendance;
