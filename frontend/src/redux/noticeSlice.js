import { createSlice } from "@reduxjs/toolkit";

const noticeSlice = createSlice({
  name: "notice",
  initialState: {
    noticeData: [],
  },

  reducers: {
    setNoticeData: (state, action) => {
      state.noticeData = action.payload;
    },
  },
});

export const { setNoticeData } = noticeSlice.actions;
export default noticeSlice.reducer;
