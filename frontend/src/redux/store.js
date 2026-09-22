import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice"
import studentSlice from "./studentSlice"
import teacherSlice from "./teacherSlice"

export const store = configureStore({
    reducer:{
        user:userSlice,
        student:studentSlice,
        teacher:teacherSlice
    }
})