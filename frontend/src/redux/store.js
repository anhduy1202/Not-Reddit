import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import postReducer from "./postSlice";
import authReducer from "./authSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        post:postReducer
    }
})