document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const noTasksMessage = document.getElementById("noTasks");
    const clearListButton = document.getElementById("clearList");

    // Проверка, есть ли задачи в Local Storage при загрузке страницы
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Функция для обновления списка задач на странице
    function updateTaskList() {
        taskList.innerHTML = "";
        if (storedTasks.length === 0) {
            noTasksMessage.style.display = "block";
            clearListButton.disabled = true;
        } else {
            noTasksMessage.style.display = "none";
            clearListButton.disabled = false;
        }
        storedTasks.forEach(function (task, index) {
            const taskItem = document.createElement("div");
            taskItem.innerHTML = `
                <input type="checkbox" id="task${index}" ${task.completed ? "checked" : ""}>
                <label for="task${index}" class="${task.completed ? "completed" : ""}">${task.text}</label>
            `;
            taskList.appendChild(taskItem);

            // Обработчик для чекбоксов
            const checkbox = taskItem.querySelector(`#task${index}`);
            checkbox.addEventListener("change", function () {
                storedTasks[index].completed = checkbox.checked;
                updateLocalStorage();
                if (checkbox.checked) {
                    taskItem.querySelector("label").classList.add("completed");
                } else {
                    taskItem.querySelector("label").classList.remove("completed");
                }
            });
        });
    }

    // Обработчик для кнопки "Добавить в список"
    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const newTask = {
                text: taskText,
                completed: false,
            };
            storedTasks.push(newTask);
            updateLocalStorage();
            taskInput.value = "";
            updateTaskList();
        }
    });

    // Обработчик для кнопки "Очистить список"
    clearListButton.addEventListener("click", function () {
        storedTasks.length = 0;
        updateLocalStorage();
        updateTaskList();
    });

    // Функция для обновления данных в Local Storage
    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // Обновляем список задач при загрузке страницы
    updateTaskList();
});