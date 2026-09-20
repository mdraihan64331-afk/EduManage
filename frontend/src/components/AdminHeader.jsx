import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

function AdminHeader() {
      const { userData } = useSelector((state) => state.user);
  return (
    <div className="flex justify-end gap-5 items-center bg-white p-2">
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
        {userData?.profileImage ? (
          <img
            src={userData.profileImage}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
            {userData?.fullName?.slice(0, 2).toUpperCase()}
          </h1>
        )}
        <h1 className="font-semibold">{userData?.fullName}</h1>
      </div>
    </div>
  );
}

export default AdminHeader;
