import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "types";

type TodoSlice = {
  status: "idle" | "loading" | "finished" | "error";
  list: Todo[];
};
const initialState: Todo[] = [];
// const initialState: TodoSlice = {
//   status: "idle",
//   list: [],
// };

const todoSlice = createSlice({
  name: "@todos",
  initialState,
  reducers: {
    addTodo: (state, { payload }: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: new Date().toString(),
        title: payload,
        completed: false,
      };
      return [newTodo, ...state];
    },
    toggleTodo: (state, { payload }: PayloadAction<Todo["id"]>) => {
      const todo = state.find((el) => el.id === payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo: (state, { payload }: PayloadAction<Todo["id"]>) => {
      return state.filter((todo) => todo.id !== payload);
    },
  },
  extraReducers(builder) {},
});

const { actions, reducer } = todoSlice;

export default reducer;
export const { addTodo, removeTodo, toggleTodo } = actions;
