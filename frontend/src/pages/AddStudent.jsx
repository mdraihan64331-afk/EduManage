import React, { useState } from "react";
import Menu from "./Menu";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { BsPersonFillAdd } from "react-icons/bs";
import { RxPeople } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

function AddStudent() {
  const { userData } = useSelector((state) => state.user);
  const [gender, setGender] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  return (
    <div className="flex bg-blue-50">
      <Menu />
      {/* student add section */}

      <div className=" w-full ">
        {/* admin navbar */}

        <div className="flex justify-end gap-5 items-center bg-white p-2">
          <div className="flex items-center gap-2 border border-gray-400 rounded-[5px] p-1">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search anything..."
              className="outline-none"
            />
          </div>
          <IoNotificationsOutline />
          <div className="flex items-center gap-2">
            {userData?.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
                {userData?.fullName?.slice(0, 2).toUpperCase()}
              </h1>
            )}
            <h1 className="font-semibold">{userData?.fullName}</h1>
          </div>
        </div>

        {/* add student */}
        <div className="p-2">
          {/* add new students */}
          <div className="flex items-center gap-4">
            <BsPersonFillAdd size={40} className="text-green-700" />
            <div>
              <h1 className="font-bold text-xl">Add New Student</h1>
              <p>
                Fill in the student details to add a new student to the system.
              </p>
            </div>
          </div>

          {/* add student input section start */}
          <div className="mt-4 bg-white border border-gray-300 rounded-[8px] ">
            <div className="flex gap-4">
              <div className="p-4">
                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople /> Personal Information
                </h4>
                <div className="flex gap-4 items-center">
                  {/* full name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter full name"
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>
                  {/* student id */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Student ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="STD-2026-001"
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>
                  {/* roll number */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Roll Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter roll number"
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  {/* dob */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter data of birth"
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none text-gray-500"
                    />
                  </div>
                  {/* gender */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={(e) => setGender(e.target.value)}
                          className="accent-green-500"
                        />
                        Male
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={(e) => setGender(e.target.value)}
                          className="accent-green-500"
                        />
                        Female
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Other"
                          checked={gender === "Other"}
                          onChange={(e) => setGender(e.target.value)}
                          className="accent-green-500"
                        />
                        Other
                      </label>
                    </div>
                  </div>
                  {/* class */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Class <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Class</option>
                      <option value="Class 1">Class 1</option>
                      <option value="Class 2">Class 2</option>
                      <option value="Class 3">Class 3</option>
                      <option value="Class 4">Class 4</option>
                      <option value="Class 5">Class 5</option>
                      <option value="Class 6">Class 6</option>
                      <option value="Class 7">Class 7</option>
                      <option value="Class 8">Class 8</option>
                      <option value="Class 9">Class 9</option>
                      <option value="Class 10">Class 10</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  {/* section */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Section <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className=" border w-50 border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Section</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>
                  {/* phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter your email"
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none text-gray-500"
                    />
                  </div>
                  {/* email */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none text-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[1px] h-70 bg-gray-300"></div>
              <div className="p-4">
                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople /> Student Photo
                </h4>
                <div className="w-full p-4 mt-2 border border-gray-300 rounded-[8px]">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-center items-center">
                      <div className="bg-blue-50 p-3 rounded-full">
                        <IoPerson size={40} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p>Click to puload or drag and drop</p>
                      <p>JPG, PNG (Max 2MB)</p>
                    </div>
                    <div className="flex justify-center items-center">
                      <label
                        htmlFor="studentImage"
                        className="relative overflow-hidden inline-block px-5 py-2 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                      >
                        <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                          <LuUpload /> Choose File
                        </span>

                        <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                      </label>
                    </div>

                    <input
                      id="studentImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-3">
            {/* guardian information */}
            <div className="p-4 bg-white border border-gray-300 rounded-[8px]">
              <h4 className="flex items-center gap-3 font-semibold">
                <RxPeople /> Guardian Information
              </h4>
              <div className="flex gap-4">
                {/* guardian name */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold">
                    Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter guardian name"
                    className="border border-gray-300 w-42 outline-none px-2 py-1 rounded-[8px]"
                  />
                </div>
                {/* guardian Phone */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold">
                    Guardian Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter guardian phone"
                    className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                  />
                </div>
                {/* guardian address */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold">
                    Guardian Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Enter student address"
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                    rows="2"
                    className="w-full border border-gray-300 w-40 px-2 py-1 rounded-[8px] outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* admission information */}
            <div className="p-4 bg-white border border-gray-300 rounded-[8px]">
              <h4 className="flex items-center gap-3 font-semibold">
                <FaUserGraduate /> Admissions Information
              </h4>
              <div className="flex gap-2">
                {/* admission date */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="" className="font-semibold">
                    admission date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded-[8px] w-45 px-2 py-1 outline-none text-gray-500"
                  />
                </div>
                {/* previous school */}
                <div className="flex flex-col gap-1">
                  <label htmlFor="">
                    <span className="font-semibold">Previous Schoole</span>
                    (Optional)
                  </label>
                  <textarea
                    placeholder="Enter student school"
                    // value={address}
                    // onChange={(e) => setAddress(e.target.value)}
                    rows="2"
                    className="w-full w-45 border border-gray-300 px-2 py-1 rounded-[8px] outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5 gap-4">
            {/* reset button */}
            <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <RiResetLeftFill /> Reset
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
            
            {/* add button */}
            <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group ">
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <IoMdAdd /> Add Student
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
