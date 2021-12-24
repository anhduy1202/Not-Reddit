import {
  updateStart,
  updateSuccess,
  updateError,
  getUserStart,
  getUserSuccess,
  getUserFailed,
  followUserStart,
  followUserSuccess,
  followUserFailed,
} from "./userSlice";
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
  createPostFailed,
  createPostStart,
  createPostSuccess,
  deletePostFailed,
  deletePostStart,
  deletePostSuccess,
  getAllCommentsSuccess,
  getAllPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  getUserPostFailed,
  getUserPostStart,
  getUserPostSuccess,
  interactPostFailed,
  interactPostStart,
  interactPostSuccess,
} from "./postSlice";
import {
  addCommentFailed,
  addCommentStart,
  addCommentSuccess,
  deleteCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
} from "./commentSlice";

//AUTH
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

export const updateUser = async (dispatch, user, id, token) => {
  dispatch(updateStart());
  try {
    const res = await axios.put(`/v1/users/${id}`, user, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(updateSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(updateError());
  }
};

export const getUser = async (dispatch, id, token) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get(`/v1/users/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const followUser = async (dispatch, id, userId, token, setFollow, isFollowed) => {
  dispatch(followUserStart());
  try {
    const res = await axios.put(`/v1/users/${id}/follow`, userId, {
      headers: { token: `Bearer ${token}` },
    });
    setFollow(isFollowed ? false : true);
    dispatch(followUserSuccess(res.data));
  } catch (err) {
    dispatch(followUserFailed());
  }
};

//POST
export const getAllPosts = async (dispatch, token, hot) => {
  dispatch(getAllPostStart());
  try {
    const res = await axios.get(hot ? `/v1/post?${hot}=true` : `/v1/post`, {
      headers: { token: `Bearer ${token}` },
    });
    const comments = await axios.get(`/v1/post/comments`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getAllPostSuccess(res.data));
    dispatch(getAllCommentsSuccess(comments.data));
  } catch (err) {
    dispatch(getAllPostFailed());
  }
};

export const getUserPost = async (dispatch, token, userId) => {
  dispatch(getUserPostStart());
  try {
    const res = await axios.get(`/v1/post/user/${userId}`, {
      headers: { token: `Bearer ${token}` },
    });
    const comments = await axios.get(`/v1/post/comments`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getAllCommentsSuccess(comments.data));
    dispatch(getUserPostSuccess(res.data));
  } catch (err) {
    dispatch(getUserPostFailed());
  }
};

export const createPost = async (dispatch, token, post) => {
  dispatch(createPostStart());
  try {
    await axios.post("/v1/post", post, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(createPostSuccess());
  } catch (err) {
    dispatch(createPostFailed());
  }
};

export const deletePost = async (
  dispatch,
  token,
  id,
  userId,
  setDelete,
  setDeletedPostId,
  deletedPostId
) => {
  dispatch(deletePostStart());
  try {
    await axios.delete(`/v1/post/${id}`, {
      headers: { token: `Bearer ${token}` },
      data: { userId: userId },
    });
    dispatch(deletePostSuccess());
    setDeletedPostId([...deletedPostId, id]);
    setDelete({
      open: false,
      status: true,
    });
  } catch (err) {
    dispatch(deletePostFailed());
  }
};

export const upvotePost = async (dispatch, token, id, userId) => {
  dispatch(interactPostStart());
  try {
    await axios.put(`/v1/post/${id}/upvote`, userId, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(interactPostSuccess());
  } catch (err) {
    dispatch(interactPostFailed());
  }
};

export const downvotePost = async (dispatch, token, id, userId) => {
  dispatch(interactPostStart());
  try {
    await axios.put(`/v1/post/${id}/downvote`, userId, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(interactPostSuccess());
  } catch (err) {
    dispatch(interactPostFailed());
  }
};

//COMMENT
export const addComment = async (dispatch, token, id, comment) => {
  dispatch(addCommentStart());
  try {
    await axios.post(`/v1/post/comment/${id}`, comment, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(addCommentSuccess());
  } catch (err) {
    dispatch(addCommentFailed());
  }
};

export const deleteUserComment = async (
  dispatch,
  token,
  id,
  setDeletedCommentId,
  comment
) => {
  dispatch(deleteCommentStart());
  try {
    await axios.delete(`/v1/post/comment/${id}`, {
      headers: { token: `Bearer ${token}` },
    });
    setDeletedCommentId([...comment, id]);
    dispatch(deleteCommentSuccess());
  } catch (err) {
    dispatch(deleteCommentFailed());
  }
};
