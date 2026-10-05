import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import { IoNotificationsOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { useSelector } from "react-redux";

function ResultDetails() {
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const { resultData } = useSelector((state) => state.result);

  useEffect(() => {
    const fatchResults = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/result/get-result-by-id/${id}`,
          { withCredentials: true },
        );

        console.log(result.data);
        setResult(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fatchResults();
  }, [id]);


  return (
    <div className="flex bg-blue-50">
      <Menu />
      <div className="w-full">
        {/* student details head section */}
        <div className="flex justify-end gap-5 items-center bg-white p-2">
          <IoNotificationsOutline />
          <div className="flex items-center gap-2">
            {result?.student?.image ? (
              <img
                src={result?.student?.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <h1 className="font-semibold bg-purple-800 flex justify-center items-center text-white w-[40px] h-[40px] rounded-full">
                {result?.student?.fullName?.slice(0, 1).toUpperCase()}
              </h1>
            )}
            <div>
              <h1 className="font-semibold capitalize">{result?.student?.fullName}</h1>
              <p className="text-gray-400 text-xs">Student</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultDetails;
