import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentData: [],
  },

  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
  },
});

export const { setPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
