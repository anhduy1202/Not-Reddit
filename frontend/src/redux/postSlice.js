import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: {
      posts: [],
      comments: [],
      pending: false,
      error: false,
    },
    onePost: {
      post: [],
      pending: false,
      error: false,
    },
    userPost: {
      posts: null,
      pending: false,
      error: false,
    },
    deletePost: {
      pending: false,
      error: null,
    },
    createPost: {
      pending: false,
      error: null,
    },
    interactPost: {
      pending: false,
      error: null,
      success: null,
    },
  },
  reducers: {
    getAllPostStart: (state) => {
      state.allPosts.pending = true;
    },
    getAllPostSuccess: (state, action) => {
      state.allPosts.pending = false;
      state.allPosts.posts = [
        ...new Set([...state.allPosts.posts, ...action.payload]),
      ];
    },
    getOnePostStart: (state) => {
      state.onePost.pending = true;
    },
    getOnePostSuccess: (state, action) => {
      state.onePost.post = action.payload;
    },
    getOnePostFailed: (state) => {
      state.onePost.error = true;
    },
    unmountPost: (state, action) => {
      state.allPosts.posts = [];
    },
    getAllCommentsSuccess: (state, action) => {
      state.allPosts.comments = action.payload;
    },
    getAllPostFailed: (state) => {
      state.allPosts.pending = false;
      state.allPosts.error = true;
    },
    getUserPostStart: (state) => {
      state.userPost.pending = true;
    },
    getUserPostSuccess: (state, action) => {
      state.userPost.pending = false;
      state.userPost.posts = action.payload;
    },

    getUserPostFailed: (state) => {
      state.userPost.pending = false;
      state.userPost.error = true;
    },
    createPostStart: (state) => {
      state.createPost.pending = true;
      state.createPost.error = false;
    },
    createPostSuccess: (state) => {
      state.createPost.pending = false;
      state.createPost.error = false;
    },
    createPostFailed: (state) => {
      state.createPost.pending = false;
      state.createPost.error = true;
    },
    deletePostStart: (state) => {
      state.deletePost.pending = true;
    },
    deletePostSuccess: (state) => {
      state.deletePost.pending = false;
      state.deletePost.error = false;
    },
    deletePostFailed: (state) => {
      state.deletePost.error = true;
      state.deletePost.pending = false;
    },
    interactPostStart: (state) => {
      state.interactPost.pending = true;
      state.interactPost.success = false;
    },
    interactPostSuccess: (state) => {
      state.interactPost.pending = false;
      state.interactPost.error = false;
      state.interactPost.success = true;
    },
    interactPostFailed: (state) => {
      state.interactPost.error = true;
      state.interactPost.success = false;
      state.interactPost.pending = false;
    },
  },
});

export const {
  createPostStart,
  createPostSuccess,
  createPostFailed,
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
  getOnePostStart,
  getOnePostSuccess,
  getOnePostFailed,
  unmountPost,
  getAllCommentsSuccess,
  getUserPostStart,
  getUserPostSuccess,
  getUserPostFailed,
  deletePostStart,
  deletePostFailed,
  deletePostSuccess,
  interactPostStart,
  interactPostSuccess,
  interactPostFailed,
} = postSlice.actions;
export default postSlice.reducer;
