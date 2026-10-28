import React from "react";
import schoolImage from "../assets/EduManage School Campus in Bangladesh.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaRegClipboard,
} from "react-icons/fa";
import {
  IoLocationSharp,
  IoNewspaperOutline,
  IoPersonAdd,
} from "react-icons/io5";
import { RiHeartFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { TbReportAnalytics, TbReportMoneyFilled } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";
import { GoDotFill } from "react-icons/go";
import { FcOk } from "react-icons/fc";
import { MdPhone } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Features() {
  const { noticeData } = useSelector((state) => state.notice);
  const navigate = useNavigate();
  return (
    <div className="mt-5 px-6">
      <div className="bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] p-2">
        <div className="text-center">
          <h1 className="text-xl font-bold">Features</h1>
          <p className="text-[14px] text-gray-600">
            Everything you need to manage your school smoothly.
          </p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            {/* student management */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-full">
                <IoPersonAdd size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Student Management</h4>
                <p className="text-gray-600 text-[14px]">
                  Add, edit and manage student
                </p>
                <p className="text-gray-600 text-[14px]">information easliy.</p>
              </div>
            </div>
            {/* Result management */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-orange-100 text-orange-400 rounded-full">
                <FaRegClipboard size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Result Management</h4>
                <p className="text-gray-600 text-[14px]">
                  Add Result, calculate GPA and
                </p>
                <p className="text-gray-600 text-[14px]">generate reports.</p>
              </div>
            </div>
            {/* Attendance Tracking */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-emerald-100 text-emerald-500 rounded-full">
                <TbReportAnalytics size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Attendance Tracking</h4>
                <p className="text-gray-600 text-[14px]">
                  Track daily attendance and
                </p>
                <p className="text-gray-600 text-[14px]">generate reports.</p>
              </div>
            </div>
            {/* daily performance */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-red-100 text-red-700 rounded-full">
                <RiHeartFill size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Daily Performance</h4>
                <p className="text-gray-600 text-[14px]">
                  Record daily performance
                </p>
                <p className="text-gray-600 text-[14px]">
                  and monitor progress.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3">
            {/* Homework management */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-orange-100 text-orange-400 rounded-full">
                <IoNewspaperOutline size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Homework Management</h4>
                <p className="text-gray-600 text-[14px]">
                  Assign homework and track
                </p>
                <p className="text-gray-600 text-[14px]">submission.</p>
              </div>
            </div>
            {/* Notice & Annoucement */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-full">
                <TfiAnnouncement size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Notice & Annoucement</h4>
                <p className="text-gray-600 text-[14px]">
                  Publish notices and announcements.
                </p>
                <p className="text-gray-600 text-[14px]"></p>
              </div>
            </div>
            {/* Fees & Payments */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full">
                <TbReportMoneyFilled size={20} />
              </div>
              <div>
                <h4 className="font-semibold">Fees & Payments</h4>
                <p className="text-gray-600 text-[14px]">
                  Manage fees collection and
                </p>
                <p className="text-gray-600 text-[14px]">payments.</p>
              </div>
            </div>
            {/* Reports & Analytics */}
            <div className="flex items-center gap-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
              <div className="flex items-center justify-center p-2 bg-blue-100 text-blue-700 rounded-full">
                <SiSimpleanalytics size={18} />
              </div>
              <div>
                <h4 className="font-semibold">Reports & Analytics</h4>
                <p className="text-gray-600 text-[14px]">
                  Generate desiled reports
                </p>
                <p className="text-gray-600 text-[14px]">and analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        {/* latest notice */}
        <div className="bg-white rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.15)] h-[286px] p-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Latest Notices</h1>
            <button
              className="text-blue-600 hover:underline transition-all cursor-pointer text-[14px]"
              onClick={() => navigate("/notice")}
            >
              View All
            </button>
          </div>

          <div className="mt-3">
            {Array.isArray(noticeData) &&
              noticeData
                .filter((notice) => notice.status === "Active")
                .splice(0, 3)
                .map((notice, index) => (
                  <div key={index} className="mt-3 w-[340px]">
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
                        <div
                          className="line-clamp-1 text-[14px] text-gray-500"
                          dangerouslySetInnerHTML={{
                            __html: notice.description,
                          }}
                        />
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
        {/* about our school */}
        <div className="bg-white rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.15)] h-[286px] p-3">
          <h1 className="text-xl font-bold">About Out School</h1>
          <div className="text-gray-600 text-[14px] mt-2">
            <p>
              EduManage School is committed to providing quality education and a
            </p>
            <p>
              conducive environment for students to learn and grow. Our mission
              is
            </p>
            <p>
              to empower students with knowledge, skills and values to become
            </p>
            <p>responsible citizens.</p>
          </div>
          <div className="mt-3 flex items-center gap-9">
            <div>
              <div className="flex items-center gap-2">
                <FcOk /> Quality Education
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Experienced Teachers
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Modern Learning Environment
              </div>
              <div className="flex items-center gap-2">
                <FcOk /> Overall Development
              </div>
            </div>
            <div>
              <img
                src={schoolImage}
                alt="EduManage School"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* contact us */}
        <div className="bg-white rounded-[8px] shadow-[0_0_10px_rgba(0,0,0,0.15)] h-[286px] p-3">
          <h1 className="text-xl font-bold">Contact Us</h1>

          <div className="flex flex-col gap-3 mt-3">
            <div className="flex items-center gap-3">
              <IoLocationSharp />
              <div>
                <p className="text-[14px] text-gray-600">
                  123 Education Street, Dhaka, Bangladesh
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MdPhone />
              <div>
                <p className="text-[14px] text-gray-600">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CgMail />
              <div>
                <p className="text-[14px] text-gray-600">info@edumanage.com</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-9">
            <div>
              <FaFacebookSquare className="text-blue-600" size={25} />
            </div>
            <div>
              <FaSquareXTwitter size={25} />
            </div>
            <div>
              <FaLinkedin className="text-[#0A66C2]" size={25} />
            </div>
            <div>
              <FaInstagramSquare className="text-[#e1306c]" size={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
