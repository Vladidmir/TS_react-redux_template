import { configureStore, combineReducers } from "@reduxjs/toolkit";

import todoReducer from "./slices/todo/todoSlice";
import todoAsyncReducer from "./slices/asyncTodo/todoAsyncSlice";

const rootReducer = combineReducers({ todoReducer, todoAsyncReducer });

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
