import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { MdOutlineModeEdit } from "react-icons/md";

function EditMarkAttendance() {
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div className="p-2">
          <div className="flex items-center gap-3">
            <MdOutlineModeEdit size={35} className="text-green-700" />
            <div>
              <h1 className="text-2xl font-bold">Edit Attendance</h1>
              <p>Edit and save student attendance.</p>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default EditMarkAttendance;
