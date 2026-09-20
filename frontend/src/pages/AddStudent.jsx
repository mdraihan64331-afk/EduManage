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
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";

function AddStudent() {
  const { userData } = useSelector((state) => state.user);
  const [gender, setGender] = useState("");
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
  ];
  const [section, setSection] = useState("");
  const sectionName = ["A", "B", "C"];
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [address, setAddress] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");
  const navigate = useNavigate();

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("studentId", studentId);
      formData.append("rollNumber", rollNumber);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("className", selectClass);
      formData.append("section", section);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("guardianName", guardianName);
      formData.append("guardianPhone", guardianPhone);
      formData.append("address", address);
      formData.append("admissionDate", admissionDate);
      formData.append("previousSchool", previousSchool);
      if (backendImage) {
        formData.append("profile", backendImage);
      }
      const result = await axios.post(
        `${serverURL}/api/student/add-student`,
        formData,
        { withCredentials: true },
      );

      console.log(result);
      navigate("/students/list-student");
    } catch (error) {
      console.log("ADD STUDENT ERROR:", error);
      console.log("SERVER MESSAGE:", error.response?.data?.message);
    }
  };

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
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
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
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
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
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
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
                      value={selectClass}
                      onChange={(e) => setSelectClass(e.target.value)}
                      className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Class</option>
                      {className.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
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
                      {sectionName.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
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
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                {frontendImage ? (
                  <div>
                    <img src={frontendImage} alt="" />
                  </div>
                ) : (
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
                        onChange={handleImage}
                        className="hidden"
                      />
                    </div>
                  </div>
                )}
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
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
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
                    value={guardianPhone}
                    onChange={(e) => setGuardianPhone(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={admissionDate}
                    onChange={(e) => setAdmissionDate(e.target.value)}
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
                    value={previousSchool}
                    onChange={(e) => setPreviousSchool(e.target.value)}
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
            {/* <button className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group " onClick={handleAddStudent}>
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <IoMdAdd /> Add Student
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
            </button> */}
            <button onClick={handleAddStudent}>add student</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
