const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();