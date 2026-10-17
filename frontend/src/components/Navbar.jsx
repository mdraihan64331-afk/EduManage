import React, { useState } from "react";
import logoimage from "../assets/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);

  const navList = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Notice", path: "/notice" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogOut = async () => {
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
    <div className="px-4 py-2 bg-white shadow-gray-100 shadow-xs flex justify-between items-center">
      <Link to={"/"} className="cursor-pointer h-15 w-30">
        <img src={logoimage} alt="" className="h-[100%] w-[100%]" />
      </Link>
      <div className="flex gap-8">
        {navList.map((item, index) => (
          <>
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                ` transition ${isActive ? "text-green-600" : "hover:text-green-600"}`
              }
            >
              {item.name}
            </NavLink>
          </>
        ))}
      </div>
      {userData ? (
        <div>
          <button
            className="cursor-pointer"
            onClick={() => setShowPopup((prev) => !prev)}
          >
            {userData?.image ? (
              <>
                <div>
                  <img
                    src={userData?.image}
                    alt={userData?.fullName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
              </>
            ) : (
              <div className="h-10 w-10 bg-blue-700 rounded-full flex items-center justify-center text-white">
                {userData?.fullName.slice(0, 1).toUpperCase()}
              </div>
            )}
          </button>

          {/* show logout popup */}
          {showPopup && (
            <>
              <div className="absolute z-10 top-[80px] shadow right-2 p-2 bg-white flex flex-col gap-4 rounded-[8px]">
                <div className="flex items-center justify-end">
                  <button
                    className="cursor-pointer"
                    onClick={() => setShowPopup(false)}
                  >
                    <RxCross2 />
                  </button>
                </div>
                <button
                  className="py-2 px-6 font-semibold bg-blue-800 text-white rounded-xl cursor-pointer"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <button
            className="py-2 px-6 font-semibold bg-blue-800 text-white rounded-xl cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
}

export default Navbar;
