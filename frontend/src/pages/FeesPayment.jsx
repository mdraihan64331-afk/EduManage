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
import { RiResetLeftFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BsPeopleFill } from "react-icons/bs";
import { TbCurrencyTaka } from "react-icons/tb";

function FeesPayment() {
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

  const getAcademicYear = () => {
    const currentYear = new Date().getFullYear();

    return `${currentYear}-${currentYear + 1}`;
  };
  const currentAcademicYear = getAcademicYear();
  const [academicYear, setAcademicYear] = useState(currentAcademicYear);
  const [secretKey, setSecretKey] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { studentData } = useSelector((state) => state.student);
  const { feesPaymentData } = useSelector((state) => state.feesPayment);
  const now = new Date();

  const thisMonthStudentJoined = studentData.filter((student) => {
    const admissionDate = new Date(student.admissionDate);

    return (
      admissionDate.getMonth() === now.getMonth() &&
      admissionDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const totalFeesAmount = feesPaymentData.reduce((total, fee) => {
    if (fee.academicYear !== currentAcademicYear) {
      return total;
    }

    const studentCount = studentData.filter(
      (student) => student.className === fee.className,
    ).length;

    return total + studentCount * Number(fee.totalAmount || 0);
  }, 0);

  console.log("Current Year:", currentAcademicYear);
  console.log("Fees Data:", feesPaymentData);
  console.log("Student Data:", studentData);

  const handleFeesPayment = async () => {
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
              <h1 className="text-2xl font-bold">Fees / Payments</h1>
              <p>Manage student fees, track payments and view due details.</p>
            </div>
          </div>

          <div className="bg-white rounded-[8px] mt-4 p-3 shadow">
            <div className="flex items-center justify-between">
              {/* select class */}
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Class <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectClass}
                  onChange={(e) => setSelectClass(e.target.value)}
                  className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
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
                  value={currentAcademicYear}
                  readOnly
                  type="text"
                  className="w-40 border border-gray-300 px-2 py-1 outline-none rounded-[8px]"
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
                  className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
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
                  className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>
              <div className="flex items-center gap-4 mt-3">
                <button
                  className="relative w-full overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  onClick={handleFeesPayment}
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
                <button
                  className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
                  //   onClick={hangleReset}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    <RiResetLeftFill /> Reset
                  </span>
                  <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between gap-4">
              {/* total student */}
              <div className="h-30 w-full flex items-center bg-white gap-4 p-3 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <BsPeopleFill size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400">Total Students</p>
                  <h1 className="font-bold text-2xl">{studentData.length}</h1>
                  <p className="text-xs text-blue-600">
                    +{thisMonthStudentJoined} new this month
                  </p>
                </div>
              </div>

              {/* total fees */}
              <div className="h-30 w-full flex items-center bg-white gap-4 p-3 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <TbCurrencyTaka size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400">
                    Total Fees (This Year)
                  </p>
                  <h1 className="font-bold text-2xl flex items-center gap-1">
                    <TbCurrencyTaka />
                    {totalFeesAmount.toLocaleString("en-BD")}
                  </h1>
                  <p className="text-xs text-green-600">+12% from last year</p>
                </div>
              </div>

              {/* total paid */}
              <div className="h-30 w-full flex items-center bg-white gap-4 p-3 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <TbCurrencyTaka size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400">Total Paid</p>
                  <h1 className="font-bold text-2xl flex items-center gap-1">
                    <TbCurrencyTaka />
                    {(12000).toLocaleString("en-BD")}
                  </h1>
                  <p className="text-xs text-green-600">50% from total</p>
                </div>
              </div>
              {/* total due */}
              <div className="h-30 w-full flex items-center bg-white gap-4 p-3 shadow rounded-xl">
                <div className="bg-red-100 rounded-xl p-2">
                  <IoPerson size={25} className="text-red-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-400">Total Due</p>
                  <h1 className="font-bold text-2xl flex items-center gap-1">
                    <TbCurrencyTaka />
                    {(12000).toLocaleString("en-BD")}
                  </h1>
                  <p className="text-xs text-red-600">50% remaining</p>
                </div>
              </div>
            </div>
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
  );
}

export default FeesPayment;
