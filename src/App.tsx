import React, { useCallback, useReducer, useRef } from "react";

import "./App.css";

interface Todo {
  id: number;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [...state, { id: state.length, text: action.text }];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }

  const [todos, dispatch] = useReducer(reducer, []);

  const newTodoRef = useRef<HTMLInputElement>(null);
  const addTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div>
      <input type="text" ref={newTodoRef} />
      <button onClick={addTodo}>Add</button>
      {todos.map((todo, i) => (
        <div key={i}>
          {todo.text}{" "}
          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
