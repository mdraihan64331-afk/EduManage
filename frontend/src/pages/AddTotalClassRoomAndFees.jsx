import React, { useState } from "react";
import logoimage from "../assets/login-logo.png";
import { SiGoogleclassroom } from "react-icons/si";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";
import { IoIosArrowDown, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiResetLeftFill } from "react-icons/ri";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setClassFees } from "../redux/classRoomAndFeesSlice";
import { GoAlertFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

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
  const [classFees, setClassFee] = useState("");
  const [totalClassRoom, setTotalClassRoom] = useState("");
  const [loading, setLoading] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddClassRoomAndFees = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverURL}/api/classes/add-total-class-room-and-fees`,
        { className, fees: classFees, totalClassRoom },
        { withCredentials: true },
      );

      const result = await axios.get(
        `${serverURL}/api/classes/get-all-total-class-room-and-fees`,
        { withCredentials: true },
      );

      dispatch(setClassFees(result.data));
      setLoading(false);
      setErr("");
      navigate("/admin-dashboard/classes");
      console.log(result.data);
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  const handleReset = () => {
    setClassName("");
    setClassFee("");
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
            <div className="flex items-center justify-between">
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
                    onChange={(e) => setClassFee(e.target.value)}
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
                className="relative mt-7 overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                onClick={handleReset}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <RiResetLeftFill /> Reset
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
              </button>

              {/* add class room and fees */}
              <button
                className="relative mt-7 overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                onClick={handleAddClassRoomAndFees}
                disabled={loading}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <IoMdAdd /> Add Class Room And Fees
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>

              {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                  {/* Loading Card */}
                  <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 sm:px-12 shadow-2xl text-center">
                    {/* Spinner + Logo */}
                    <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">
                      {/* Spinner */}
                      <div className="absolute inset-0 rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500 animate-spin"></div>

                      {/* Logo Circle */}
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                        <img
                          src={logoimage}
                          alt="EduManage"
                          className="h-20 w-20 object-contain"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[#102A5C]">
                      Please wait...
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-base text-slate-500">
                      Create the student payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {err && (
            <>
              <div className="fixed inset-0 z-20 bg-black/50 flex justify-center items-center">
                <div className="bg-white p-5 rounded-[8px]">
                  <div
                    className="flex justify-end text-gray-600 cursor-pointer"
                    onClick={() => setErr("")}
                  >
                    <RxCross2 />
                  </div>
                  <div className="flex flex-col justify-center items-center gap-2">
                    <div className=" p-3 rounded-full bg-red-100 text-red-500">
                      <GoAlertFill size={30} />
                    </div>
                    <h1 className="text-xl font-bold">Something went wrong</h1>
                    <p className="text-gray-500">Please try again latet.</p>
                    <div className="bg-red-100 border border-red-700 w-full p-4 rounded-[8px]">
                      <div className="flex items-center gap-3 text-red-500">
                        <GoAlertFill size={30} />
                        {err}
                      </div>
                    </div>
                    <button
                      className="bg-red-600 cursor-pointer px-15 text-white py-2 rounded-[8px]"
                      onClick={() => setErr("")}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTotalClassRoomAndFees;
