import { configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../../pages/login/shared/api/auth";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

setupListeners(store.dispatch);

export type IRootState = ReturnType<typeof store.getState>;
