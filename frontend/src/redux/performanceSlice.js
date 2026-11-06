import { createSlice } from "@reduxjs/toolkit";

const performanceSlice = createSlice({
  name: "performance",
  initialState: {
    performanceData: {
      performances: [],
    },
  },

  reducers: {
    setPerformanceData: (state, action) => {
      state.performanceData = action.payload;
    },
  },
});

export const { setPerformanceData } = performanceSlice.actions;
export default performanceSlice.reducer;
