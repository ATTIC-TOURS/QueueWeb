import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authAPI } from "../../pages/login/shared/api/auth";
import { setupListeners } from "@reduxjs/toolkit/query";
import branchReducer from "./branch";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persist_config } from "../../configs/persistor";
import { queueAPI } from "../../pages/dashboard/shared/api/queue";
import modalReducer from "./modal";
import ticketReducer from "./ticket";
import tableFilterReducer from "./table-filter";
import calledTicketsReducer from "./called-ticket";
import doneTicketsReducer from "./done-tickets";
import calledByTicketReducer from "./called-by-ticket";
import { tvAPI } from "../../pages/tv/shared/api/tv";

const reducer = combineReducers({
  [authAPI.reducerPath]: authAPI.reducer,
  branch: branchReducer,
  [queueAPI.reducerPath]: queueAPI.reducer,
  modal: modalReducer,
  ticket: ticketReducer,
  [tvAPI.reducerPath]: tvAPI.reducer,
  table_filter: tableFilterReducer,
  called_tickets: calledTicketsReducer,
  done_tickets: doneTicketsReducer,
  called_by_tickets: calledByTicketReducer,
});

const persistedReducer = persistReducer(persist_config, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(authAPI.middleware)
      .concat(queueAPI.middleware)
      .concat(tvAPI.middleware),
});

setupListeners(store.dispatch);

export const persist_store = persistStore(store);

export type IRootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
