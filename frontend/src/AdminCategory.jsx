import { IoHomeOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import { MdEventAvailable } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { RiLineChartLine } from "react-icons/ri";
import { RiBookletLine } from "react-icons/ri";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiMedalLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoPersonCircleOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
import { GiGraduateCap } from "react-icons/gi";

export const adminCatagories = [
  {
    id: 1,
    icon: <IoHomeOutline />,
    menu: "Dashboard",
    path: "/admin-dashboard",
  },
  {
    id: 2,
    icon: <RxPeople />,
    menu: "Students",
    path: "/students",
    subMenu: [
      {
        icon: <RxPeople />,
        subMenuName: "Add Student",
        path: "/students/add-student",
      },
      {
        icon: <CiViewList />,
        subMenuName: "Student List ",
        path: "/students/list-student",
      },
    ],
  },
  {
    id: 3,
    icon: <SlPeople />,
    menu: "Teachers",
    path: "/teachers",
    subMenu: [
      {
        icon: <SlPeople />,
        subMenuName: "Add Teacher",
        path: "/teacher/add-teacher",
      },
      {
        icon: <CiViewList />,
        subMenuName: "Teacher List",
        path: "/teacher/teachers-list",
      },
    ],
  },
  {
    id: 4,
    icon: <SiGoogleclassroom />,
    menu: "Classes",
    path: "/classes",
    subMenu: [
      {
        icon: <SiGoogleclassroom />,
        subMenuName: "Add Class",
        path: "/classes/add-class",
      },
      {
        icon: <GiGraduateCap />,
        subMenuName: "Class List",
        path: "/classes/class-list",
      },
    ],
  },
  {
    id: 5,
    icon: <MdEventAvailable />,
    menu: "Attendance",
    path: "/attendances",
  },
  { id: 6, icon: <FaChartBar />, menu: "Results", path: "/results" },
  {
    id: 7,
    icon: <RiLineChartLine />,
    menu: "Performance",
    path: "/performances",
  },
  { id: 8, icon: <RiBookletLine />, menu: "Homework", path: "/homeworks" },
  {
    id: 9,
    icon: <RiMoneyDollarCircleLine />,
    menu: "Fees / Payments",
    path: "/fees-payments",
  },
  {
    id: 10,
    icon: <IoNotificationsOutline />,
    menu: "Notice / Announcement",
    path: "/notice-announcements",
  },
  { id: 11, icon: <RiMedalLine />, menu: "Rankings", path: "/ranknings" },
  {
    id: 12,
    icon: <IoDocumentTextOutline />,
    menu: "Reports",
    path: "/reports",
  },
  { id: 13, icon: <IoSettingsOutline />, menu: "Settings", path: "/settings" },
  {
    id: 14,
    icon: <IoPersonCircleOutline />,
    menu: "Profile",
    path: "/profile",
  },
  { id: 15, icon: <IoLogOutOutline />, menu: "Logout", path: "/logout" },
];
