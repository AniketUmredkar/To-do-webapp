const taskListEl = document.querySelector(".task-list");
const deleteAllBtnEl = document.querySelector(".btn-delete-all");

function addTask(e) {
  e.preventDefault();
  const newTask = document.getElementById("task-name-input");
  if (newTask.value == "") {
    alert("Please enter a task!");
    return;
  }
  taskListEl.style.display = "block";
  deleteAllBtnEl.classList.add("btn-delete-all-show");

  /*Creating new elements*/

  const newListItemEl = document.createElement("li");
  const taskNameEl = document.createElement("span");
  const btnContainerEl = document.createElement("div");
  const completeBtnEl = document.createElement("button");
  const deleteBtnEl = document.createElement("button");

  /*Classes and attributes*/

  newListItemEl.classList.add("task");
  btnContainerEl.classList.add("btn-container");
  completeBtnEl.classList.add("btn");
  taskNameEl.classList.add("task-name");
  completeBtnEl.textContent = "Completed";
  deleteBtnEl.classList.add("btn");
  taskNameEl.textContent = newTask.value;
  deleteBtnEl.textContent = "Delete";

  /*Event listeners*/

  newListItemEl.addEventListener("mouseover", (e) => {
    if (e.target.tagName === "LI") {
      e.target.lastChild.classList.add("btn-show");
    }
  });

  newListItemEl.addEventListener("mouseleave", (e) => {
    e.target.lastChild.classList.remove("btn-show");
  });

  completeBtnEl.addEventListener("click", (e) => {
    const completeTaskEl = e.target.parentNode.parentNode;
    taskListEl.removeChild(completeTaskEl);
    if (completeTaskEl.firstChild.classList.contains("completed-task")) {
      completeTaskEl.firstChild.classList.remove("completed-task");
      completeTaskEl.classList.remove("fade");
      completeBtnEl.textContent = "Completed";
      taskListEl.prepend(completeTaskEl);
    } else {
      completeTaskEl.firstChild.classList.add("completed-task");
      completeTaskEl.classList.add("fade");
      completeBtnEl.textContent = "Not Completed";
      taskListEl.appendChild(completeTaskEl);
    }
  });

  deleteBtnEl.addEventListener("click", (e) => {
    const deleteTaskEl = e.target.parentNode.parentNode;
    taskListEl.removeChild(deleteTaskEl);
    if (!taskListEl.hasChildNodes()) {
      taskListEl.style.display = "none";
      deleteAllBtnEl.classList.remove("btn-delete-all-show");
    }
  });

  /*Appending elements*/

  newListItemEl.appendChild(taskNameEl);
  btnContainerEl.appendChild(completeBtnEl);
  btnContainerEl.appendChild(deleteBtnEl);
  newListItemEl.appendChild(btnContainerEl);
  taskListEl.prepend(newListItemEl);
  newTask.value = null;
}

function deleteAll(e) {
  const taskEls = document.querySelectorAll("li");
  taskEls.forEach((value) => {
    if (value.firstChild.classList.contains("completed-task")) {
      taskListEl.removeChild(value);
    }
  });
}
