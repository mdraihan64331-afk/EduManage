import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";

function ClassList() {
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />
        <div className="p-2">
          
        </div>
      </div>
    </div>
  );
}

export default ClassList;
