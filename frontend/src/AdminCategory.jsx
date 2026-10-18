import { IoCalendarNumber, IoHomeOutline } from "react-icons/io5";
import { RxPeople } from "react-icons/rx";
import { SlPeople } from "react-icons/sl";
import { SiGoogleclassroom } from "react-icons/si";
import {
  MdEventAvailable,
  MdOutlineModeEdit,
  MdOutlinePreview,
} from "react-icons/md";
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
import { TbReportAnalytics } from "react-icons/tb";
import { BsPersonAdd } from "react-icons/bs";
import { CircleDollarSign, HandCoins } from "lucide-react";

export const adminCatagories = [
  {
    id: 1,
    icon: <IoHomeOutline />,
    menu: "Dashboard",
    path: "/admin-dashboard/dashboard",
  },
  {
    id: 2,
    icon: <RxPeople />,
    menu: "Students",
    path: "/admin-dashboard/students",
    subMenu: [
      {
        icon: <RxPeople />,
        subMenuName: "Add Student",
        path: "/admin-dashboard/students/add-student",
      },
      {
        icon: <CiViewList />,
        subMenuName: "Student List ",
        path: "/admin-dashboard/students/list-student",
      },
    ],
  },
  {
    id: 3,
    icon: <SlPeople />,
    menu: "Teachers",
    path: "/admin-dashboard/teachers",
    subMenu: [
      {
        icon: <SlPeople />,
        subMenuName: "Add Teacher",
        path: "/admin-dashboard/teacher/add-teacher",
      },
      {
        icon: <CiViewList />,
        subMenuName: "Teacher List",
        path: "/admin-dashboard/teacher/teachers-list",
      },
    ],
  },
  {
    id: 4,
    icon: <SiGoogleclassroom />,
    menu: "Classes",
    path: "/admin-dashboard/classes",
  },
  {
    id: 5,
    icon: <MdEventAvailable />,
    menu: "Attendance",
    path: "/admin-dashboard/attendances",
    subMenu: [
      {
        icon: <IoCalendarNumber />,
        subMenuName: "Mark Attendance",
        path: "/admin-dashboard/attendances/mark-attendance",
      },
      {
        icon: <TbReportAnalytics />,
        subMenuName: "Attendance Report",
        path: "/admin-dashboard/attendances/attendance-report",
      },
    ],
  },
  {
    id: 6,
    icon: <FaChartBar />,
    menu: "Results",
    path: "/admin-dashboard/results",
    subMenu: [
      {
        icon: <BsPersonAdd />,
        subMenuName: "Add Result",
        path: "/admin-dashboard/result/add-result",
      },
      {
        icon: <MdOutlinePreview />,
        subMenuName: "Result List",
        path: "/admin-dashboard/result/view-result",
      },
    ],
  },
  {
    id: 7,
    icon: <RiLineChartLine />,
    menu: "Performance",
    path: "/admin-dashboard/performances",
  },
  { id: 8, icon: <RiBookletLine />, menu: "Homework", path: "/admin-dashboard/homeworks" },
  {
    id: 9,
    icon: <RiMoneyDollarCircleLine />,
    menu: "Fees / Payments",
    path: "/admin-dashboard/fees-payments",
  },
  {
    id: 10,
    icon: <IoNotificationsOutline />,
    menu: "Notice / Announcement",
    path: "/admin-dashboard/notice-announcements",
  },
  { id: 11, icon: <RiMedalLine />, menu: "Rankings", path: "/admin-dashboard/ranknings" },
  {
    id: 12,
    icon: <IoDocumentTextOutline />,
    menu: "Reports",
    path: "/admin-dashboard/reports",
  },
  { id: 13, icon: <IoSettingsOutline />, menu: "Settings", path: "/admin-dashboard/settings" },
  {
    id: 14,
    icon: <IoPersonCircleOutline />,
    menu: "Profile",
    path: "/admin-dashboard/profile",
  },
  { id: 15, icon: <IoLogOutOutline />, menu: "Logout", path: "/admin-dashboard/logout" },
];
