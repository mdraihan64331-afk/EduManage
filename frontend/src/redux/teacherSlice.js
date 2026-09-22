import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    teacherData: [],
  },
  reducers: {
    setTeacherData: (state, action) => {
      state.teacherData = action.payload;
    },
  },
});

export const { setTeacherData } = teacherSlice.actions;
export default teacherSlice.reducer;
