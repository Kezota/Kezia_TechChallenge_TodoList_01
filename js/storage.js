// COMMENT: The storage.js file is used to save and load todos from local storage
import { addTodo } from "./todo.js";

// COMMENT: Function to save todos to local storage
export function saveTodos(todosList) {
  const todos = [];

  // COMMENT: Loop through each todo item and save the text and completion status
  todosList.querySelectorAll(".todo").forEach((todoItem) => {
    const span = todoItem.querySelector("span");
    const checkbox = todoItem.querySelector('input[type="checkbox"]');

    todos.push({
      text: span.textContent,
      completed: checkbox.checked,
    });
  });

  // COMMENT: Save the todos to local storage
  localStorage.setItem("todos", JSON.stringify(todos));
}

// COMMENT: Function to load todos from local storage
export function loadTodos(todosList) {
  // COMMENT: Load todos from local
  const todos = JSON.parse(localStorage.getItem("todos")) || [];

  // COMMENT: Loop through each todo item and add it to the list
  todos
    .reverse()
    .forEach((todo) => addTodo(todo.text, todosList, todo.completed));
}
