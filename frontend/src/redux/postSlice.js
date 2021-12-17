import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    allPosts: {
      posts: null,
      pending: false,
      error: false,
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
  },
});

export const {
  createPost,
  getAllPostStart,
  getAllPostSuccess,
  getAllPostFailed,
} = postSlice.actions;
export default postSlice.reducer;
