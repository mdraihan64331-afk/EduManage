import React from "react";
import Menu from "./Menu";
import AdminHeader from "../components/AdminHeader";
import { useSelector } from "react-redux";

function ResultList() {
  const { resultData } = useSelector((state) => state.result);

  const results = Array.isArray(resultData) ? resultData : [];
  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        <AdminHeader />

        <div>
          {results.map((result) => (
            <div key={result._id}>{result.student?.fullName}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultList;
