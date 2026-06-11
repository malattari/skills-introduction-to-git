const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

const todos = [];

function formatDuration(start, end) {
  const totalSeconds = Math.max(0, Math.floor((end - start) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.closedAt ? " closed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = Boolean(todo.closedAt);
    checkbox.setAttribute("aria-label", `Mark ${todo.text} as closed`);
    checkbox.addEventListener("change", () => {
      todo.closedAt = checkbox.checked ? new Date() : null;
      renderTodos();
    });

    const textWrapper = document.createElement("div");
    const text = document.createElement("div");
    text.className = "todo-text";
    text.textContent = todo.text;

    const createdMeta = document.createElement("div");
    createdMeta.className = "todo-meta";
    createdMeta.textContent = `Created: ${todo.createdAt.toLocaleString()}`;

    const durationMeta = document.createElement("div");
    durationMeta.className = "todo-meta";
    durationMeta.textContent = todo.closedAt
      ? `Time to close: ${formatDuration(todo.createdAt, todo.closedAt)}`
      : "Time to close: Not closed yet";

    textWrapper.append(text, createdMeta, durationMeta);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      const index = todos.indexOf(todo);
      if (index >= 0) {
        todos.splice(index, 1);
        renderTodos();
      }
    });

    item.append(checkbox, textWrapper, deleteButton);
    todoList.appendChild(item);
  });
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({
    text,
    createdAt: new Date(),
    closedAt: null,
  });

  todoInput.value = "";
  todoInput.focus();
  renderTodos();
});
