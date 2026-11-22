import { createSlice } from "@reduxjs/toolkit";

const classRoomAndFeesSlice = createSlice({
  name: "classFees",
  initialState: {
    classFeesData: [],
  },

  reducers: {
    setClassFees: (state, action) => {
      state.classFeesData = action.payload;
    },
  },
});

export const { setClassFees } = classRoomAndFeesSlice.actions;
export default classRoomAndFeesSlice.reducer;
