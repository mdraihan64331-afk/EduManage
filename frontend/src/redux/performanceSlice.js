import { createSlice } from "@reduxjs/toolkit";

const performanceSlice = createSlice({
  name: "performance",
  initialState: {
    performanceData: [],
  },

  reducers: {
    setPerformanceData: (state, action) => {
      state.performanceData = action.payload;
    },
  },
});

export const { setPerformanceData } = performanceSlice.actions;
export default performanceSlice.reducer;
