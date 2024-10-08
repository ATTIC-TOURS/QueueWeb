import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../../pages/login/shared/api/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import branchReducer from "./branch";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { persist_config } from "../../configs/persistor";


const reducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  branch: branchReducer,
});

const persistedReducer = persistReducer(persist_config, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authAPI.middleware),
});

setupListeners(store.dispatch);

export const persist_store = persistStore(store);

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
