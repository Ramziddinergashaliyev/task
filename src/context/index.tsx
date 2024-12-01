import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./slices/authSlice";

// Redux do'konini yaratish
export const store = configureStore({
  reducer: {
    auth: authSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Redux holati (state) tipi
export type RootState = ReturnType<typeof store.getState>;

// Dispatch funksiyasi tipi
export type AppDispatch = typeof store.dispatch;
