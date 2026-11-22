import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverURL } from "../App";
import { setClassFees } from "../redux/classRoomAndFeesSlice";

function useGetClassRoomAndFees() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fatchClassRoomAndFees = async () => {
      try {
        const result = await axios.get(
          `${serverURL}/api/classes/get-all-total-class-room-and-fees`,
          { withCredentials: true },
        );

        dispatch(setClassFees(result.data));
      } catch (error) {
        console.log(error);
      }
    };
    fatchClassRoomAndFees();
  }, []);
}

export default useGetClassRoomAndFees;
