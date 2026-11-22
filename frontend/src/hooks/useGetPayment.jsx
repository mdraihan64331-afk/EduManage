import axios from "axios";
import React, { useEffect } from "react";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setPaymentData } from "../redux/paymentSlice";

function useGetPayment() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchPayment = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/fees-payment/all-payments`,
          {
            withCredentials: true,
          },
        );

        dispatch(setPaymentData(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchPayment();
  }, []);
}

export default useGetPayment;
