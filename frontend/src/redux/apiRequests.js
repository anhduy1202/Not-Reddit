import { updateStart, updateSuccess, updateError } from "./userSlice";
import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import {
  deletePostFailed,
  deletePostStart,
  deletePostSuccess,
  getAllPostFailed,
  getAllPostStart,
  getAllPostSuccess,
} from "./postSlice";

export const updateUser = async (user, dispatch) => {
  dispatch(updateStart());
  try {
    console.log(user);
    const res = await axios.post("/v1/update", user);
    dispatch(updateSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(updateError());
  }
};

export const loginUser = async (user, dispatch, navigate, state) => {
  dispatch(loginStart());
  dispatch(updateStart());
  try {
    const res = await axios.post("/v1/auth/login", user);
    dispatch(loginSuccess(res.data));
    dispatch(updateSuccess(res.data));
    navigate(state?.path || "/");
  } catch {
    dispatch(loginFailed());
    dispatch(updateError());
  }
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("/v1/auth/register", user);
    dispatch(registerSuccess());
    navigate("/login");
  } catch (err) {
    console.log(err);
    dispatch(registerFailed("Something is wrong"));
  }
};

export const logOutUser = async (dispatch, token, userId, navigate) => {
  dispatch(logoutStart());
  try {
    await axios.post("/v1/auth/logout", userId, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
  }
};

export const getAllPosts = async (dispatch, token, hot) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(hot ? `/v1/post?${hot}=true` : `/v1/post`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getAllPostSuccess(res.data));
  } catch (err) {
    dispatch(getAllPostFailed());
  }
};

export const deletePost = async (dispatch, token, id, userId, setDelete) => {
  dispatch(deletePostStart());
  try {
    await axios.delete(`/v1/post/${id}`, {
      headers: { token: `Bearer ${token}` },
      data: { userId: userId },
    });
    dispatch(deletePostSuccess());
    setDelete({
      open: false,
      status: true,
    });
  } catch (err) {
    dispatch(deletePostFailed());
  }
};
