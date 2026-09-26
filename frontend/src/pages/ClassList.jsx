import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import { GiBlackBook, GiGraduateCap } from "react-icons/gi";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";
import { serverURL } from "../App";
import axios from "axios";

function ClassList() {
  const { teacherData } = useSelector((state) => state.teacher);
  const { studentData } = useSelector((state) => state.student);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/classes/all-classes`, {
          withCredentials: true,
        });

        setClasses(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClasses();
  }, []);

  const classNames = [
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

  const classList = classNames.map((className) => {
    const students = studentData.filter(
      (student) => student.className === className,
    );

    const sections = ["A", "B", "C"].map((section) => {
      const count = students.filter(
        (student) => student.section === section,
      ).length;

      return {
        section,
        students: count,
      };
    });

    const classTeacher = teacherData.find(
      (teacher) => teacher.classTeacher === className,
    );

    return {
      className,
      totalStudents: students.length,
      sections,
      classTeacher,
    };
  });

  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          {/* Class & Section Management text */}
          <div className="flex items-center gap-4">
            <SiGoogleclassroom size={35} className="text-green-700" />
            <div>
              <h1 className="font-bold text-2xl">Class & Section Management</h1>
              <p>
                Manage classes, sections, subjects and class teacher. You can
                also view students in each class.
              </p>
            </div>
          </div>

          {/* catagory */}
          <div>
            <div className="flex-1 py-4">
              <div className="grid grid-cols-4 gap-4">
                {/* Total Classes */}

                <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <SiGoogleclassroom size={25} className=" text-blue-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Total Classes</p>
                    <h1 className="font-bold text-2xl">10</h1>
                    <p className="text-xs text-green-400">+ Active Classes</p>
                  </div>
                </div>

                {/* Total Section */}

                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-purple-200 rounded-xl p-2">
                    <GiGraduateCap size={25} className="text-purple-700" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Total Section</p>
                    <h1 className="font-bold text-2xl">3</h1>
                    <p className="text-xs text-gray-400">
                      + Across All Classes
                    </p>
                  </div>
                </div>

                {/* Subjects */}

                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-green-100  rounded-xl p-2">
                    <GiBlackBook size={25} className=" text-green-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Total Subjects</p>
                    <h1 className="font-bold text-2xl">8</h1>
                    <p className="text-xs text-green-400">+ Active Subjects</p>
                  </div>
                </div>

                {/* Class Teachers */}
                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-orange-100 rounded-xl p-2">
                    <IoPerson size={25} className="text-orange-500" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Class Teachers</p>
                    <h1 className="font-bold text-2xl">10</h1>
                    <p className="text-xs text-gray-400">assigned Teachers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* class management */}
          <div className="bg-white p-3 rounded-[8px] shadow">
            <div className="flex items-center gap-3">
              <SiGoogleclassroom size={20} className="text-green-600" />
              <h4 className="font-semibold">Class Management</h4>
            </div>

            <table className="w-full min-w-[700px] mt-3">
              {/* Table Header */}
              <thead className="sticky top-0 font-semibold text-slate-700 p-2 z-10">
                <tr className="bg-blue-50 rounded-t-[8px] border border-gray-200 text-gray-600">
                  <th className="text-left py-3 px-2">Class</th>
                  <th className="text-left py-3 px-2">Sections</th>
                  <th className="text-left py-3 px-2">Total Students</th>
                  <th className="text-left py-3 px-2">Assigned Class</th>
                  <th className="text-left py-3 px-2">Class Teacher</th>
                </tr>
              </thead>
              <tbody>
                {classList.map((e) => (
                  <tr
                    key={e.className}
                    className="bg-white border border-gray-200 font-semibold"
                  >
                    {/* Class */}
                    <td className="py-2 px-3">{e.className}</td>

                    {/* Sections */}
                    <td className="py-2 px-3">
                      <div className="flex gap-2 items-center">
                        {e.sections.map((section) => (
                          <div
                            key={section.section}
                            className="bg-blue-50 py-2 px-3 text-slate-600 border border-gray-200 rounded-[8px]"
                          >
                            {section.section}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total Students */}
                    <td className="py-2 px-3">{e.totalStudents}</td>

                    {/* Assigned Class */}
                    <td className="py-2 px-3">
                      {e.classTeacher?.assignedClass}
                    </td>

                    {/* Class Teacher */}
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10">
                          {e.classTeacher?.image ? (
                            <img
                              src={e.classTeacher.image}
                              alt=""
                              className="h-full w-full rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full flex items-center justify-center bg-purple-700 text-white">
                              {e.classTeacher?.fullName
                                ?.slice(0, 1)
                                .toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div>
                          <h1 className="text-slate-700 capitalize">
                            {e.classTeacher?.fullName}
                          </h1>

                          <p className="text-gray-600 text-xs capitalize">
                            ({e.classTeacher?.subject})
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassList;
