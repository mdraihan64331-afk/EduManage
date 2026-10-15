import React, { useEffect, useState } from "react";
import Menu from "../pages/Menu";
import AdminHeader from "./AdminHeader";
import { IoWallet } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import axios from "axios";
import { serverURL } from "../App";
import { FaMoneyBill, FaRegCalendarAlt, FaRegSave } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { TbCurrencyTaka } from "react-icons/tb";

function AddPayment() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const method = ["Cash", "Bkash", "Bank Transfer", "Nagad"];
  const [paidDate, setPaidDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fatchStudent = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/student/student/${id}`,
          { withCredentials: true },
        );

        setStudent(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchStudent();
  }, [id]);
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <IoWallet size={35} className="text-green-700" />
              <div>
                <h1 className="text-2xl font-bold">Add Payments</h1>
                <p>Add payment to easily.</p>
              </div>
            </div>
            <div>
              {/* back button */}
              <button
                className="flex gap-2 items-center px-4 py-1 bg-white rounded-[8px] shadow cursor-pointer"
                onClick={() => navigate("/fees-payments")}
              >
                <IoIosArrowDown className="rotate-90" /> Back to Fees/Payments
              </button>
            </div>
          </div>

          <div className="p-2 mt-3 bg-white shadow rounded-[8px]">
            <div className=" flex items-center gap-2 font-semibold">
              <BsPersonFill size={20} />
              Student Details
            </div>

            {/* student details */}
            <div className="pb-2 flex items-center justify-between border-b-[1.5px] border-gray-300">
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  class <span className="text-red-500">*</span>
                </label>
                <input
                  value={student?.className}
                  readOnly
                  type="text"
                  className="w-50 border outline-none border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Section <span className="text-red-500">*</span>
                </label>
                <input
                  value={student?.section}
                  readOnly
                  type="text"
                  className="w-50 border outline-none border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="">
                  Student <span className="text-red-500">*</span>
                </label>
                <input
                  value={`${student?.fullName} (${student?.studentId})`}
                  readOnly
                  type="text"
                  className="w-70 border outline-none capitalize border-gray-300 px-2 py-1 rounded-[8px]"
                />
              </div>

              {/* student card */}
              <div className="flex items-center w-[283px] border-gray-300 border rounded-[8px] py-3 px-4 gap-3">
                <div>
                  {student?.image ? (
                    <img
                      src={student?.image}
                      alt={student?.image}
                      className="h-15 w-15 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center bg-purple-700 h-15 w-15 rounded-full text-white">
                      {student?.fullName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="capitalize font-semibold">
                    {student?.fullName}
                  </h2>
                  <div className="flex items-center gap-2 text-[14px] text-gray-500">
                    <p>{student?.studentId}</p>
                    <span className="w-[1.5px] h-3 bg-gray-400"></span>
                    <p>{`${student?.className} - ${student?.section}`}</p>
                  </div>
                  <p className="text-[14px] text-gray-500">
                    Roll No: {student?.rollNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 font-semibold">
              <FaMoneyBill size={20} className="text-green-600" />
              Fee Details
            </div>

            {/* fee details */}
            <div className="mt-2 flex items-center justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-1 border outline-none border-gray-300 px-2 py-1 rounded-[8px]">
                      <TbCurrencyTaka />
                      <input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        type="text"
                        className="outline-none w-50"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Payment Method <span className="text-red-500">*</span>
                    </label>
                    <select className="w-50 border outline-none border-gray-300 px-2 py-1 rounded-[8px]">
                      <option>Select Payment Method</option>
                      {method.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Payment Date <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-1 border outline-none capitalize border-gray-300 px-2 py-1 rounded-[8px]">
                        <FaRegCalendarAlt />
                      <input
                        value={paidDate}
                        readOnly
                        type="date"
                        className="outline-none w-50"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">Description / Remark</label>
                    <textarea
                      placeholder="Description"
                      rows={3}
                      className="w-full border resize-none outline-none capitalize border-gray-300 px-2 py-1 rounded-[8px]"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* payment summary */}
              <div className="bg-green-100 w-[283px] rounded-[8px] px-4 py-3 ">
                <h2 className="text-xl font-semibold">Payment Summary</h2>

                {/* amount */}
                <div className="flex flex-col gap-3 mt-3">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Total Fee</p>
                    <p>12,000</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Paid Amount</p>
                    <p>12,000</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Due Amount</p>
                    <p>12,000</p>
                  </div>
                </div>
                <button
                  className="relative w-full mt-3 overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                  //   onClick={handleFeesPayment}
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                    {loading ? (
                      <ClipLoader color="white" />
                    ) : (
                      <>
                        <FaRegSave /> Save Payment
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
    </div>
  );
}

export default AddPayment;
