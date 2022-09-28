import TodoList from "./components/TodoList";
import TodoInput from "components/TodoInput";
import TodoAsyncInput from "components/TodoAsyncInput";
import TodoAsyncList from "components/TodoAsyncList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TodoInput />
      <TodoList />
      <hr /> <hr />
      <TodoAsyncInput />
      <TodoAsyncList />
    </div>
  );
}

export default App;
