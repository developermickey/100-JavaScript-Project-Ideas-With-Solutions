document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");

  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  function renderTodos() {
    list.innerHTML = "";

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;

      if (todo.completed) {
        li.classList.add("completed");
      }

      // Toggle completion when clicking the <li>
      li.addEventListener("click", (e) => {
        // Prevent toggling when clicking Delete button
        if (e.target.tagName === "BUTTON") return;
        todos[index].completed = !todos[index].completed;
        saveAndRender();
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.style.float = "right";

      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent triggering li's click
        todos.splice(index, 1);
        saveAndRender();
      });

      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTodo = input.value.trim();
    if (newTodo !== "") {
      todos.push({
        text: newTodo,
        completed: false,
      });
      input.value = "";
      saveAndRender();
    }
  });

  renderTodos();
});
