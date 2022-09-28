import { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "hooks/reduxHook";
import { selectAsyncTodo } from "store/slices/asyncTodo/asyncTodoSelectors";
import { fetchAllTodos } from "store/slices/asyncTodo/todoAsyncAction";
import TodoItem from "./TodoItem";

const TodoAsyncList = () => {
  const dispatch = useAppDispatch();
  const list = useAppSelector(selectAsyncTodo);

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);
  return (
    <ul>
      {list.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodoAsyncList;
