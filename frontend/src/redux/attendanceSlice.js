import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",

  initialState: {
    attendanceData: [],
  },

  reducers: {
    setAttendanceData: (state, action) => {
      state.attendanceData = action.payload;
    },

    clearAttendanceData: (state) => {
      state.attendanceData = [];
    },
  },
});

export const {
  setAttendanceData,
  clearAttendanceData,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;