import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { GrAddCircle } from "react-icons/gr";
import axios from "axios";
import { serverURL } from "../App";
import { ClipLoader } from "react-spinners";
import { IoMdAdd } from "react-icons/io";
import { RiResetLeftFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function AddClass() {
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
  const [classTeacher, setClassTeacher] = useState("");
  const [loading, setLoading] = useState(false);
  const [teacherName, setTeacherName] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fatchTeachers = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/teacher/all-teacher`, {
          withCredentials: true,
        });
        setTeacherName(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchTeachers();
  }, []);

  const handleAddClass = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/classes/add-class`,
        {
          className: selectClass,
          classTeacher,
        },
        { withCredentials: true },
      );

      navigate("/classes/class-list");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setSelectClass("");
    setClassTeacher("");
  };

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          <div className="flex items-center gap-3">
            <GrAddCircle className="text-green-700" size={35} />
            Add New Class
          </div>
          <div className="flex justify-center items-center w-full h-full">
            <div className="p-5 flex flex-col items-center bg-white  rounded-[8px] shadow mt-5">
              <div className="flex flex-col gap-1">
                <label htmlFor="">
                  Class Name <span className="text-red-500">*</span>
                </label>

                <select
                  value={selectClass}
                  onChange={(e) => setSelectClass(e.target.value)}
                  className="w-80 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                >
                  <option value="">Select Class</option>
                  {className.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 mt-3">
                <label htmlFor="">
                  Teacher Name <span className="text-red-500">*</span>
                </label>

                <select
                  value={classTeacher}
                  onChange={(e) => setClassTeacher(e.target.value)}
                  className="w-80 border border-gray-300  rounded-lg px-2 py-1 outline-none"
                >
                  <option value="">Select Teacher</option>
                  {teacherName.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 items-center mt-3">
                {/* add button */}
                <button
                  className="bg-green-600 rounded-[8px] px-4 flex justify-center items-center py-1 w-full gap-3 text-white cursor-pointer"
                  onClick={handleAddClass}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="white" />
                  ) : (
                    <>
                      <IoMdAdd /> Add class
                    </>
                  )}
                </button>

                {/* reset button */}
                <button
                  className="bg-blue-600 rounded-[8px] px-4 flex justify-center items-center py-1 gap-3 text-white cursor-pointer"
                  onClick={handleReset}
                >
                  <RiResetLeftFill /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClass;
