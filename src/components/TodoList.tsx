import { useAppSelector, useAppDispatch } from "hooks/reduxHook";
import { useEffect } from "react";
import { selectAllTodos } from "store/slices/todo/todoSelectors";
import { fetchAllTodos } from "store/slices/asyncTodo/todoAsyncAction";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectAllTodos);

  return (
    <ul>
      {list.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoList;
