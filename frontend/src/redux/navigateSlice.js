import { createSlice } from "@reduxjs/toolkit";

export const navigateSlice = createSlice({
  name: "nav",
  initialState: {
    sidebar: {
        open: false,
    },
  },
  reducers: {
    sideBarToggle: (state,action) => {
      state.sidebar.open = action.payload;
    },
   
  },
});

export const {
    sideBarToggle
} = navigateSlice.actions;
export default navigateSlice.reducer;
