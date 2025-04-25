import {combineReducers} from "@reduxjs/toolkit";
import {authSlice} from "./auth/authSlice.js";

export default combineReducers({
    auth: authSlice.reducer
});
