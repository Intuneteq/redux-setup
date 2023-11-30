import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  PersistConfig,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import counterReducer from "../pages/counter/counterSlice";

// Persist configuration
const perisistConfig: PersistConfig<RootState> = {
  key: "root",
  version: 1,
  storage,

  /**
   * https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
   *
   * It is also strongly recommended to blacklist any api(s) that you have configured with RTK Query. If the api slice reducer is not blacklisted, the api cache will be automatically persisted and restored which could leave you with phantom subscriptions from components that do not exist any more.
   */
  // blacklist: [pokemonApi.reducerPath],
};

const rootReducer = combineReducers({
  // Key should match name of slice
  counter: counterReducer,
});

// Persist the reducers
const persistedReducer = persistReducer(perisistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
