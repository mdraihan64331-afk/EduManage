import React from "react";
import Menu from "../pages/Menu";
import axios from "axios";
import { serverURL } from "../App";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdminData } from "../redux/adminSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await axios.post(
        `${serverURL}/api/admin-auth/admin-logout`,
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(setAdminData(null));
      navigate("/user-dashboard");

      console.log(result.data.message);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="flex">
      <Menu />
      <div className="flex justify-center items-center bg-red-500 px-2 py-1 rounded-[8px] h-10">
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

export default Logout;
