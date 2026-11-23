console.log("JavaScript is connected!");

// Select the task input field
const taskInput = document.getElementById("taskInput");

// Select the Add Task button
const addTaskBtn = document.getElementById("addTaskBtn");

// Select the Clear All Tasks button
const clearAllBtn = document.getElementById("clearAllBtn");

// Select the task counter
const taskCounter = document.getElementById("taskCounter");

// Select the completed task counter
const completedCounter = document.getElementById("completedCounter");

// Select the task list
const taskList = document.getElementById("taskList");

// Select the empty-state message
const emptyMessage = document.getElementById("emptyMessage");

// Create a variable to count tasks
let taskCount = 0;

// Test our selected elements
console.log(taskInput);
console.log(addTaskBtn);
console.log(taskCounter);
console.log(taskList);
console.log(taskCount);

// Function to show or hide the empty-state message
function updateEmptyMessage() {

    if (taskCount === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

}

// Function to update the completed task counter
function updateCompletedCounter() {

    // Count tasks marked as completed
    const completedTasks = taskList.querySelectorAll(".completed").length;

    // Display the number of completed tasks
    completedCounter.textContent = "Completed tasks: " + completedTasks;

}

// Create a greeting function
function greetUser() {
    console.log("Welcome to my To-Do List!");
}

// Call the function
greetUser();

// Listen for clicks on the Add Task button
addTaskBtn.addEventListener("click", addTask);

// Listen for the Enter key in the task input
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Create a function to add a task
function addTask() {

    // Get the text entered by the user and remove extra spaces
    const taskText = taskInput.value.trim();

    // Check whether the input is empty
    if (taskText === "") {

        alert("Please enter a task!");

        return;
    }

    // Create a new list item
const li = document.createElement("li");

// Create a checkbox for the task
const checkbox = document.createElement("input");

// Set the input type to checkbox
checkbox.type = "checkbox";

// Create a span to hold the task text
const span = document.createElement("span");

// Put the task text inside the span
span.textContent = taskText;

// Add the checkbox to the list item
li.appendChild(checkbox);

// Listen for changes to the checkbox
checkbox.addEventListener("change", function() {

    // Check whether the checkbox is selected
    if (checkbox.checked) {

        // Mark the task as completed
        span.classList.add("completed");

    } else {

        // Remove the completed status
        span.classList.remove("completed");

    }

    // Update the completed task counter
    updateCompletedCounter();

    // Save the updated task status
    saveTasks();

});

// Add the span to the list item
li.appendChild(span);

// Create a Delete button
const deleteBtn = document.createElement("button");

// Set the button text
deleteBtn.textContent = "Delete";

// Add the Delete button to the list item
li.appendChild(deleteBtn);

// Listen for clicks on the Delete button
deleteBtn.addEventListener("click", function() {

    // Remove the task from the list
    taskList.removeChild(li);

    // Decrease the task count by 1
    taskCount--;

    // Update the task counter
    taskCounter.textContent = "Total tasks: " + taskCount;
    
    // Update the completed task counter
    updateCompletedCounter();
    
    // Update the empty-state message
    updateEmptyMessage();

    // Save tasks in Local Storage
    saveTasks();
});

    

    // Add the list item to the task list
    taskList.appendChild(li);

    // Increase the task count by 1
    taskCount++;

    // Update the task counter on the webpage
    taskCounter.textContent = "Total tasks: " + taskCount;
    
    // Update the completed task counter
    updateCompletedCounter();
    
    // Update the empty-state message
    updateEmptyMessage();
    
    // Clear the input field
    taskInput.value = "";

}

// Listen for clicks on the Clear All Tasks button
clearAllBtn.addEventListener("click", function() {

    // Remove all tasks from the webpage
    taskList.innerHTML = "";

    // Reset the task count to zero
    taskCount = 0;

    // Update the task counter
    taskCounter.textContent = "Total tasks: " + taskCount;
    
    // Update the empty-state message
    updateEmptyMessage();

    // Update the completed task counter
    updateCompletedCounter();

    // Save the empty task list in Local Storage
    saveTasks();
});

updateEmptyMessage();

// Function to save tasks in Local Storage
function saveTasks() {

    // Create an empty array to store tasks
    const tasks = [];

    // Select all task list items
    const taskItems = taskList.querySelectorAll("li");

    // Go through each task
    taskItems.forEach(function(li) {

        // Get the task text
        const span = li.querySelector("span");

        // Save the task text and completion status
        tasks.push({
            text: span.textContent,
            completed: span.classList.contains("completed")
        });

    });

    // Convert the tasks array into JSON text
    const tasksJSON = JSON.stringify(tasks);

    // Save the JSON text in Local Storage
    localStorage.setItem("tasks", tasksJSON);

}

// Function to load saved tasks from Local Storage
function loadTasks() {

    // Retrieve saved tasks
    const savedTasks = localStorage.getItem("tasks");

    // Check whether saved tasks exist
    if (savedTasks) {

        // Convert the saved JSON text into a JavaScript array
        const tasks = JSON.parse(savedTasks);

        // Go through each saved task
        tasks.forEach(function(task) {

            // Put the saved task text into the input field
            taskInput.value = task.text;

            // Add the task to the webpage
            addTask();

            // Check whether the task was previously completed
            if (task.completed) {

                // Select the most recently added task
                const lastTask = taskList.lastElementChild;

                // Select the checkbox
                const checkbox = lastTask.querySelector("input");

                // Restore the checkbox's checked status
                checkbox.checked = true;

                // Select its text
                const span = lastTask.querySelector("span");

                // Mark the task as completed
                span.classList.add("completed");

            }

        });

        // Save the restored tasks with their correct completion status
        saveTasks();

    }

        // Update the empty-state message
        updateEmptyMessage();
       
        // Update the completed task counter
        updateCompletedCounter();
}

// Load saved tasks when the webpage opens
loadTasks();