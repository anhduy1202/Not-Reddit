import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
    otherUser: {
      otherUser: null,
      pending: false,
      error: false,
    },
    followUser: {
      currentUser: null,
      pending: false,
      error: false,
    },
  },
  reducers: {
    updateStart: (state) => {
      state.user.pending = true;
    },
    updateSuccess: (state, action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.currentUser = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
    getUserStart: (state) => {
      state.otherUser.pending = true;
    },
    getUserSuccess: (state, action) => {
      state.otherUser.pending = false;
      state.otherUser.otherUser = action.payload;
      state.otherUser.error = false;
    },
    getUserFailed: (state) => {
      state.otherUser.pending = false;
      state.otherUser.error = true;
    },
    followUserStart: (state) => {
      state.followUser.pending = false;
    },
    followUserSuccess: (state, action) => {
      state.followUser.currentUser = action.payload;
      state.followUser.pending = false;
    },
    followUserFailed: (state) => {
      state.followUser.pending = false;
      state.followUser.error = false;
    },
  },
});

export const {
  updateStart,
  updateSuccess,
  updateError,
  getUserStart,
  getUserSuccess,
  getUserFailed,
  followUserStart,
  followUserSuccess,
  followUserFailed
} = userSlice.actions;
export default userSlice.reducer;
