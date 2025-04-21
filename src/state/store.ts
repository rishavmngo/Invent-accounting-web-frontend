import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authslice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
