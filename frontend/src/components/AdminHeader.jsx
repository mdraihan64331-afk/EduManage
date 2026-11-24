import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function AdminHeader() {
  const { adminData } = useSelector((state) => state.admin);
  return (
    <div className="flex justify-end gap-5 items-center bg-white p-2 sticky top-0 left-0 z-50">
      <div className="flex items-center gap-2 border border-gray-400 rounded-[5px] p-1">
        <IoSearchOutline />
        <input
          type="text"
          placeholder="Search anything..."
          className="outline-none"
        />
      </div>
      <IoNotificationsOutline />
      <div className="flex items-center gap-2">
        {adminData?.profileImage ? (
          <img
            src={adminData.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
            {adminData?.fullName?.slice(0, 1).toUpperCase()}
          </h1>
        )}
        <h1 className="font-semibold">{adminData?.fullName}</h1>
      </div>
    </div>
  );
}

export default AdminHeader;
