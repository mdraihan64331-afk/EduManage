import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setResultData } from "../redux/resultSlice";

function useGetResult() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fatchResult = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/result/get-result`, {
          withCredentials: true,
        });

        dispatch(setResultData(result.data));
      } catch (error) {
        console.log("🔥 GET RESULT ERROR:", error);
        console.log("🔥 Backend:", error.response?.data);
      }
    };

    fatchResult();
  }, [dispatch]);
}

export default useGetResult;
