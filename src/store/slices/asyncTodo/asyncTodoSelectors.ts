import { RootState } from "store";

export const selectAsyncTodo = (state: RootState) =>
  state.todoAsyncReducer.list;
