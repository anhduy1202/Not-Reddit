import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import navigateReducer from "./navigateSlice";
import authReducer from "./authSlice";
import commentReducer from "./commentSlice";

const combinedReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  comment: commentReducer,
  nav: navigateReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logoutSuccess") {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default configureStore({
  reducer: rootReducer,
});
