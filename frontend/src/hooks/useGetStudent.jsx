import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverURL } from "../App";
import axios from "axios";
import { setStudentData } from "../redux/studentSlice";

function useGetStudent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStudents = async () => {
      const result = await axios.get(`${serverURL}/api/student/all-students`, {
        withCredentials: true,
      });

      dispatch(setStudentData(result.data));
    };

    fetchStudents();
  }, []);
}

export default useGetStudent;
