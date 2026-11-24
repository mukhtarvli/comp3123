import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Create Slice and Reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// Export Actions
export const { login, logout } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;