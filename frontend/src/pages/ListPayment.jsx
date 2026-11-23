import React, { useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { IoPerson, IoSearchOutline, IoWallet } from "react-icons/io5";
import { FaClock, FaRegEye } from "react-icons/fa";
import { TbCoinTakaFilled, TbCurrencyTaka } from "react-icons/tb";
import { AiFillBank } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiDeleteBin6Line, RiResetLeftFill } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";

function ListPayment() {
  const { studentData } = useSelector((state) => state.student);
  const { paymentData } = useSelector((state) => state.payment);
  const { classFeesData } = useSelector((state) => state.classFees);
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
  const [section, setSection] = useState("");
  const sectionName = ["A", "B", "C"];
  const [input, setInput] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const displayStudents = isFiltered ? filteredStudents : paymentData;
  const now = new Date();

  const thisMonthStudentJoined = studentData.filter((student) => {
    const admissionDate = new Date(student.admissionDate);

    return (
      admissionDate.getMonth() === now.getMonth() &&
      admissionDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <div className="flex bg-blue-50">
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
              <h1 className="font-bold text-xl">Fees & Payment</h1>
              <p>Manage student fees, track payments and view due details.</p>
            </div>
          </div>

          <div className="flex-1 py-4">
            <div className="grid grid-cols-4 gap-4">
              {/* total student */}

              <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-blue-100 rounded-xl p-2">
                  <IoPerson size={25} className="text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Student</p>
                  <h1 className="font-bold text-2xl">{studentData.length}</h1>
                  <p className="text-xs text-green-400">
                    +{thisMonthStudentJoined} new this month
                  </p>
                </div>
              </div>

              {/* Total fee */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <AiFillBank size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Fee (This Year)</p>
                  <h1 className="font-bold text-2xl flex items-center">
                    <TbCurrencyTaka />
                    1,44,000
                  </h1>
                  {/* <p
                    className={`text-xs flex items-center gap-2 ${
                      percentageChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {percentageChange >= 0 ? (
                      <IoMdArrowUp />
                    ) : (
                      <IoMdArrowDown />
                    )}

                    {previousAverage > 0
                      ? `${Math.abs(percentageChange).toFixed(1)}% ${
                          percentageChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p> */}
                </div>
              </div>

              {/* total paid */}

              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-green-100 rounded-xl p-2">
                  <TbCoinTakaFilled size={25} className="text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Paid</p>
                  <h1 className="font-bold text-2xl flex items-center">
                    <TbCurrencyTaka />
                    72000
                  </h1>
                  {/* <p
                    className={`text-xs flex items-center gap-2 ${
                      monthlyChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {monthlyChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}

                    {previousAverage > 0
                      ? `${Math.abs(monthlyChange).toFixed(1)}% ${
                          monthlyChange >= 0 ? "up" : "down"
                        } this month`
                      : "No previous month data"}
                  </p> */}
                </div>
              </div>

              {/* Total Due */}
              <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                <div className="bg-red-100 rounded-xl p-2">
                  <FaClock size={25} className="text-red-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">Total Due</p>
                  <h1 className="font-bold text-2xl text-red-600 flex items-center">
                    <TbCurrencyTaka />
                    72000
                  </h1>
                  {/* <p
                    className={`text-xs flex items-center gap-2 ${
                      todayChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {todayChange >= 0 ? <IoMdArrowUp /> : <IoMdArrowDown />}
                  </p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-2 rounded-[8px] shadow">
            {/* search */}
            <div className="flex items-center gap-2 border w-90 border-gray-400 rounded-[5px] p-1">
              <IoSearchOutline />
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Search by name, student ID, roll or phone..."
                className="outline-none w-full"
              />
            </div>
            {/* class */}
            <div className="flex flex-col gap-1">
              <select
                value={selectClass}
                onChange={(e) => setSelectClass(e.target.value)}
                className="w-50 border border-gray-300  rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Class</option>
                {className.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>
            {/* section */}
            <div className="flex flex-col gap-1">
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className=" border w-50 border-gray-300 rounded-[8px] px-2 py-1 outline-none"
              >
                <option value="">Select Section</option>
                {sectionName.map((e, index) => (
                  <option key={index}>{e}</option>
                ))}
              </select>
            </div>
            {/* filter */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
              // onClick={handleFilter}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <FiFilter /> Filter
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
            {/* reset */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
              // onClick={handleReset}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <RiResetLeftFill /> Reset
              </span>
              <span className="absolute inset-y-0 right-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>

          <div className="mt-4 w-full overflow-auto max-h-[400px]">
            <table className="w-full min-w-[699px]">
              {/* Table Header */}
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b border-gray-300 text-gray-600">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Photo</th>
                  <th className="text-left py-3 px-2">Name</th>
                  <th className="text-left py-3 px-2">Payment Method</th>
                  <th className="text-left py-3 px-2">Class</th>
                  <th className="text-left py-3 px-2">Total Fee</th>
                  <th className="text-left py-3 px-2">Paid Amount</th>
                  <th className="text-left py-3 px-2">Due Amount</th>
                  <th className="text-left py-3 px-2">Date</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>

              {/* Student Data */}
              <tbody>
                {displayStudents.map((e, index) => {
                  const totalFees = classFeesData.find(
                    (cls) => cls.className === e.student?.className,
                  );
                  return (
                    <tr
                      key={e._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2">{index + 1}</td>

                      <td className="py-3 px-2">
                        <div className="w-10 h-10">
                          {e?.student?.image ? (
                            <img
                              src={e?.student?.image}
                              alt={e?.student?.fullName}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="bg-purple-800 w-full h-full flex text-white font-semibold justify-center items-center rounded-full">
                              {e?.student?.fullName?.slice(0, 1).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        <div>
                          <h1 className="font-semibold capitalize">
                            {e?.student?.fullName}
                          </h1>

                          <p className="text-xs text-gray-500">
                            {e.student?.studentId}
                          </p>
                        </div>
                      </td>

                      <td className="py-3 px-2">{e.paymentMethod}</td>

                      <td className="py-3 px-2">
                        <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded-2xl">
                          {e.student?.className}
                        </div>
                      </td>

                      <td className="py-3 px-2">
                        {Number(totalFees?.fees).toLocaleString("en-BD")}
                      </td>

                      <td className="py-3 px-2">
                        {Number(e?.amount).toLocaleString("en-BD")}
                      </td>

                      <td className="py-3 px-2">
                        {Number(totalFees?.fees - e?.amount).toLocaleString(
                          "en-BD",
                        )}
                      </td>

                      <td className="py-3 px-2">
                        {new Date(e?.paymentDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      {/* <td className="py-3 px-2">
                      {new Date(student.admissionDate).toLocaleDateString()}
                    </td> */}

                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            // onClick={() => {
                            //   navigate(
                            //     `/admin-dashboard/students/student-details/${student._id}`,
                            //   );
                            // }}
                          >
                            <FaRegEye size={18} />
                          </button>

                          <button
                            className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                            // onClick={() =>
                            //   navigate(
                            //     `/admin-dashboard/students/edit-student/${student._id}`,
                            //   )
                            // }
                          >
                            <MdOutlineModeEdit size={18} />
                          </button>
                          <button
                            className="p-2 rounded-[8px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                            // onClick={() => {
                            //   setDeleteStudent(student);
                            //   setShowDeleteModal(true);
                            // }}
                          >
                            <RiDeleteBin6Line size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListPayment;
