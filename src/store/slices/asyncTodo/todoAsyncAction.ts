import { TodoSlice } from "./todoAsyncSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "types";

export const fetchAllTodos = createAsyncThunk<
  Todo[],
  undefined,
  {
    state: { todoAsyncReducer: TodoSlice };
  }
>(
  "@todosAsync/fetchTodos",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos?_limit=10"
    );
    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().todoAsyncReducer;
      if (status === "loading") {
        return false;
      }
    },
  }
);

export const createTodo = createAsyncThunk<
  Todo,
  string,
  {
    state: { todoAsyncReducer: TodoSlice };
  }
>(
  "@todosAsync/createTodo",
  async (text) => {
    const newTodo: Required<Omit<Todo, "id">> = {
      userId: 1,
      title: text,
      completed: false,
    };

    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
    return await response.json();
  },
  {
    condition: (_, { getState }) => {
      const { status } = getState().todoAsyncReducer;
      if (status === "loading") {
        return false;
      }
    },
  }
);

export const removeTodo = createAsyncThunk<
  Todo["id"],
  Todo["id"],
  { rejectValue: string }
>("@todosAsync/removeTodo", async (id: string, { rejectWithValue }) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return rejectWithValue("Impessible to delete todo with id" + id);
  }

  return id;
});

export const toggleTodo = createAsyncThunk<
  Todo,
  Todo["id"],
  { state: { todoAsyncReducer: TodoSlice }; rejectValue: string }
>(
  "@todosAsync/toggleTodo",
  async (id: string, { rejectWithValue, getState }) => {
    const todo = getState().todoAsyncReducer.list.find((el) => el.id === id);
    if (todo) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (!response.ok) {
        return rejectWithValue("Impessible to update todo with id" + id);
      }

      return await response.json();
    }
    return rejectWithValue("No such todo with id " + id);
  }
);
