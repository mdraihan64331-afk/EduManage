import React, { useState } from "react";
import Menu from "./Menu";
import { TfiAnnouncement } from "react-icons/tfi";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";
import { FaRegEye, FaRegFileAlt } from "react-icons/fa";
import { MdOutlineCalendarMonth, MdOutlineModeEdit } from "react-icons/md";
import { TbCalendarClock } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

function NoticeList() {
  const { noticeData } = useSelector((state) => state.notice);
  const [category, setCategory] = useState("");
  const categoryName = ["General", "Academic", "Exam", "Holiday", "Event"];
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const displayNotices = Array.isArray(
    isFiltered ? filteredNotices : noticeData,
  )
    ? isFiltered
      ? filteredNotices
      : noticeData
    : [];
  const navigate = useNavigate();
  const now = new Date();

  const thisMonth = Array.isArray(noticeData)
    ? noticeData.filter((notice) => {
        const publishDate = new Date(notice.publishDate);

        return (
          publishDate.getMonth() === now.getMonth() &&
          publishDate.getFullYear() === now.getFullYear()
        );
      }).length
    : 0;
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />
        {/* add notice */}
        <div className="p-2">
          {/* add new notice */}
          <div className="flex items-center gap-4">
            <TfiAnnouncement size={40} className="text-green-700" />
            <div>
              <h1 className="font-bold text-xl">Notice & Annoucements</h1>
              <p>
                Manage and keep up with the latest notices and announcments from
                the school.
              </p>
            </div>
          </div>

          <div>
            {/* card */}
            <div className="flex-1 py-4">
              <div className="grid grid-cols-4 gap-4">
                {/* total Notices */}

                <div className="h-30 w-full bg-white flex items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-green-100 rounded-xl p-2">
                    <FaRegFileAlt size={25} className="text-green-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Total Notices</p>
                    <h1 className="font-bold text-2xl">{noticeData.length}</h1>
                  </div>
                </div>

                {/* this monthe */}
                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-blue-100 rounded-xl p-2">
                    <MdOutlineCalendarMonth
                      size={25}
                      className="text-blue-600"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">This Month</p>
                    <h1 className="font-bold text-2xl">{thisMonth}</h1>
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-purple-200 rounded-xl p-2">
                    <TbCalendarClock size={25} className="text-purple-700" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Upcoming Events</p>
                    <h1 className="font-bold text-2xl">3</h1>
                  </div>
                </div>

                {/* Total views */}
                <div className="h-30 w-full flex bg-white items-center gap-4 p-3 border border-gray-300 shadow rounded-xl">
                  <div className="bg-orange-100 rounded-xl p-2">
                    <FaRegEye size={25} className="text-orange-600" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">Total Views</p>
                    <h1 className="font-bold text-2xl">455</h1>
                  </div>
                </div>
              </div>
            </div>

            {/* notice list */}
            <div className="flex items-center justify-between gap-3 bg-white p-2 rounded-[8px] shadow">
              <div className="flex w-165 items-center gap-3 rounded-[8px] py-1 px-2 border border-gray-400">
                <IoSearchOutline />
                <input
                  type="text"
                  placeholder="Search notice by title..."
                  className="outline-none w-full"
                />
              </div>
              <div>
                <select className="w-50 border border-gray-300  rounded-[8px] px-2 py-1 outline-none">
                  <option>All Categories</option>
                  {categoryName.map((e, index) => (
                    <option key={index}>{e}</option>
                  ))}
                </select>
              </div>
              <button
                className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group "
                // onClick={handleFilter}
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  <FiFilter /> Filter
                </span>
                <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
              </button>
            </div>

            <div className="p-4 bg-white mt-4 rounded-[8px]">
              <div className="flex justify-between w-full">
                <div className="flex items-center gap-2">
                  <FaRegFileAlt size={20} />
                  <h4 className="font-semibold">Notice({noticeData.length})</h4>
                </div>
                <div>
                  {/* add button */}
                  <button
                    className="relative overflow-hidden flex items-center justify-center gap-2 px-5 py-1 border border-green-600 text-green-600 rounded-lg cursor-pointer group"
                    onClick={() =>
                      navigate("/admin-dashboard/notice/add-notice")
                    }
                  >
                    <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                      <IoMdAdd /> Add Notice
                    </span>
                    <span className="absolute inset-y-0 left-0 w-0 bg-green-600 transition-all duration-500 group-hover:w-full"></span>
                  </button>
                </div>
              </div>

              <div className="mt-4 w-full overflow-auto max-h-[400px]">
                <table className="w-full min-w-[699px]">
                  {/* Table Header */}
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-gray-300 text-gray-600">
                      <th className="text-left py-3 px-2">#</th>
                      <th className="text-left py-3 px-2">Title</th>
                      <th className="text-left py-3 px-2">Category</th>
                      <th className="text-left py-3 px-2">Date</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>

                  {/* notice Data */}
                  <tbody>
                    {displayNotices.map((notice, index) => (
                      <tr
                        key={notice._id}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-2">{index + 1}</td>

                        <td className="flex w-[500px] gap-3 py-3 px-2">
                          <div className="mt-2">
                            {notice.category === "General" ? (
                              <div className="h-11 w-11 bg-green-200 text-green-700 rounded-[14px] flex items-center justify-center">
                                <FaRegFileAlt size={25} />
                              </div>
                            ) : notice.category === "Academic" ? (
                              <div className="h-11 w-11 bg-blue-200 text-blue-500 rounded-[14px] flex items-center justify-center">
                                <FaRegFileAlt size={25} />
                              </div>
                            ) : notice.category === "Exam" ? (
                              <div className="h-11 w-11 bg-[#d0cfeb] text-[#4840e8] rounded-[14px] flex items-center justify-center">
                                <FaRegFileAlt size={25} />
                              </div>
                            ) : notice.category === "Holiday" ? (
                              <div className="h-11 w-11 bg-pink-200 text-pink-500 rounded-[14px] flex items-center justify-center">
                                <FaRegFileAlt size={25} />
                              </div>
                            ) : notice.category === "Event" ? (
                              <div className="h-11 w-11 bg-orange-200 text-orange-500 rounded-[14px] flex items-center justify-center">
                                <FaRegFileAlt size={25} />
                              </div>
                            ) : null}
                          </div>
                          <div>
                            <h2 className="font-bold text-xl capitalize">
                              {notice.noticeTitle}
                            </h2>
                            <div
                              className="mt-1 line-clamp-3"
                              dangerouslySetInnerHTML={{
                                __html: notice.description,
                              }}
                            />
                          </div>
                        </td>

                        <td className="py-3 px-2">
                          <div>
                            {notice.category === "General" ? (
                              <div className="w-22 font-semibold bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                                <p>{notice.category}</p>
                              </div>
                            ) : notice.category === "Academic" ? (
                              <div className="w-22 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                                <p>{notice.category}</p>
                              </div>
                            ) : notice.category === "Exam" ? (
                              <div className="w-22 font-semibold bg-[#d0cfeb] text-[#4840e8] rounded-full flex items-center justify-center">
                                <p>{notice.category}</p>
                              </div>
                            ) : notice.category === "Holiday" ? (
                              <div className="w-22 font-semibold bg-pink-200 text-pink-500 rounded-full flex items-center justify-center">
                                <p>{notice.category}</p>
                              </div>
                            ) : notice.category === "Event" ? (
                              <div className="w-22 font-semibold bg-orange-200 text-orange-500 rounded-full flex items-center justify-center">
                                <p>{notice.category}</p>
                              </div>
                            ) : (
                              <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                                Category
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-2">
                          <p className="text-[14px] text-gray-500">
                            {new Date(notice.publishDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                          <p className="text-[14px] text-gray-500">
                            {new Date(notice.createdAt).toLocaleTimeString(
                              "en-BD",
                              {
                                timeZone: "Asia/Dhaka",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </td>

                        <td className="py-3 px-2">
                          <div>
                            {notice.status === "Active" ? (
                              <div className="w-22 font-semibold bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                                <p>{notice.status}</p>
                              </div>
                            ) : notice.status === "Inactive" ? (
                              <div className="w-22 font-semibold bg-yellow-200 text-yellow-700 rounded-full flex items-center justify-center">
                                <p>{notice.status}</p>
                              </div>
                            ) : notice.status === "Scheduled" ? (
                              <div className="w-26 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                                <p>{notice.status}</p>
                              </div>
                            ) : (
                              <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                                status
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-2">
                          <div className="flex gap-1">
                            <button
                              className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                              // onClick={() => {
                              //   navigate(
                              //     `/admin-dashboard/notices/notice-details/${notice._id}`,
                              //   );
                              // }}
                            >
                              <FaRegEye size={18} />
                            </button>

                            <button
                              className="p-2 rounded-[8px] bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                              // onClick={() =>
                              //   navigate(
                              //     `/admin-dashboard/notices/edit-notice/${notice._id}`,
                              //   )
                              // }
                            >
                              <MdOutlineModeEdit size={18} />
                            </button>
                            <button
                              className="p-2 rounded-[8px] bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all cursor-pointer"
                              // onClick={() => {
                              //   setDeletenotice(notice);
                              //   setShowDeleteModal(true);
                              // }}
                            >
                              <RiDeleteBin6Line size={18} />
                            </button>
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
      </div>
    </div>
  );
}

export default NoticeList;
