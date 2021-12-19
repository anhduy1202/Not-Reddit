import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: {
      posts: null,
      pending: false,
      error: false,
    },
    deletePost: {
      pending: false,
      error: null,
    },
    posts: [
      {
        title: "",
        tag: 0,
        description: "",
      },
    ],
  },
  reducers: {
    createPost: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
    getAllPostStart: (state) => {
      state.allPosts.pending = true;
    },
    getAllPostSuccess: (state, action) => {
      state.allPosts.pending = false;
      state.allPosts.posts = action.payload;
    },
    getAllPostFailed: (state) => {
      state.allPosts.pending = false;
      state.allPosts.error = true;
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
  },
});

export const {
  createPost,
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
  deletePostStart,
  deletePostFailed,
  deletePostSuccess,
} = postSlice.actions;
export default postSlice.reducer;
