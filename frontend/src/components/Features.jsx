import React from "react";
import { FaRegClipboard } from "react-icons/fa";
import { IoNewspaperOutline, IoPersonAdd } from "react-icons/io5";
import { RiHeartFill } from "react-icons/ri";
import { SiSimpleanalytics } from "react-icons/si";
import { TbReportAnalytics, TbReportMoneyFilled } from "react-icons/tb";
import { TfiAnnouncement } from "react-icons/tfi";

function Features() {
  return (
    <div className="mt-3 px-6">
      <div className="bg-white shadow rounded-[8px] p-2">
        <div className="text-center">
          <h1 className="text-xl font-bold">Features</h1>
          <p className="text-[14px] text-gray-600">
            Everything you need to manage your school smoothly.
          </p>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            {/* student management */}
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
            <div className="flex items-center gap-4 shadow rounded-[8px] py-2 px-6 w-[295px] h-[82px]">
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
    </div>
  );
}

export default Features;
