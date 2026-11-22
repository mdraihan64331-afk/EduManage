import React, { useState } from "react";
import { SiGoogleclassroom } from "react-icons/si";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiResetLeftFill } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../App";

function AddTotalClassRoomAndFees() {
  const [className, setClassName] = useState("");
  const selectClass = [
    "Class 1",
    "Class 2",
    "Class 3",
    "Class 4",
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
  ];
  const [classFees, setClassFees] = useState("");
  const [totalClassRoom, setTotalClassRoom] = useState("");
  const navigate = useNavigate();

  const handleAddClassRoomAndFees = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/classes/add-total-class-room-and-fees`,
        { className, fees: classFees, totalClassRoom },
        { withCredentials: true },
      );

      console.log(result.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleReset = () => {
    setClassName("");
    setClassFees("");
    setTotalClassRoom("");
  };
  return (
    <div className="flex bg-blue-50 h-[100vh]">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          {/* Class & Section Management text */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <SiGoogleclassroom size={35} className="text-green-700" />
              <div>
                <h1 className="font-bold text-2xl">
                  Add Total Class Room and Fees
                </h1>
                <p>
                  Manage classes, sections, subjects and class teacher. You can
                  also view students in each class.
                </p>
              </div>
            </div>
            {/* back button */}
            <button
              className="flex gap-2 items-center px-4 py-1 bg-white rounded-[8px] shadow cursor-pointer"
              onClick={() => navigate("/admin-dashboard/classes")}
            >
              <IoIosArrowDown className="rotate-90" /> Back to List
            </button>
          </div>

          <div className="p-3 mt-5 rounded-[8px] shadow bg-white">
            <div className="flex items-center gap-5">
              <div className="flex flex-col gap-2">
                <label>
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
                >
                  <option>Select Class</option>
                  {selectClass.map((e, index) => (
                    <option key={index} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Class Fees <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center w-40 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                  <input
                    type="text"
                    value={classFees}
                    onChange={(e) => setClassFees(e.target.value)}
                    placeholder="Class Fees"
                    className="outline-none w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Total Class Room<span className="text-red-500">*</span>
                </label>
                <div className="flex items-center w-40 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                  <input
                    type="text"
                    value={totalClassRoom}
                    onChange={(e) => setTotalClassRoom(e.target.value)}
                    placeholder="Total class room"
                    className="outline-none w-full"
                  />
                </div>
              </div>
              {/* reset button */}
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                onClick={handleReset}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <RiResetLeftFill /> Reset
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>

              {/* add class room and fees */}
              <button
                className="relative mt-3 overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                onClick={handleAddClassRoomAndFees}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <IoMdAdd /> Add Class Room And Fees
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTotalClassRoomAndFees;
