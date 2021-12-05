import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import themeReducer from "./themeSlice";
import postReducer from "./postSlice";

export default configureStore({
    reducer:{
        user: userReducer,
        theme:themeReducer,
        post:postReducer
    }
})