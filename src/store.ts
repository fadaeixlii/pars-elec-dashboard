import { combineReducers } from "redux";

import { configureStore } from "@reduxjs/toolkit";
import eventsListReducer from "./store/events/Reducers/eventsList.reducer";

// Setup redux-first-history

export const store = configureStore({
  devTools: process.env.NODE_ENV === "development",

  reducer: combineReducers({
    eventsList: eventsListReducer,
  }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// setupListeners(store.dispatch)
