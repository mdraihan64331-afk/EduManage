import React from "react";
import logoimage from "../assets/EduManage Monochrome Logo.png";
import { Link } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { CgMail } from "react-icons/cg";

function Footer() {
  return (
    <div className="mt-5 px-6">
      <div className="bg-green-800 rounded-[8px] py-3 px-6 text-white">
        <div className=" flex justify-between">
          {/* edu manage */}
          <div>
            <Link to={"/"} className="cursor-pointer ">
              <img src={logoimage} alt="" className="h-15 w-30" />
            </Link>
            <div className="mt-3">
              <p>A complete school management</p>
              <p>solution to manage all academic</p>
              <p>activites in one place.</p>
            </div>
          </div>
          {/* quick links */}
          <div>
            <h1 className="text-[17px] font-bold">Quick Links</h1>
            <div className="flex flex-col gap-1 mt-3">
              <Link
                to={"/"}
                className="hover:underline transition-all text-[14px]"
              >
                Home
              </Link>
              <Link
                to={"/about"}
                className="hover:underline transition-all text-[14px]"
              >
                About Us
              </Link>
              <Link
                to={"/features"}
                className="hover:underline transition-all text-[14px]"
              >
                Features
              </Link>
              <Link
                to={"/notice"}
                className="hover:underline transition-all text-[14px]"
              >
                Notice
              </Link>
              <Link
                to={"/Contact"}
                className="hover:underline transition-all text-[14px]"
              >
                Contact
              </Link>
            </div>
          </div>
          {/* our features */}
          <div>
            <h1 className="text-[17px] font-bold">Our Features</h1>
            <div className="flex flex-col gap-1 mt-3">
              <p className="text-[14px]">Student Management</p>
              <p className="text-[14px]">Result Management</p>
              <p className="text-[14px]">Attendance Tracking</p>
              <p className="text-[14px]">Performance</p>
              <p className="text-[14px]">Reports</p>
            </div>
          </div>
          {/* support */}
          <div>
            <h1 className="text-[17px] font-bold">Support</h1>
            <div className="flex flex-col gap-1 mt-3">
              <Link className="hover:underline transition-all text-[14px]">
                Help Center
              </Link>
              <Link className="hover:underline transition-all text-[14px]">
                Privacy Policy
              </Link>
              <Link className="hover:underline transition-all text-[14px]">
                Terms & Conditions
              </Link>
              <Link className="hover:underline transition-all text-[14px]">
                FAQ
              </Link>
            </div>
          </div>
          {/* contact info */}
          <div>
            <h1 className="text-[17px] font-bold">Contact Info</h1>
            <div className="flex flex-col gap-1 mt-3">
              <div className="flex items-center gap-3">
                <IoLocationSharp />
                <div>
                  <p className="text-[14px]">
                    123 Education Street, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MdPhone />
                <div>
                  <p className="text-[14px]">+880 1234-567890</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CgMail />
                <div>
                  <p className="text-[14px]">info@edumanage.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* copy right */}
        <div className="mt-5 pt-3 border-t text-center">
          <p>@2026 EduManage School Management System. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
