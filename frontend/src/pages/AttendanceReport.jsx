import React from "react";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";

function AttendanceReport() {
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        
      </div>
    </div>
  );
}

export default AttendanceReport;
