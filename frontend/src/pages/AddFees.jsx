import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import logoimage from "../assets/login-logo.png";
import { FaRegSave, FaWallet } from "react-icons/fa";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverURL } from "../App";
import { GoAlertFill } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { setFeesPaymentData } from "../redux/feesPaymentSlice";

function AddFees() {
  const [selectClass, setSelectClass] = useState("");
  const className = [
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

  const [academicYear, setAcademicYear] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddFees = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${serverURL}/api/fees-payment/add-fees`,
        {
          className: selectClass,
          academicYear,
          secretKey,
          totalAmount: Number(totalAmount),
        },
        { withCredentials: true },
      );
      setLoading(false);
      setErr("");
      console.log(result.data);
    } catch (error) {
      setLoading(false);
      console.log("Error:", error);
      setErr(error.response?.data.message);
    }
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          {/* tital */}
          <div className="flex items-center gap-3 ">
            <FaWallet size={35} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Add Fees</h1>
              <p>Record student fees details easily.</p>
            </div>
          </div>

          <div className="bg-white rounded-[8px] mt-4 p-3">
            <div className="flex items-center justify-between">
              {/* select class */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectClass}
                  onChange={(e) => setSelectClass(e.target.value)}
                  className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                >
                  <option value="">Select Class</option>
                  {className.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>
              {/* academic year */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <input
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  placeholder="2025-2026"
                  type="text"
                  className="w-50 border border-gray-300 px-2 py-1 outline-none rounded-[8px]"
                />
              </div>
              {/* secret key */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Secret Key <span className="text-red-500">*</span>
                </label>
                <input
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter secret key"
                  type="text"
                  className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>
              {/* total amounts */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Total Amount <span className="text-red-500">*</span>
                </label>
                <input
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="Enter amount"
                  type="text"
                  className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>
            </div>
            <div className="flex items-end justify-end w-60 mt-3">
              <button
                className="relative w-full overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                onClick={handleAddFees}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  {loading ? (
                    <ClipLoader color="white" />
                  ) : (
                    <>
                      <FaRegSave /> Add Fees
                    </>
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>
          </div>
          {/* add error popup */}
          {err && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-110">
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
          )}

          {/* add loading popup */}
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
                  Add the Fees per class.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddFees;
