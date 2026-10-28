import React from "react";
import { FaBars, FaBell, FaRegEye, FaRegFileAlt } from "react-icons/fa";
import { GoArrowRight, GoDotFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdOutlinePhotoSizeSelectActual,
  MdOutlineWatchLater,
} from "react-icons/md";
import { useSelector } from "react-redux";

function ShowNotice() {
  const { noticeData } = useSelector((state) => state.notice);
  return (
    <div className="mt-3 px-6">
      <div className="flex gap-4 justify-between">
        <div className="bg-white shadow w-[850px] shadow border border-gray-400 p-2 rounded-[8px]">
          {/* search */}
          <div className="flex items-center gap-4">
            <div className="flex w-165 items-center gap-3 rounded-[8px] py-1 px-2 border border-gray-400">
              <IoSearchOutline />
              <input
                type="text"
                placeholder="Search notices by title..."
                className="w-full outline-none"
              />
            </div>
            <button className="group relative flex items-center gap-3 py-1 px-5 bg-green-200 text-green-700 rounded-[8px] cursor-pointer overflow-hidden">
              <span className="absolute -bottom-full left-0 w-full h-full bg-green-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                Search
                <IoSearchOutline
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button className="py-0.5 w-15 cursor-pointer text-white bg-green-700 rounded-2xl flex items-center justify-center">
              <p>All</p>
            </button>
            <button className="py-0.5 w-20 cursor-pointer text-blue-500 border border-gray-300 rounded-2xl flex items-center justify-center">
              <p>General</p>
            </button>
            <button className="py-0.5 w-25 cursor-pointer text-blue-500 border border-gray-300 rounded-2xl flex items-center justify-center">
              <p>Academic</p>
            </button>
            <button className="py-0.5 w-20 cursor-pointer text-blue-500 border border-gray-300 rounded-2xl flex items-center justify-center">
              <p>Exam</p>
            </button>
            <button className="py-0.5 w-20 cursor-pointer text-blue-500 border border-gray-300 rounded-2xl flex items-center justify-center">
              <p>Holiday</p>
            </button>
            <button className="py-0.5 w-20 cursor-pointer text-blue-500 border border-gray-300 rounded-2xl flex items-center justify-center">
              <p>Event</p>
            </button>
          </div>

          <div>
            {noticeData
              .filter((notice) => notice.status === "Active")
              .map((notice, index) => (
                <div
                  key={index}
                  className={`p-3 flex items-center gap-4 rounded-[8px] my-2 border ${notice.category === "General" ? "bg-green-50  border-green-500" : notice.category === "Academic" ? "bg-blue-50  border-blue-500" : notice.category === "Exam" ? "bg-[#d7d6e8] border-[#4840e8]" : notice.category === "Holiday" ? "bg-pink-50 border-pink-500" : notice.category === "Event" ? "bg-orange-50 border-orange-500" : "bg-white border-gray-400"}`}
                >
                  <div
                    className={`flex items-center justify-center rounded-[8px] h-20 w-20 ${notice.category === "General" ? "bg-green-200  text-green-500" : notice.category === "Academic" ? "bg-blue-200  text-blue-500" : notice.category === "Exam" ? "bg-[#adabe8] text-[#4840e8]" : notice.category === "Holiday" ? "bg-pink-200 text-pink-500" : notice.category === "Event" ? "bg-orange-200 text-orange-500" : "bg-white border-gray-400"}`}
                  >
                    <div>
                      <div className="font-bold text-2xl">
                        {new Date(notice.publishDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                          },
                        )}
                      </div>
                      <div className="text-[14px] font-semibold">
                        {new Date(notice.publishDate).toLocaleDateString(
                          "en-GB",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
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
                        <div className="w-22 font-semibold bg-[#adabe8] text-[#4840e8] rounded-full flex items-center justify-center">
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
                    <div className="font-bold capitalize">
                      {notice.noticeTitle}
                    </div>
                    <div
                      className="mt-1 line-clamp-2 w-[500px]"
                      dangerouslySetInnerHTML={{
                        __html: notice.description,
                      }}
                    />

                    <div className="flex items-center gap-3">
                      <div>
                        {notice.files?.map((file, index) => {
                          const fileUrl =
                            typeof file === "string" ? file : file.url;

                          const fileName =
                            typeof file === "string"
                              ? fileUrl?.split("/").pop()
                              : file.name;

                          return (
                            <div key={index}>
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 text-[14px] text-gray-500 hover:text-blue-600"
                              >
                                <FaRegFileAlt />
                                {fileName || "Unknown file"}
                              </a>
                            </div>
                          );
                        })}
                      </div>
                      <div>
                        <p className="flex items-center gap-2 text-[14px] text-gray-500">
                          <MdOutlineWatchLater />
                          {new Date(notice.createdAt).toLocaleTimeString(
                            "en-BD",
                            {
                              timeZone: "Asia/Dhaka",
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-2 text-[14px] text-gray-500">
                          <MdOutlinePhotoSizeSelectActual />

                          {notice.files?.[0]?.size != null
                            ? `${(notice.files[0].size / 1024 / 1024).toFixed(2)} MB`
                            : "Size unavailable"}
                        </p>
                      </div>
                      <div>
                        <p className="flex items-center gap-2 text-[14px] text-gray-500">
                          <FaRegEye />
                          1.6k
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="group relative flex items-center gap-3 py-1 px-5 bg-blue-200 text-blue-700 rounded-[8px] cursor-pointer overflow-hidden">
                    <span className="absolute -bottom-full left-0 w-full h-full bg-blue-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

                    <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                      View Details
                      <GoArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div className="w-[375px]">
          {/* notice categories */}
          <div className="bg-white p-3 shadow border border-gray-400 rounded-[8px]">
            <div className="flex items-center gap-3 font-bold">
              <FaRegFileAlt />
              <h4>Notice Categories</h4>
            </div>

            <div className="flex flex-col gap-3 mt-4 text-[14px] text-gray-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <FaBars />
                  <p>All Notices</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) => notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center  text-green-600 bg-green-200">
                    <GoDotFill />
                  </div>
                  <p>General</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) =>
                            notice.category === "General" &&
                            notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center  text-blue-600 bg-blue-200">
                    <GoDotFill />
                  </div>
                  <p>Academic</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) =>
                            notice.category === "Academic" &&
                            notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center  bg-[#d0cfeb] text-[#4840e8]">
                    <GoDotFill />
                  </div>
                  <p>Exam</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) =>
                            notice.category === "Exam" &&
                            notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center  text-pink-600 bg-pink-200">
                    <GoDotFill />
                  </div>
                  <p>Hoilday</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) =>
                            notice.category === "Holiday" &&
                            notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 ">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center  text-orange-600 bg-orange-200">
                    <GoDotFill />
                  </div>
                  <p>Event</p>
                </div>
                <div className="h-7 w-7 rounded-[8px] flex items-center justify-center p-2 bg-gray-200 ">
                  <p>
                    {Array.isArray(noticeData)
                      ? noticeData.filter(
                          (notice) =>
                            notice.category === "Event" &&
                            notice.status === "Active",
                        ).length
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* recent notices */}
          <div className="bg-white p-3 border mt-5 shadow border-gray-400 rounded-[8px]">
            <div className="flex items-center gap-3 font-bold">
              <FaBell />
              <h4>Recent Notices</h4>
            </div>

            <div className="mt-4">
              {Array.isArray(noticeData) &&
                noticeData
                  .filter((notice) => notice.status === "Active")
                  .splice(0, 5)
                  .map((notice, index) => (
                    <div key={index} className="mt-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${notice.category === "General" ? "text-green-600 bg-green-200" : notice.category === "Academic" ? "text-blue-600 bg-blue-200" : notice.category === "Exam" ? "bg-[#d0cfeb] text-[#4840e8]" : notice.category === "Holiday" ? "text-pink-600 bg-pink-200" : notice.category === "Event" ? "text-orange-600 bg-orange-200" : ""}`}
                        >
                          <GoDotFill />
                        </div>

                        <div className="text-gray-500">
                          <h4 className="font-semibold capitalize text-[16px]">
                            {notice.noticeTitle}
                          </h4>
                          <p className="text-[14px]">
                            {new Date(notice.publishDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowNotice;
