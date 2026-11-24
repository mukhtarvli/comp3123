import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";

// Create Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Subscribe to state changes
store.subscribe(() => {
  console.log("Authentication state changed:", {
    isAuthenticated: store.getState().auth.isAuthenticated,
  });
});

export default store;