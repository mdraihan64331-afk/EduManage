import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import studentSlice from "./studentSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        student:studentSlice
    }
})