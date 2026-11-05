import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverURL } from "../App";
import axios from "axios";
import { setPerformanceData } from "../redux/performanceSlice";

function useGetPerformance() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fatchPerformance = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/performance/get-all-performance`,
          { withCredentials: true },
        );

        dispatch(setPerformanceData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchPerformance();
  }, [dispatch]);
}

export default useGetPerformance;
