import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    addComments: {
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
  },
});

export const { addCommentStart, addCommentSuccess, addCommentFailed } =
  commentSlice.actions;
export default commentSlice.reducer;
