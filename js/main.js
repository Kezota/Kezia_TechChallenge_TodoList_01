// COMMENT: The main.js file is the base file that contains the main logic of the application
import { addTodo } from "./todo.js";
import { loadTodos, saveTodos } from "./storage.js";

// COMMENT: Using the DOMContentLoaded event to ensure that the script runs after the HTML & CSS have fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.querySelector(".input-field input");
  const addButton = document.querySelector(".input-field button");
  const todosList = document.querySelector(".todos");
  const errorMessage = document.querySelector(".error-msg");

  // COMMENT: Load todos from local storage (if any) when the page loads
  loadTodos(todosList);

  // COMMENT: Event listeners for adding todos from input field
  addButton.addEventListener("click", () => {
    addTodoFromInput(inputField, todosList, errorMessage);
  });

  // COMMENT: Event listener for adding todos when Enter key is pressed (alternative to clicking the button)
  inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      addTodoFromInput(inputField, todosList, errorMessage);
    }
  });

  // COMMENT: Event listener for input field to show/hide error message
  inputField.addEventListener("input", () => {
    if (inputField.value.trim() === "") {
      errorMessage.textContent = "Please enter a task";
    } else {
      errorMessage.textContent = "";
    }
  });
});

// COMMENT: Function to add a todo item from the input field
function addTodoFromInput(inputField, todosList, errorMessage) {
  const taskText = inputField.value.trim();

  // COMMENT: Display an error message if the input field is empty
  if (!taskText) {
    errorMessage.textContent = "Please enter a task";
    return;
  }

  // COMMENT: Add the todo item to the list and save the todos to local storage
  addTodo(taskText, todosList);
  saveTodos(todosList);

  // COMMENT: Clear the error message and input field
  errorMessage.textContent = "";
  inputField.value = "";
}
