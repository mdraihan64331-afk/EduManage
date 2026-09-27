import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    studentData: [],
  },
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
    setUpdateStudent: (state, action) => {
      const index = state.studentData.findIndex(
        (student) => student._id === action.payload._id,
      );

      if (index !== -1) {
        state.studentData[index] = action.payload;
      }
    },
  },
});

export const { setStudentData, setUpdateStudent } = studentSlice.actions;
export default studentSlice.reducer;
