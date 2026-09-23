import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { serverURL } from "../App";
import { setTeacherData } from "../redux/teacherSlice";

function useGetTeacher() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fatchTeachers = async () => {
      const result = await axios.get(`${serverURL}/api/teacher/all-teacher`, {
        withCredentials: true,
      });

      dispatch(setTeacherData(result.data));
    };
    fatchTeachers();
  }, []);
}

export default useGetTeacher;
