import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setNoticeData } from "../redux/noticeSlice";

function useGetNotice() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fatchNotice = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/notice/get-notice`, {
          withCredentials: true,
        });

        dispatch(setNoticeData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchNotice();
  }, [dispatch]);
}

export default useGetNotice;
