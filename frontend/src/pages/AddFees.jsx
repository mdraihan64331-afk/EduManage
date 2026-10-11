import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { FaRegSave, FaWallet } from "react-icons/fa";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverURL } from "../App";

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
  const [loading, setLoading] = useState(false);

  const handleAddFees = async () => {
    try {
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

      console.log(result.data);
    } catch (error) {
      console.log("Error:", error);
      console.log("Status:", error.response?.status);
      console.log("Backend message:", error.response?.data);
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
        </div>
      </div>
    </div>
  );
}

export default AddFees;
