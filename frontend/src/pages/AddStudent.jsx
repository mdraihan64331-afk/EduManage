import React, { useState } from "react";
import Menu from "./Menu";
import logoimage from "../assets/login-logo.png";
import { useDispatch, useSelector } from "react-redux";
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
import { setStudentData } from "../redux/studentSlice";
import { RxCross2 } from "react-icons/rx";
import { GoAlertFill } from "react-icons/go";
import AdminHeader from "../components/AdminHeader";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";

function AddStudent() {
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
    "Class 10",
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
  const [previousSchool, setPreviousSchool] = useState("");
  const [selectBloodGroup, setSelectBloodGroup] = useState("");
  const bloodGroup = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"];
  const [selectReligion, setSelectReligion] = useState("");
  const religion = ["Islam", "Christianity", "Handuism", "Buddhism", "Judaism"];
  const [nationality, setNationality] = useState("");
  const [classTeacher, setClassTeacher] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherPhone, setFatherPhone] = useState("");
  const [fatherOccupation, setFatherOccupation] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { teacherData } = useSelector((state) => state.teacher);

  const [admissionDate, setAdmissionDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;
    // file check
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErr("only JPG and PNG images are allowed!");
      return;
    }

    // 2MB check
    if (file.size > 2 * 1024 * 1024) {
      setErr("Image size must be less then 2MB!");
      return;
    }

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErr("Only JPG and PNG images are allowed!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErr("Image size must be less than 2MB!");
      return;
    }

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
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
      formData.append("bloodGroup", selectBloodGroup);
      formData.append("religion", selectReligion);
      formData.append("nationality", nationality);
      formData.append("classTeacher", classTeacher);
      formData.append("fatherName", fatherName);
      formData.append("fatherPhone", fatherPhone);
      formData.append("fatherOccupation", fatherOccupation);
      formData.append("motherName", motherName);
      formData.append("motherPhone", motherPhone);
      formData.append("motherOccupation", motherOccupation);

      if (backendImage) {
        formData.append("profile", backendImage);
      }
      const result = await axios.post(
        `${serverURL}/api/student/add-student`,
        formData,
        { withCredentials: true },
      );

      const students = await axios.get(
        `${serverURL}/api/student/all-students`,
        {
          withCredentials: true,
        },
      );

      dispatch(setStudentData(students.data));
      setLoading(false);
      setErr("");
      navigate("/students/list-student");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  const handleReset = () => {
    setFullName("");
    setStudentId("");
    setRollNumber("");
    setDob("");
    setGender("");
    setSelectClass("");
    setSection("");
    setPhone("");
    setEmail("");
    setFrontendImage("");
    setBackendImage("");
    setGuardianName("");
    setGuardianPhone("");
    setAddress("");
    setPreviousSchool("");
    setSelectBloodGroup("");
    setSelectReligion("");
    setNationality("");
    setClassTeacher("");
    setFatherName("");
    setFatherPhone("");
    setFatherOccupation("");
    setMotherName("");
    setMotherPhone("");
    setMotherOccupation("");
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      {/* student add section */}

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />
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
                      placeholder="Auto generated"
                      value="Auto generated"
                      readOnly
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
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none"
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
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  {/* blood group */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Blood Group <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={selectBloodGroup}
                      onChange={(e) => setSelectBloodGroup(e.target.value)}
                      className=" border w-50 border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroup.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
                    </select>
                  </div>
                  {/* religion */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Religion <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={selectReligion}
                      onChange={(e) => setSelectReligion(e.target.value)}
                      className=" border w-50 border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Religion</option>
                      {religion.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
                    </select>
                  </div>
                  {/* nationality */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Nationality <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Nationality"
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="w-[1px] h-85 bg-gray-300"></div>
              <div className="p-4">
                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople /> Student Photo
                </h4>
                <div
                  className="w-full p-4 mt-2 border border-gray-300 rounded-[8px]"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {frontendImage ? (
                    <div className="w-[200px] h-[200px] relative flex justify-center items-center">
                      <img
                        src={frontendImage}
                        alt=""
                        className="w-full h-full object-cover rounded-[8px]"
                      />
                      <button
                        className="absolute top-5 right-5 text-white bg-gray-400 p-2 rounded-full cursor-pointer"
                        onClick={() => setFrontendImage("")}
                      >
                        <RxCross2 size={20} />
                      </button>
                    </div>
                  ) : (
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
                  )}
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
              <div className="flex flex-col gap-3 mt-3">
                <div className="flex gap-4">
                  {/* father's name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Father's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter father's name"
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      className="border border-gray-300 w-42 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                  {/* father's Phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Father's Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter father's phone"
                      value={fatherPhone}
                      onChange={(e) => setFatherPhone(e.target.value)}
                      className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                  {/* father occupation */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Father's Occupation{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter father's occupation"
                      value={fatherOccupation}
                      onChange={(e) => setFatherOccupation(e.target.value)}
                      className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  {/* mother's name */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Mother's Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mother's name"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      className="border border-gray-300 w-42 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                  {/* mother's Phone */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Mother's Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter guardian phone"
                      value={motherPhone}
                      onChange={(e) => setMotherPhone(e.target.value)}
                      className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                  {/* mother's occupation */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Mother's Occupation{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter mother's occupation"
                      value={motherOccupation}
                      onChange={(e) => setMotherOccupation(e.target.value)}
                      className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                    />
                  </div>
                </div>
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
                      placeholder="Enter guardian address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="2"
                      className="w-full border border-gray-300 w-40 px-2 py-1 rounded-[8px] outline-none resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* admission information */}
            <div className="p-4 bg-white border border-gray-300 rounded-[8px]">
              <h4 className="flex items-center gap-3 font-semibold">
                <FaUserGraduate /> Admissions Information
              </h4>
              <div>
                <div className="flex gap-2">
                  {/* admission date */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      admission date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={admissionDate}
                      readOnly
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
                <div>
                  {/* class teacher */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="" className="font-semibold">
                      Class Teacher <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={classTeacher}
                      onChange={(e) => setClassTeacher(e.target.value)}
                      className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Teacher</option>
                      {teacherData?.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>
                          {teacher.fullName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5 gap-4">
            {/* reset button */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
              onClick={handleReset}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                <RiResetLeftFill /> Reset
              </span>
              <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>
            </button>

            {/* add button */}
            <button
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
              onClick={handleAddStudent}
              disabled={loading}
            >
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                {loading ? (
                  <ClipLoader color="white" />
                ) : (
                  <>
                    <IoMdAdd /> Add Student
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
                    Create the student profile.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {err && (
        <>
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
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
  );
}

export default AddStudent;
