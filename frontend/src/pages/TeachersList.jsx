import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";

function TeachersList() {
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
      </div>
    </div>
  );
}

export default TeachersList;
