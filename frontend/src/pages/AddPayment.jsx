import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { IoPersonSharp, IoWallet } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { FaTicketAlt } from "react-icons/fa";

function AddPayment() {
  const { studentData } = useSelector((state) => state.student);
  const [input, setInput] = useState("");
  const [student, setStudent] = useState("");
  const [feeType, setFeeType] = useState("");
  const fees = ["Monthly Fee", "Exam Fee", "Registration Fee"];
  const [amount, setAmount] = useState("");
  const [payment, setPayment] = useState("");
  const paymentMethod = ["Bkash", "Nagad", "Bank Transfer", "Cash"];
  const [paymentDate, setPaymentDate] = useState(
    new Date().toLocaleDateString("en-CA"),
  );

  const filteredStudent = Array.isArray(studentData)
    ? studentData.filter((student) => {
        const matchInput = student?.studentId
          .toLowerCase()
          .toString()
          .includes(input.toLowerCase());

        return matchInput;
      })
    : [];

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
                      onChange={(e) => setInput(e.target.value)}
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
                    {input ? (
                      <div>
                        {filteredStudent.map((e, index) => (
                          <option key={index}>
                            {e.fullName}({e.studentId})
                          </option>
                        ))}
                      </div>
                    ) : (
                      <option>Not found</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="py-1 px-3 border border-gray-300 rounded-[8px]">
                {input ? (
                  <div>
                    {filteredStudent.slice(0, 1).map((e, index) => (
                      <div
                        key={e._id}
                        className="flex items-center justify-center gap-3"
                      >
                        <div className="h-15 w-15 rounded-full flex items-center justify-center">
                          {e?.image ? (
                            <img
                              src={e?.image}
                              alt={e?.fullName}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <div className="bg-purple-700 w-full h-full text-white flex items-center justify-center font-semibold rounded-full">
                              <h1>{e?.fullName.slice(0, 1).toUpperCase()}</h1>
                            </div>
                          )}
                        </div>
                        <div>
                          <h1 className="capitalize font-semibold">
                            {e?.fullName}
                          </h1>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <p>{e?.studentId}</p>
                            <span className="h-2 w-[1px] bg-gray-300"></span>
                            <p>{e?.className}</p>
                          </div>
                          <p className="text-xs text-gray-400">
                            Roll No: {e?.rollNumber}
                          </p>
                        </div>
                      </div>
                    ))}
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
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Fee Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={feeType}
                    onChange={(e) => setFeeType(e.target.value)}
                    className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                  >
                    <option>Select Fee Type</option>
                    {fees.map((e, index) => (
                      <option key={index}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center w-50 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
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
                    Fee Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    className="w-50 border border-gray-300 px-2 py-1 rounded-[8px]"
                  >
                    <option>Select Payment Method</option>
                    {paymentMethod.map((e, index) => (
                      <option key={index}>{e}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center w-50 gap-2 border border-gray-300 py-1 px-2 rounded-[8px]">
                    <input
                      type="date"
                      value={paymentDate}
                      readOnly
                      className="outline-none w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPayment;
