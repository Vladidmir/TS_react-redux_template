import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllTodos,
  createTodo,
  removeTodo,
  toggleTodo,
} from "./todoAsyncAction";

import { Todo } from "types";

export type TodoSlice = {
  status: "idle" | "loading" | "finished" | "error";
  list: Todo[];
};
const initialState: TodoSlice = {
  status: "idle",
  list: [],
};

const todoAsyncSlice = createSlice({
  name: "@todosAsync",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "finished";
        state.list = action.payload;
      })
      .addCase(fetchAllTodos.rejected, (state) => {
        state.status = "error";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, { payload }) => {
        const todo = state.list.find((el) => el.id === payload.id);

        if (todo) {
          todo.completed = !todo.completed;
        }
      });
  },
});

const { actions, reducer } = todoAsyncSlice;

export default reducer;
