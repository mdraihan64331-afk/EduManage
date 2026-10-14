import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverURL } from "../App";
import { setFeesPaymentData } from "../redux/feesPaymentSlice";
import { useLocation } from "react-router-dom";

function useGetFeesPayment() {
  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    const fatchFeesPayment = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/fees-payment/all-fees`,
          { withCredentials: true },
        );

        dispatch(setFeesPaymentData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchFeesPayment();
  }, [dispatch, location.pathname]);
}

export default useGetFeesPayment;
