import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import studentSlice from "./studentSlice";
import teacherSlice from "./teacherSlice";
import attendanceSlice from "./attendanceSlice";
import resultSlice from "./resultSlice";
import noticeSlice from "./noticeSlice";
import performanceSlice from "./performanceSlice";
import paymentSlice from "./paymentSlice";
import classRoomAndFeesSlice from "./classRoomAndFeesSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    student: studentSlice,
    teacher: teacherSlice,
    attendance: attendanceSlice,
    result: resultSlice,
    notice: noticeSlice,
    performance: performanceSlice,
    payment: paymentSlice,
    classFees: classRoomAndFeesSlice,
  },
});
