import { createSlice } from "@reduxjs/toolkit";

const feesPaymentSlice = createSlice({
  name: "feesPayment",

  initialState: {
    feesPaymentData: [],
    paymentData: [],
  },

  reducers: {
    setFeesPaymentData: (state, action) => {
      state.feesPaymentData = action.payload;
    },
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
  },
});

export const { setFeesPaymentData, setPaymentData } = feesPaymentSlice.actions;
export default feesPaymentSlice.reducer;
