import { createSlice } from "@reduxjs/toolkit";

const feesPaymentSlice = createSlice({
  name: "feesPayment",

  initialState: {
    feesPaymentData: [],
  },

  reducers: {
    setFeesPaymentData: (state, action) => {
      state.feesPaymentData = action.payload;
    },
  },
});

export const { setFeesPaymentData } = feesPaymentSlice.actions;
export default feesPaymentSlice.reducer;
