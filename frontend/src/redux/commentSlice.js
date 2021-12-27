import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    userComments:{
      comments: null,
      pending:false,
      error:false,
      success:false
    },
    addComments: {
      pending: false,
      error: false,
      success: false,
    },
    deleteComments: {
      pending: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    getUserCommentStart: (state) =>{
      state.userComments.pending = true;
      state.userComments.success = false;
      state.userComments.error = false;
    },
    getUserCommentSuccess: (state,action) => {
      state.userComments.pending = false;
      state.userComments.success = true;
      state.userComments.error = false;
      state.userComments.comments = action.payload;
    },
    getUserCommentFailed: (state) => {
      state.userComments.pending = false;
      state.userComments.error = true;
      state.userComments.success = false;
    },
    addCommentStart: (state) => {
      state.addComments.pending = true;
      state.addComments.success = false;
      state.addComments.error = false;
    },
    addCommentSuccess: (state) => {
      state.addComments.pending = false;
      state.addComments.success = true;
    },
    addCommentFailed: (state) => {
      state.addComments.pending = false;
      state.addComments.error = true;
    },
    deleteCommentStart: (state) => {
      state.deleteComments.pending = true;
      state.deleteComments.success = false;
      state.deleteComments.error = false;
    },
    deleteCommentSuccess: (state) => {
      state.deleteComments.pending = false;
      state.deleteComments.success = true;
    },
    deleteCommentFailed: (state) => {
      state.deleteComments.pending = false;
      state.deleteComments.error = true;
    },
  },
});

export const {
  getUserCommentStart,
  getUserCommentSuccess,
  getUserCommentFailed,
  addCommentStart,
  addCommentSuccess,
  addCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
} = commentSlice.actions;
export default commentSlice.reducer;
