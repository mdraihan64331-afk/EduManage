import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import adminSlice from "./adminSlice";
import studentSlice from "./studentSlice";
import teacherSlice from "./teacherSlice";
import attendanceSlice from "./attendanceSlice";
import resultSlice from "./resultSlice";
import feesPaymentSlice from "./feesPaymentSlice";
import noticeSlice from "./noticeSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    admin: adminSlice,
    student: studentSlice,
    teacher: teacherSlice,
    attendance: attendanceSlice,
    result: resultSlice,
    feesPayment: feesPaymentSlice,
    notice: noticeSlice,
  },
});
