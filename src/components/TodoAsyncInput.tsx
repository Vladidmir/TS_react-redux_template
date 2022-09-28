import { useRef } from "react";
import { useAppDispatch } from "hooks/reduxHook";
import { createTodo } from "store/slices/asyncTodo/todoAsyncAction";

const TodoAsyncInput = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (inputRef.current) {
      dispatch(createTodo(inputRef.current.value));
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <input type="text" placeholder="Add Todo" ref={inputRef} />
      <button onClick={onClick}>Add todo</button>
    </>
  );
};

export default TodoAsyncInput;
