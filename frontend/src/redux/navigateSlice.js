import { createSlice } from "@reduxjs/toolkit";

export const navigateSlice = createSlice({
  name: "nav",
  initialState: {
    sidebar: {
      open: false,
    },
    makepost: {
      open: false,
    },
    deleteState: {
      status: false,
      open: false,
      id: 0,
    },
    fullPost: {
      open: false,
      postId: null,
    },
  },
  reducers: {
    sideBarToggle: (state, action) => {
      state.sidebar.open = action.payload;
    },
    makePostToggle: (state, action) => {
      state.makepost.open = action.payload;
    },
    setDelete: (state, action) => {
      state.deleteState = action.payload;
    },
    fullPostToggle: (state, action) => {
      state.fullPost = action.payload;
    },
  },
});

export const { sideBarToggle, makePostToggle, setDelete, fullPostToggle } =navigateSlice.actions;
export default navigateSlice.reducer;
