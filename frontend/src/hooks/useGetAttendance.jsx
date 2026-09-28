import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setAttendanceData } from "../redux/attendanceSlice";
import axios from "axios";

function useGetAttendance() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchAttendance = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/attendance/get-all-attendance`,
          { withCredentials: true },
        );

        dispatch(setAttendanceData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchAttendance()
  }, [dispatch]);
}

export default useGetAttendance;
