import React from "react";
import logoimage from "../assets/login-logo.png";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { IoPersonSharp, IoWallet } from "react-icons/io5";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosSearch, IoMdAdd } from "react-icons/io";
import { FaPlus, FaTicketAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { RxCross2 } from "react-icons/rx";
import { GoAlertFill } from "react-icons/go";
import { setPaymentData } from "../redux/paymentSlice";

function AddPayment() {
  const { studentData } = useSelector((state) => state.student);
  const [input, setInput] = useState("");
  const [student, setStudent] = useState("");
  const [feesType, setFeesType] = useState("");
  const fees = ["Monthly Fee", "Exam Fee", "Registration Fee"];
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const payment = ["Bkash", "Nagad", "Bank Transfer", "Cash"];
  const [paymentDate, setPaymentDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );
  const [remark, setRemark] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedStudent = studentData?.find((e) => e._id === student);

  const filteredStudent = Array.isArray(studentData)
    ? studentData.filter((student) => {
        const matchInput = student?.studentId
          .toLowerCase()
          .toString()
          .includes(input.toLowerCase());

        return matchInput;
      })
    : [];

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${serverURL}/api/fees-payment/add-fees-payment`,
        {
          student,
          feesType,
          amount: Number(amount),
          paymentMethod,
          paymentDate,
          remark,
        },
        { withCredentials: true },
      );

      const result = await axios.get(
        `${serverURL}/api/fees-payment/all-payments`,
        { withCredentials: true },
      );

      dispatch(setPaymentData(result.data));
      setLoading(false);
      setErr("");
      navigate("/admin-dashboard/fees-payments/payment-list");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };
  return (
    <div className="flex bg-blue-50 h-[100vh]">
      <Menu />
      {/* fees payment add section */}

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />
        {/* add fees payment */}
        <div className="p-2">
          {/* add new fees payment */}
          <div className="flex items-center gap-4">
            <IoWallet size={40} className="text-green-700" />
            <div>
              <h1 className="font-bold text-xl">Add New Fees & Payment</h1>
              <p>Create a new fees & payment for students.</p>
            </div>
          </div>

          <div className="p-3 mt-5 rounded-[8px] shadow bg-white">
            <div className="flex items-center gap-3">
              <IoPersonSharp />
              <h4>Select Student</h4>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex mt-3 items-center gap-3">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Search <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center w-80 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                    <IoIosSearch size={20} />
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => {
                        const value = e.target.value;
                        setInput(value);

                        const matchedStudent = studentData.find(
                          (s) =>
                            s.studentId?.toLowerCase() === value.toLowerCase(),
                        );

                        if (matchedStudent) {
                          setStudent(matchedStudent._id);
                        } else {
                          setStudent("");
                        }
                      }}
                      placeholder="Search by student ID..."
                      className="outline-none w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Student <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                    className="w-80 border border-gray-300 px-2 py-1 rounded-[8px]"
                  >
                    <option value="">Select Student</option>

                    {filteredStudent.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.fullName} ({e.studentId})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="py-1 px-3 border border-gray-300 rounded-[8px]">
                {selectedStudent ? (
                  <div className="flex items-center gap-3">
                    <div className="h-15 w-15 rounded-full overflow-hidden">
                      {selectedStudent.image ? (
                        <img
                          src={selectedStudent.image}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="bg-purple-700 w-full h-full text-white flex items-center justify-center font-semibold">
                          {selectedStudent.fullName?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div>
                      <h1 className="capitalize font-semibold">
                        {selectedStudent.fullName}
                      </h1>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <p>{selectedStudent.studentId}</p>
                        <span>|</span>
                        <p>{selectedStudent.className}</p>
                      </div>

                      <p className="text-xs text-gray-400">
                        Roll No: {selectedStudent.rollNumber}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <div className="h-15 w-15 rounded-full flex items-center justify-center">
                      <div className="bg-purple-700 w-full h-full text-white flex items-center justify-center font-semibold rounded-full"></div>
                    </div>
                    <div>
                      <h1 className="capitalize font-semibold">Name</h1>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <p>Id</p>
                        <span className="h-2 w-[1px] bg-gray-300"></span>
                        <p>Class Name</p>
                      </div>
                      <p className="text-xs text-gray-400">Roll No:</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <FaTicketAlt />
                  <h4>Fee Details</h4>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-5 justify-between">
                    <div className="flex flex-col gap-2">
                      <label>
                        Fee Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={feesType}
                        onChange={(e) => setFeesType(e.target.value)}
                        className="w-40 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option>Select Fee Type</option>
                        {fees.map((e, index) => (
                          <option key={index} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center w-40 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                        <input
                          type="text"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Amount"
                          className="outline-none w-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Payment Method <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                      >
                        <option>Select Payment Method</option>
                        {payment.map((e, index) => (
                          <option key={index} value={e}>
                            {e}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="">
                        Amount <span className="text-red-500">*</span>
                      </label>
                      <div className="flex items-center w-40 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                        <input
                          type="date"
                          value={paymentDate}
                          readOnly
                          className="outline-none w-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="">
                      Description / Remark{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="e.g.September 2026 tuition fee"
                      rows={4}
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="outline-none p-2 border border-gray-300 rounded-[8px] resize-none"
                    ></textarea>
                  </div>
                </div>
                <div className="bg-green-50 rounded-[8px] p-2 w-[233px]">
                  <h4 className="font-bold">Payment Summary</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-3 text-gray-500">
                      <p>Total Fee</p>
                      <p>Paid Amount</p>
                      <p>Due Amount</p>
                    </div>
                    <div className="flex flex-col gap-3 font-semibold">
                      <p className="flex items-center gap-2">
                        <TbCurrencyTaka />
                        {Number(12000).toLocaleString("en-BD")}
                      </p>
                      <p className="flex items-center gap-2">
                        <TbCurrencyTaka />
                        {Number(amount).toLocaleString("en-BD")}
                      </p>
                      <p className="flex items-center gap-2">
                        <TbCurrencyTaka />
                        {Number(12000 - amount).toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>
                  <button
                    className="relative mt-3 w-full overflow-hidden flex items-center justify-center gap-2 px-5 py-1.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      {loading ? (
                        <ClipLoader color="white" />
                      ) : (
                        <>
                          <IoMdAdd /> Add Payment
                        </>
                      )}
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
            </div>
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
  );
}

export default AddPayment;
