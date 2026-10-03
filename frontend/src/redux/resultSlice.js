import { createSlice } from "@reduxjs/toolkit";

const resultSlice = createSlice({
  name: "result",
  initialState: {
    resultData: [],
  },

  reducers: {
    setResultData: (state, action) => {
      state.resultData = action.payload;
    },
  },
});

export const { setResultData } = resultSlice.actions;
export default resultSlice.reducer;
