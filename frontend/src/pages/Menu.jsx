import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { adminCatagories } from "../AdminCategory";
import logoimage from "../assets/login-logo.png";
import { IoIosArrowDown } from "react-icons/io";

function Menu() {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  return (
    <div>
      <div className="p-2 bg-[#122940] w-60 h-full">
        {/* Logo */}
        <div className="w-10 md:w-10 flex items-center gap-2">
          <img
            src={logoimage}
            alt="EduManage"
            className="bg-white rounded-[10px] p-1"
          />
          <h1 className="font-bold text-white">EduManage</h1>
        </div>

        {/* Menu */}
        <div className="text-white flex flex-col gap-3 mt-7">
          {adminCatagories.map((e) => (
            <div key={e.id}>
              {/* Main Menu */}
              {e.subMenu ? (
                <div
                  onClick={() => setOpenMenu(openMenu === e.id ? null : e.id)}
                  className="flex items-center justify-between px-2 py-1 cursor-pointer rounded-[7px] hover:bg-[#2f8456]"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-xl">{e.icon}</div>
                    <div>{e.menu}</div>
                  </div>

                  <IoIosArrowDown
                    className={`transition-transform ${
                      openMenu === e.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              ) : (
                <NavLink
                  to={e.path}
                  className={({ isActive }) =>
                    `transition-colors ${
                      isActive
                        ? "flex items-center gap-3 bg-[#2f8456] px-2 py-1 rounded-[7px]"
                        : "flex items-center gap-3 hover:bg-[#2f8456] px-2 py-1 rounded-[7px]"
                    }`
                  }
                >
                  <div className="text-xl">{e.icon}</div>

                  <div>{e.menu}</div>
                </NavLink>
              )}

              {/* Submenu */}
              {e.subMenu && openMenu === e.id && (
                <div className="ml-9 mt-1 flex flex-col gap-1">
                  {e.subMenu.map((subItem) => (
                    <NavLink
                      key={subItem.path}
                      to={subItem.path}
                      className={({ isActive }) =>
                        `px-2 py-1 text-sm rounded ${
                          isActive ? "bg-[#2f8456] rounded-[7px]" : "hover:bg-[#2f8456] rounded-[7px]"
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        {subItem.icon}
                        {subItem.subMenuName}
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
