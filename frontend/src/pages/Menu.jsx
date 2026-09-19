import React from "react";
import { NavLink } from "react-router-dom";
import { adminCatagories } from "../AdminCategory";
import logoimage from "../assets/login-logo.png";

function Menu() {
  return (
    <div>
      <div className="p-2 bg-[#122940] w-60 h-full">
        <div className="w-10 md:w-10 flex items-center gap-2">
          <img
            src={logoimage}
            alt={logoimage}
            className="bg-white rounded-[10px] p-1"
          />
          <h1 className="font-bold text-white">EduManage</h1>
        </div>
        <div className="text-white flex flex-col gap-3 mt-7">
          {adminCatagories.map((e) => (
            <NavLink
              to={e.path}
              key={e.id}
              className={({ isActive }) =>
                `transition-colors ${isActive ? "flex items-center gap-3 bg-[#122d76] px-2 py-1" : "flex items-center gap-3 hover:bg-[#122d76] px-2 py-1"}`
              }
            >
              <div className="text-xl">{e.icon}</div>
              <div>{e.menu}</div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
