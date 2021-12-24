import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
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
  addCommentStart,
  addCommentSuccess,
  addCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  deleteCommentFailed,
} = commentSlice.actions;
export default commentSlice.reducer;
