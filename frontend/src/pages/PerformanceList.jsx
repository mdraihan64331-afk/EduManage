import React from "react";
import { GrDocumentPerformance } from "react-icons/gr";
import AdminHeader from "../components/AdminHeader";
import Menu from "./Menu";

function PerformanceList() {
  return (
    <div className="flex bg-blue-50">
      <Menu />
      {/* notice add section */}

      <div className=" w-full ">
        {/* admin header */}
        <AdminHeader />
        {/* add notice */}
        <div className="p-2">
          {/* add new notice */}
          <div className="flex items-center gap-4">
            <GrDocumentPerformance size={40} className="text-green-700" />
            {/* Header */}
            <div className="mb-6">
              <h1 className="mt-2 text-2xl font-bold text-slate-800 sm:text-3xl">
                Add Daily Performance
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Track the student's daily learning and classroom activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PerformanceList;
