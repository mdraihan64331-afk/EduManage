import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setResultData } from "../redux/resultSlice";
import { useLocation } from "react-router-dom";

function useGetResult() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const fatchResult = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/result/get-result`, {
          withCredentials: true,
        });

        dispatch(setResultData(result.data));
      } catch (error) {
        console.log(error);
      }
    };

    fatchResult();
  }, [dispatch, location.pathname]);
}

export default useGetResult;
