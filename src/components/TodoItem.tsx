import React from "react";
import { useAppDispatch } from "hooks/reduxHook";
import { Todo } from "../types";

// import { removeTodo, toggleTodo } from "store/slices/todo/todoSlice";
import { toggleTodo, removeTodo } from "store/slices/asyncTodo/todoAsyncAction";

interface TodoItemProps extends Todo {
  style?: React.CSSProperties;
}

const TodoItem = ({ title, completed, style = {}, id }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemoveTodo = (id: Todo["id"]) => {
    dispatch(removeTodo(id));
  };

  const handleToggleTodo = (id: Todo["id"]) => {
    dispatch(toggleTodo(id));
  };
  return (
    <li style={style}>
      <input
        onChange={() => handleToggleTodo(id)}
        type="checkbox"
        checked={completed}
      />
      <span>{title}</span>
      <span onClick={() => handleRemoveTodo(id)}>&times;</span>
    </li>
  );
};

export default TodoItem;
