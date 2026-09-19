import React from "react";
import Menu from "../pages/Menu";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverURL}/api/auth/log-out`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <Menu />
      <div className="flex justify-center items-center">
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default Logout;
