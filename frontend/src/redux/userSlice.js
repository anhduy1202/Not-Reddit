import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
  },
  reducers: {
    updateStart: (state) => {
      state.pending = true;
    },
    updateSuccess: (state, action) => {
      state.pending = false;
      state.error = false;
      state.user.currentUser = action.payload;
    },
    updateError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const { updateStart, updateSuccess, updateError } = userSlice.actions;
export default userSlice.reducer;

/*
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Daniel",
    age: "20",
    about: "I'm a software engineer",
    avaUrl: "https://preview.redd.it/rrz3hmsxcll71.png?width=640&crop=smart&auto=webp&s=87cc5ed38d8f088ef9fffef7a4c5756b64309d6a",
  },
  reducers: {
    update: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.about = action.payload.about;
      state.avaUrl = action.payload.avaUrl;
    },
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
*/
