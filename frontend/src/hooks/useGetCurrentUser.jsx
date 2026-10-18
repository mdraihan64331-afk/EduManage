import React, { useEffect } from "react";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverURL}/api/user/current`, {
          withCredentials: true,
        });

        dispatch(setUserData(result.data));
        // navigate("/");
      } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Backend Error:", error.response?.data);
      }
    };

    fetchUser();
  }, []);
}

export default useGetCurrentUser;
