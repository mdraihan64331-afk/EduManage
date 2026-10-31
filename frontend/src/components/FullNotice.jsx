import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuArrowLeft, LuDownload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";
import { serverURL } from "../App";
import { IoMdShare } from "react-icons/io";
import { FaFileAlt, FaFileWord, FaLink, FaRegFileAlt } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";

function FullNotice() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fatchNotice = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/notice/notice/${id}`, {
          withCredentials: true,
        });

        setNotice(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fatchNotice();
  }, [id]);

  const imageFiles = notice?.files?.filter((file) => {
    const name = typeof file === "string" ? file : file.name;
    return /\.(jpg|png)$/i.test(name || "");
  });

  const documentFiles = notice?.files?.filter((file) => {
    const name = typeof file === "string" ? file : file.name;
    return /\.(pdf|doc|docx)$/i.test(name || "");
  });

  const getFileIcon = (fileName) => {
    const extension = fileName?.split(".").pop().toLowerCase();

    if (extension === "pdf") {
      return <BiSolidFilePdf size={24} className="text-red-500" />;
    }

    if (extension === "doc") {
      return <FaFileWord size={24} className="text-blue-500" />;
    }

    if (extension === "docx") {
      return <FaFileAlt size={24} className="text-indigo-500" />;
    }

    return <FaFileAlt size={24} className="text-gray-500" />;
  };
  return (
    <div className="px-6 mt-4">
      <div className="bg-white rounded-[8px] shadow p-3 w-[826px]">
        <button
          className="flex cursor-pointer items-center gap-3 bg-green-100 rounded-full py-1 px-2 text-green-600"
          onClick={() => navigate("/notice")}
        >
          <LuArrowLeft />
          <p>Back to All Notice</p>
        </button>

        <div className="bg-white rounded-[8px] mt-3 py-3 px-2 border border-gray-400 ">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center rounded-[8px] h-20 w-20 ${notice?.category === "General" ? "bg-green-200  text-green-500" : notice?.category === "Academic" ? "bg-blue-200  text-blue-500" : notice?.category === "Exam" ? "bg-[#adabe8] text-[#4840e8]" : notice?.category === "Holiday" ? "bg-pink-200 text-pink-500" : notice?.category === "Event" ? "bg-orange-200 text-orange-500" : "bg-white border-gray-400"}`}
              >
                <div>
                  <div className="font-bold text-2xl text-center">
                    {new Date(notice?.publishDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                    })}
                  </div>
                  <div className="text-[14px] font-semibold">
                    {new Date(notice?.publishDate).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div>
                <div className="flex flex-col gap-4">
                  <h1 className="font-bold text-3xl capitalize">
                    {notice?.noticeTitle}
                  </h1>
                  <div className="flex items-center gap-5">
                    <div>
                      {notice?.category === "General" ? (
                        <div className="w-22 font-semibold bg-green-200 text-green-700 rounded-full flex items-center justify-center">
                          <p>{notice?.category}</p>
                        </div>
                      ) : notice?.category === "Academic" ? (
                        <div className="w-22 font-semibold bg-blue-200 text-blue-500 rounded-full flex items-center justify-center">
                          <p>{notice?.category}</p>
                        </div>
                      ) : notice?.category === "Exam" ? (
                        <div className="w-22 font-semibold bg-[#adabe8] text-[#4840e8] rounded-full flex items-center justify-center">
                          <p>{notice?.category}</p>
                        </div>
                      ) : notice?.category === "Holiday" ? (
                        <div className="w-22 font-semibold bg-pink-200 text-pink-500 rounded-full flex items-center justify-center">
                          <p>{notice?.category}</p>
                        </div>
                      ) : notice?.category === "Event" ? (
                        <div className="w-22 font-semibold bg-orange-200 text-orange-500 rounded-full flex items-center justify-center">
                          <p>{notice?.category}</p>
                        </div>
                      ) : (
                        <div className="w-22 font-semibold bg-black text-white rounded-[8px] flex items-center justify-center">
                          Category
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-500 text-[14px]">
                        Published:{" "}
                        {new Date(notice?.publishDate).toLocaleDateString(
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
              </div>
            </div>
            <button className="border w-20 h-[33px] border-gray-300 rounded-[8px] py-1 px-2 cursor-pointer flex justify-center items-center gap-2">
              <IoMdShare /> Share
            </button>
          </div>

          <div className="mt-3">
            {imageFiles?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageFiles?.map((file, index) => {
                  const fileUrl = typeof file === "string" ? file : file.url;

                  return (
                    <div
                      key={index}
                      className="rounded-xl w-full overflow-hidden object-cover"
                    >
                      <img
                        src={fileUrl}
                        alt="Notice attachment"
                        className="w-full"
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="my-5 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                <FaRegFileAlt className="mx-auto mb-3 text-3xl text-gray-400" />

                <h3 className="font-semibold text-gray-700">No Image Found</h3>
              </div>
            )}
          </div>

          <div
            className="mt-3"
            dangerouslySetInnerHTML={{
              __html: notice?.description,
            }}
          />

          <div className="bg-white rounded-[8px] mt-6 border border-gray-200 py-1 px-2">
            <div className="flex items-center gap-3 font-semibold">
              <FaLink />
              <h2>Attachments</h2>
            </div>

            <div className="mt-3">
              <div>
                {documentFiles?.length > 0 ? (
                  <div className="space-y-3">
                    {documentFiles.map((file, index) => {
                      const fileUrl =
                        typeof file === "string" ? file : file.url;

                      const fileName =
                        typeof file === "string"
                          ? fileUrl?.split("/").pop()
                          : file.name;

                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-blue-50 py-2 px-3 rounded-[8px]"
                        >
                          <div className="flex items-center gap-3">
                            <div>{getFileIcon(fileName)}</div>

                            <div>
                              <h3 className="text-sm font-medium text-gray-700">
                                {fileName || "Unknown file"}
                              </h3>
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="flex items-center gap-2 text-[14px] text-gray-500">
                                    <MdOutlinePhotoSizeSelectActual />

                                    {notice.files?.filter((file) => {
                                      const fileName =
                                        typeof file === "string"
                                          ? file
                                          : file.name;

                                      return /\.(pdf|doc|docx)$/i.test(
                                        fileName || "",
                                      );
                                    }).length > 0
                                      ? `${(
                                          notice.files
                                            .filter((file) => {
                                              const fileName =
                                                typeof file === "string"
                                                  ? file
                                                  : file.name;

                                              return /\.(pdf|doc|docx)$/i.test(
                                                fileName || "",
                                              );
                                            })
                                            .reduce((total, file) => {
                                              return (
                                                total +
                                                (typeof file === "string"
                                                  ? 0
                                                  : file.size || 0)
                                              );
                                            }, 0) /
                                          1024 /
                                          1024
                                        ).toFixed(2)} MB`
                                      : "Size unavailable"}
                                  </p>
                                </div>
                                <div className="w-[1px] h-3 bg-gray-400"></div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase">
                                    {fileName?.split(".").pop()} Document
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative flex items-center gap-3 py-2 px-5 text-green-700 rounded-[8px] cursor-pointer overflow-hidden"
                          >
                            <span className="absolute -bottom-full left-0 w-full h-full bg-green-700 rounded-[40%] group-hover:bottom-0 group-hover:rounded-none transition-all duration-700 ease-in-out"></span>

                            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-300">
                              Download
                              <LuDownload
                                size={18}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                              />
                            </span>
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="my-5 rounded-lg border border-dashed border-gray-300 p-8 text-center">
                    <FaRegFileAlt className="mx-auto mb-3 text-3xl text-gray-400" />

                    <h3 className="font-semibold text-gray-700">
                      No Documents Found
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default FullNotice;
