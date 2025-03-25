// COMMENT: The todo.js file contains the logic for adding, deleting, and completing todos
import { saveTodos } from "./storage.js";

// COMMENT: Function to add a todo item to the list
export function addTodo(taskText, todosList, completed = false) {
  const todoItem = document.createElement("li");

  // COMMENT: Add the "todo" class to the todo item and set the inner HTML
  todoItem.classList.add("todo");
  todoItem.innerHTML = `
    <div class="content">
    
      <input type="checkbox" ${completed ? "checked" : ""}>
      <span class="${completed ? "completed" : ""}">${taskText}</span>
    </div>
    <button>
      <img src="assets/cross.svg" alt="Delete">
    </button>
  `;

  // COMMENT: Add event listeners to the todo item for deleting and toggling the todo item
  todoEventListeners(todoItem, todosList);

  // COMMENT: Add the todo item to the top of the list
  todosList.insertBefore(todoItem, todosList.firstChild);
}

// COMMENT: Function to add event listeners to the todo item for deleting and toggling the todo item
function todoEventListeners(todoItem, todosList) {
  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  const deleteButton = todoItem.querySelector("button");

  // COMMENT: Event listener for deleting a todo item
  deleteButton.addEventListener("click", () => {
    deleteTodo(todoItem, todosList);
    saveTodos(todosList);
  });

  // COMMENT: Event listener for toggling a todo item
  checkbox.addEventListener("change", () => {
    toggleTodo(todoItem, todosList);
    saveTodos(todosList);
  });
}

// COMMENT: Function to delete a todo item from the list
function deleteTodo(todoItem, todosList) {
  todosList.removeChild(todoItem);
}

// COMMENT: Function to toggle a todo item as completed or uncompleted
function toggleTodo(todoItem) {
  const checkbox = todoItem.querySelector('input[type="checkbox"]');
  const span = todoItem.querySelector("span");

  // COMMENT: If the checkbox is checked, add the "completed" class to the span and move the todo item to the bottom of the list
  // COMMENT: Else if the checkbox is unchecked, remove the "completed" class from the span and move the todo item to the top of the list
  if (checkbox.checked) {
    span.classList.add("completed");
    todosList.appendChild(todoItem);
  } else {
    span.classList.remove("completed");
    todosList.insertBefore(
      todoItem,
      todosList.querySelector(".todo:not(.completed)")
    );
  }
}
