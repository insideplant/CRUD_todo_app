import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  const [todo, setTodo] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([...todos, { id: todos.length + 1, text: todo.trim() }]);
    }
    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  function handleEditInputChange(e){
    setCurrentTodo({...currentTodo, text: e.target.value})
  }

  <div className="App">
  return (
    { isEditing ? : (
      <form>
        <h2>Edit Todo</h2>
      </form>
    )

    }
      <form onSubmit={handleFormSubmit}>
        <input
          name="todo"
          type="text"
          placeholder="Create a new todo"
          value={todo}
          onChange={handleInputChange}
        />
      </form>
      <ul classList="todo_list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleDeleteClick(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
