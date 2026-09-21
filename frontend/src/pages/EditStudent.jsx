import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { BsPersonFillAdd } from "react-icons/bs";
import { RxPeople } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { LuUpload } from "react-icons/lu";
import { FaUserGraduate } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { GoAlertFill } from "react-icons/go";
import AdminHeader from "../components/AdminHeader";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [selectClass, setSelectClass] = useState("");
  const [section, setSection] = useState("");

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

  const sectionName = ["A", "B", "C"];

  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [backendImage, setBackendImage] = useState(null);
  const [frontendImage, setFrontendImage] = useState("");

  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [address, setAddress] = useState("");

  const [admissionDate, setAdmissionDate] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  // =========================
  // GET SINGLE STUDENT
  // =========================

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/student/student/${id}`,
          {
            withCredentials: true,
          }
        );

        const student = result.data;

        setFullName(student.fullName || "");
        setStudentId(student.studentId || "");
        setRollNumber(student.rollNumber || "");

        // Date input এর জন্য
        setDob(
          student.dob
            ? new Date(student.dob).toISOString().split("T")[0]
            : ""
        );

        setGender(student.gender || "");
        setSelectClass(student.className || "");
        setSection(student.section || "");
        setPhone(student.phone || "");
        setEmail(student.email || "");

        setGuardianName(student.guardianName || "");
        setGuardianPhone(student.guardianPhone || "");
        setAddress(student.address || "");

        // Admission Date
        setAdmissionDate(
          student.admissionDate
            ? new Date(student.admissionDate)
                .toISOString()
                .split("T")[0]
            : ""
        );

        setPreviousSchool(student.previousSchool || "");

        // পুরোনো image
        setFrontendImage(student.image || "");
      } catch (error) {
        console.log("GET STUDENT ERROR:", error);

        setErr(
          error.response?.data?.message ||
            "Student data load failed!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  // =========================
  // IMAGE SELECT
  // =========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(
        file.type
      )
    ) {
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

  // =========================
  // DRAG & DROP
  // =========================

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (!file) return;

    if (
      !["image/jpeg", "image/png", "image/jpg"].includes(
        file.type
      )
    ) {
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

  // =========================
  // UPDATE STUDENT
  // =========================

  const handleEditStudent = async (e) => {
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
      formData.append("previousSchool", previousSchool);

      // নতুন image থাকলে পাঠাবে
      if (backendImage) {
        formData.append("profile", backendImage);
      }

      const result = await axios.put(
        `${serverURL}/api/student/edit-student/${id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log("UPDATED STUDENT:", result.data);

      navigate("/students/list-student");
    } catch (error) {
      console.log("EDIT STUDENT ERROR:", error);

      setErr(
        error.response?.data?.message ||
          "Student update failed!"
      );
    }
  };

  // =========================
  // RESET
  // =========================

  const handleReset = async () => {
    try {
      const result = await axios.get(
        `${serverURL}/api/student/student/${id}`,
        {
          withCredentials: true,
        }
      );

      const student = result.data;

      setFullName(student.fullName || "");
      setStudentId(student.studentId || "");
      setRollNumber(student.rollNumber || "");

      setDob(
        student.dob
          ? new Date(student.dob).toISOString().split("T")[0]
          : ""
      );

      setGender(student.gender || "");
      setSelectClass(student.className || "");
      setSection(student.section || "");
      setPhone(student.phone || "");
      setEmail(student.email || "");

      setGuardianName(student.guardianName || "");
      setGuardianPhone(student.guardianPhone || "");
      setAddress(student.address || "");

      setAdmissionDate(
        student.admissionDate
          ? new Date(student.admissionDate)
              .toISOString()
              .split("T")[0]
          : ""
      );

      setPreviousSchool(student.previousSchool || "");

      setFrontendImage(student.image || "");
      setBackendImage(null);
    } catch (error) {
      console.log("RESET ERROR:", error);

      setErr(
        error.response?.data?.message ||
          "Reset failed!"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="flex bg-blue-50 min-h-screen">
        <Menu />

        <div className="w-full">
          <AdminHeader />

          <div className="flex justify-center items-center h-[80vh]">
            <h1 className="text-xl font-semibold">
              Loading student data...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-blue-50 min-h-screen">
      <Menu />

      <div className="w-full">

        {/* admin header */}
        <AdminHeader />

        <div className="p-2">

          {/* ================= HEADER ================= */}

          <div className="flex items-center gap-4">
            <BsPersonFillAdd
              size={40}
              className="text-green-700"
            />

            <div>
              <h1 className="font-bold text-xl">
                Edit Student
              </h1>

              <p>
                Update the student details and save the changes.
              </p>
            </div>
          </div>

          {/* ================= PERSONAL + PHOTO ================= */}

          <div className="mt-4 bg-white border border-gray-300 rounded-[8px]">

            <div className="flex gap-4">

              {/* PERSONAL INFORMATION */}

              <div className="p-4">

                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople />
                  Personal Information
                </h4>

                <div className="flex gap-4 items-center">

                  {/* Full Name */}

                  <div className="flex flex-col gap-1">
                    <label>
                      Full Name{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={fullName}
                      onChange={(e) =>
                        setFullName(e.target.value)
                      }
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>

                  {/* Student ID */}

                  <div className="flex flex-col gap-1">
                    <label>
                      Student ID{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="STD-2026-001"
                      value={studentId}
                      onChange={(e) =>
                        setStudentId(e.target.value)
                      }
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>

                  {/* Roll Number */}

                  <div className="flex flex-col gap-1">
                    <label>
                      Roll Number{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      placeholder="Enter roll number"
                      value={rollNumber}
                      onChange={(e) =>
                        setRollNumber(e.target.value)
                      }
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none"
                    />
                  </div>

                </div>

                <div className="flex gap-4 items-center mt-3">

                  {/* DOB */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Date of Birth{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="date"
                      value={dob}
                      onChange={(e) =>
                        setDob(e.target.value)
                      }
                      className="border border-gray-300 rounded-[8px] w-50 px-2 py-1 outline-none text-gray-500"
                    />

                  </div>

                  {/* Gender */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Gender{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="flex gap-2">

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          checked={gender === "Male"}
                          onChange={(e) =>
                            setGender(e.target.value)
                          }
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
                          onChange={(e) =>
                            setGender(e.target.value)
                          }
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
                          onChange={(e) =>
                            setGender(e.target.value)
                          }
                          className="accent-green-500"
                        />
                        Other
                      </label>

                    </div>

                  </div>

                  {/* Class */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Class{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={selectClass}
                      onChange={(e) =>
                        setSelectClass(e.target.value)
                      }
                      className="w-50 border border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >

                      <option value="">
                        Select Class
                      </option>

                      {className.map((e, index) => (
                        <option key={index} value={e}>
                          {e}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

                <div className="flex gap-4 items-center mt-3">

                  {/* Section */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Section{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <select
                      value={section}
                      onChange={(e) =>
                        setSection(e.target.value)
                      }
                      className="border w-50 border-gray-300 rounded-lg px-2 py-1 outline-none"
                    >

                      <option value="">
                        Select Section
                      </option>

                      {sectionName.map((e, index) => (
                        <option key={index} value={e}>
                          {e}
                        </option>
                      ))}

                    </select>

                  </div>

                  {/* Phone */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Phone{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="tel"
                      placeholder="Enter your phone"
                      value={phone}
                      onChange={(e) =>
                        setPhone(e.target.value)
                      }
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none"
                    />

                  </div>

                  {/* Email */}

                  <div className="flex flex-col gap-1">

                    <label>
                      Email{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="border border-gray-300 w-50 rounded-[8px] px-2 py-1 outline-none"
                    />

                  </div>

                </div>

              </div>

              {/* VERTICAL LINE */}

              <div className="w-[1px] h-70 bg-gray-300"></div>

              {/* STUDENT PHOTO */}

              <div className="p-4">

                <h4 className="flex items-center gap-3 font-semibold">
                  <RxPeople />
                  Student Photo
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
                        alt="Student"
                        className="w-full h-full object-cover rounded-[8px]"
                      />

                      <button
                        type="button"
                        className="absolute top-5 right-5 text-white bg-gray-400 p-2 rounded-full cursor-pointer"
                        onClick={() => {
                          setFrontendImage("");
                          setBackendImage(null);
                        }}
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

                        <p>
                          Click to upload or drag and drop
                        </p>

                        <p>
                          JPG, PNG (Max 2MB)
                        </p>

                      </div>

                      <div className="flex justify-center items-center">

                        <label
                          htmlFor="studentImage"
                          className="relative overflow-hidden inline-block px-5 py-2 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                        >

                          <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">

                            <LuUpload />
                            Choose File

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

          {/* ================= GUARDIAN + ADMISSION ================= */}

          <div className="mt-3 flex gap-3">

            {/* GUARDIAN */}

            <div className="p-4 bg-white border border-gray-300 rounded-[8px]">

              <h4 className="flex items-center gap-3 font-semibold">
                <RxPeople />
                Guardian Information
              </h4>

              <div className="flex gap-4">

                {/* Guardian Name */}

                <div className="flex flex-col gap-1">

                  <label className="font-semibold">
                    Guardian Name{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="Enter guardian name"
                    value={guardianName}
                    onChange={(e) =>
                      setGuardianName(e.target.value)
                    }
                    className="border border-gray-300 w-42 outline-none px-2 py-1 rounded-[8px]"
                  />

                </div>

                {/* Guardian Phone */}

                <div className="flex flex-col gap-1">

                  <label className="font-semibold">
                    Guardian Phone{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter guardian phone"
                    value={guardianPhone}
                    onChange={(e) =>
                      setGuardianPhone(e.target.value)
                    }
                    className="border border-gray-300 w-43 outline-none px-2 py-1 rounded-[8px]"
                  />

                </div>

                {/* Address */}

                <div className="flex flex-col gap-1">

                  <label className="font-semibold">
                    Guardian Address{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    placeholder="Enter student address"
                    value={address}
                    onChange={(e) =>
                      setAddress(e.target.value)
                    }
                    rows="2"
                    className="border border-gray-300 w-40 px-2 py-1 rounded-[8px] outline-none resize-none"
                  />

                </div>

              </div>

            </div>

            {/* ADMISSION */}

            <div className="p-4 bg-white border border-gray-300 rounded-[8px]">

              <h4 className="flex items-center gap-3 font-semibold">
                <FaUserGraduate />
                Admissions Information
              </h4>

              <div className="flex gap-2">

                {/* Admission Date */}

                <div className="flex flex-col gap-1">

                  <label className="font-semibold">
                    Admission Date{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    value={admissionDate}
                    readOnly
                    className="border border-gray-300 rounded-[8px] w-45 px-2 py-1 outline-none text-gray-500 bg-gray-100"
                  />

                </div>

                {/* Previous School */}

                <div className="flex flex-col gap-1">

                  <label>
                    <span className="font-semibold">
                      Previous School
                    </span>{" "}
                    (Optional)
                  </label>

                  <textarea
                    placeholder="Enter previous school"
                    value={previousSchool}
                    onChange={(e) =>
                      setPreviousSchool(e.target.value)
                    }
                    rows="2"
                    className="border border-gray-300 w-45 px-2 py-1 rounded-[8px] outline-none resize-none"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex justify-end mt-5 gap-4">

            {/* Reset */}

            <button
              type="button"
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg cursor-pointer group"
              onClick={handleReset}
            >

              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">

                <RiResetLeftFill />
                Reset Changes

              </span>

              <span className="absolute inset-y-0 left-0 w-0 bg-blue-600 transition-all duration-500 group-hover:w-full"></span>

            </button>

            {/* Update */}

            <button
              type="button"
              className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-2.5 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
              onClick={handleEditStudent}
            >

              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">

                <IoMdCheckmark />
                Update Student

              </span>

              <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>

            </button>

          </div>

        </div>

      </div>

      {/* ================= ERROR POPUP ================= */}

      {err && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-5 rounded-[8px]">

            <div
              className="flex justify-end text-gray-600 cursor-pointer"
              onClick={() => setErr("")}
            >
              <RxCross2 />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">

              <div className="p-3 rounded-full bg-red-100 text-red-500">
                <GoAlertFill size={30} />
              </div>

              <h1 className="text-xl font-bold">
                Something went wrong
              </h1>

              <p className="text-gray-500">
                Please try again later.
              </p>

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

    </div>
  );
}

export default EditStudent;