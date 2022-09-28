import { useRef } from "react";
import { useAppDispatch } from "hooks/reduxHook";
import { addTodo } from "store/slices/todo/todoSlice";

const TodoInput = () => {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (inputRef.current) {
      dispatch(addTodo(inputRef.current.value));
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

export default TodoInput;
