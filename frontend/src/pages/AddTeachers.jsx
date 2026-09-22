import React, { useState } from "react";
import logoimage from "../assets/login-logo.png";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { RxCross2, RxPeople } from "react-icons/rx";
import { BsPersonFillAdd } from "react-icons/bs";
import { ClipLoader } from "react-spinners";
import { IoMdAdd } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setTeacherData } from "../redux/teacherSlice";
import { useNavigate } from "react-router-dom";
import { GoAlertFill } from "react-icons/go";

function AddTeachers() {
  const [fullName, setFullName] = useState();
  const [teacherId, setTeacherId] = useState();
  const [subject, setSubject] = useState();
  const selectSubject = [
    "Bangle",
    "English",
    "Mathematics",
    "Science",
    "Bangladesh and Global Studies",
    "ICT",
    "Religion and Moral Education",
  ];
  const [assignedClass, setAssignedClass] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [teacherRole, setTeacherRole] = useState();
  const selectTeacherRole = [
    "Head Teacher",
    "Assistant Teacher",
    "Senior Teacher",
    "Junior Teacher",
    "Accounting Teacher",
  ];
  const [gender, setGender] = useState();
  const [aboutTeacher, setAboutTeacher] = useState();
  const [qualification, setQualification] = useState();
  const [backendImage, setBackendImage] = useState();
  const [frontendImage, setFrontendImage] = useState();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [joiningDate, setJoiningDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const handleAddTeacher = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("teacherId", teacherId);
      formData.append("subject", subject);
      formData.append("joiningDate", joiningDate);
      formData.append("gender", gender);
      formData.append("assignedClass", assignedClass);
      formData.append("teacherRole", teacherRole);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("aboutTeacher", aboutTeacher);
      formData.append("qualification", qualification);
      if (backendImage) {
        formData.append("profile", backendImage);
      }

      const result = await axios.post(
        `${serverURL}/api/teacher/add-teacher`,
        formData,
        { withCredentials: true },
      );

      const teacher = await axios.get(`${serverURL}/api/teacher/all-teacher`, {
        withCredentials: true,
      });

      console.log("API RESPONSE:", teacher.data);
      dispatch(setTeacherData(teacher.data));
      setLoading(false);
      setErr("");
      navigate("/teacher/teachers-list");
    } catch (error) {
      setLoading(false);
      setErr(error.response?.data?.message);
    }
  };

  const handleReset = () => {
    setFullName("");
    setTeacherId("");
    setSubject("");
    setAssignedClass("");
    setPhone("");
    setEmail("");
    setFrontendImage("");
    setBackendImage("");
    setGender("");
    setTeacherRole("");
    setAboutTeacher("");
    setQualification("");
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // file check
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErr("Only JPG and PNG images are allowed!");
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

  const handleDrop = async (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setErr("Only JPG and PNG images are allowed!");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErr("Image size must be less then 2MB!");
      return;
    }

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          <div className="flex items-center gap-4">
            <BsPersonFillAdd size={40} className="text-green-700" />
            <div>
              <h1 className="font-bold text-xl">Add New Teacher</h1>
              <p>
                Fill in the teacher details to add a new teacher to the system.
              </p>
            </div>
          </div>
          {/* add teacher input section start */}
          <div className="mt-4 bg-white shadow rounded-[8px] ">
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
                  {/* teacher ID */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      teacher ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="TCH-001"
                      value={teacherId}
                      onChange={(e) => setTeacherId(e.target.value)}
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>
                  {/* Subject */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-50 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Subject</option>
                      {selectSubject.map((e, index) => (
                        <option key={index}>{e}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  {/* Joining Date */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Joining Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      placeholder="Enter data of birth"
                      readOnly
                      value={joiningDate}
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
                      Assigned Class <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter assigned class"
                      value={assignedClass}
                      onChange={(e) => setAssignedClass(e.target.value)}
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  {/* Teacher Role */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="">
                      Teacher Role <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={teacherRole}
                      onChange={(e) => setTeacherRole(e.target.value)}
                      className=" border w-50 border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="">Select Teacher Role</option>
                      {selectTeacherRole.map((e, index) => (
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
              </div>
              <div className="w-[1px] h-70 bg-gray-300"></div>
              <div className="p-4">
                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople /> Teacher Photo
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
          {/*  */}
          <div className="p-4 bg-white rounded-[8px] mt-3 shadow flex justify-between">
            <div className="flex gap-3">
              {/* About Teacher */}
              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  About Teacher <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  rows={4}
                  placeholder="Enter Teacher About"
                  value={aboutTeacher}
                  onChange={(e) => setAboutTeacher(e.target.value)}
                  className="border border-gray-300 rounded-[8px] w-80 px-2 py-1 outline-none resize-none"
                />
              </div>
              {/* Qualifications */}
              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Qualifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  type="text"
                  rows={4}
                  placeholder="Enter Qualifications"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="border border-gray-300 rounded-[8px] w-80 px-2 py-1 outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex justify-center items-center mt-5 gap-4">
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
                onClick={handleAddTeacher}
                disabled={loading}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  {loading ? (
                    <ClipLoader color="white" />
                  ) : (
                    <>
                      <IoMdAdd /> Add Teacher
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
                      Create the Teacher profile.
                    </p>
                  </div>
                </div>
              )}
            </div>
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

export default AddTeachers;
