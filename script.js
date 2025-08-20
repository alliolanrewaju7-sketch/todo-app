document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value.trim();

  if (task === "") {
    alert("Please enter a task");
    return;
  }

  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = `
    <span onclick="toggleComplete(this)">${task}</span>
    <button onclick="deleteTask(this)">❌</button>
  `;

  taskList.appendChild(li);
  saveTasks();

  taskInput.value = "";
}

function toggleComplete(element) {
  element.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  button.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  tasks.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span onclick="toggleComplete(this)">${task.text}</span>
      <button onclick="deleteTask(this)">❌</button>
    `;
    taskList.appendChild(li);
  });
}