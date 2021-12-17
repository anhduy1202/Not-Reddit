import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import postReducer from "./postSlice";
import navigateReducer from "./navigateSlice";
import authReducer from "./authSlice";

export default configureStore({
    reducer:{
        auth: authReducer,
        user: userReducer,
        post:postReducer,
        nav: navigateReducer
    }
})