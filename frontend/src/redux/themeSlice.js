import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: "#ff9051",
  },
  reducers: {
    updateTheme: (state, action) => {
     state.theme = action.payload.theme;
    },
  },
});

export const { updateTheme } = themeSlice.actions;
export default themeSlice.reducer;
