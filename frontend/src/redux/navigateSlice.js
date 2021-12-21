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
      status:false,
      open:false,
      id:0
    }
  },
  reducers: {
    sideBarToggle: (state, action) => {
      state.sidebar.open = action.payload;
    },
    makePostToggle: (state, action) => {
      state.makepost.open = action.payload;
    },
    setDelete: (state,action)=>{
      state.deleteState = action.payload;
    }
  },
});

export const { sideBarToggle, makePostToggle, setDelete } = navigateSlice.actions;
export default navigateSlice.reducer;
