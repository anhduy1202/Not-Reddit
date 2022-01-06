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
    message: {
      open: false,
      room: null,
      partnerName:null,
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
    messageToggle: (state, action) => {
      state.message.open = action.payload;
    },
    setRoom: (state,action) => {
      state.message.room = action.payload;
    },
    setPartnerName: (state,action)=>{
      state.message.partnerName = action.payload;
    }
  },
});

export const {
  sideBarToggle,
  makePostToggle,
  setDelete,
  fullPostToggle,
  messageToggle,
  setRoom,
  setPartnerName
} = navigateSlice.actions;
export default navigateSlice.reducer;
