window.onload = function () {
  loadtask();
};

function addtask() {
  let task = document.getElementById("taskinput").value;

  if (task !== "") {
    const t = {
      text: task,
      completed: false
    };

    savetask(t);
    createtask(t);
    document.getElementById("taskinput").value = "";
  } else {
    alert("Please enter an item!");
  }
}

function createtask(task) {

  let tasklist = document.getElementById("tasklist");

  let li = document.createElement("li");
  li.innerText = task.text;

  if (task.completed)
    li.classList.add("completed");

  let del = document.createElement("button");
  del.innerText = "X";
  del.classList.add("delete-btn");
  li.appendChild(del);

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    task.completed = li.classList.contains("completed");
    updatetasks();
  });

  del.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    deletetask(task.text);
  });

  tasklist.appendChild(li);
}

function savetask(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadtask() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    createtask(task);
  });
}

function updatetasks() {
  let lis = document.querySelectorAll("#tasklist li");
  let tasks = [];

  lis.forEach(li => {
    let text = li.childNodes[0].textContent;
    let completed = li.classList.contains("completed");

    tasks.push({ text, completed });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deletetask(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
