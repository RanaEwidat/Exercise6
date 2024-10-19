let tasks = [];
let nextId = 1;
// Load tasks from local storage
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        nextId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1; // Update nextId based on loaded tasks
    }
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(description) {
    if (description) {
        tasks.push({ id: nextId++, description, completed: false });
        saveTasks(); // Save tasks after adding
        console.log(`Task added: [${nextId - 1}] ${description}`);
    } else {
        console.log("Enter a task description.");
    }
}

function viewTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available.");
    } else {
        tasks.forEach(task => {
            const status = task.completed ? 'completed' : 'not completed';
            console.log(` ${task.id} . ${task.description}  [${status}]`);
        });
    }
}

function toggleTaskCompletion(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks(); // Save tasks after edit toggle
        console.log(`Task [${id}] completion status changed to ${task.completed ? 'completed' : 'not completed'}.`);
    } else {
        console.log(`Task [${id}] not found.`);
    }
}

function editTask(id, newDescription) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.description = newDescription;
        saveTasks(); // Save tasks after editing 
        console.log(`Task [${id}] updated to: ${newDescription}`);
    } else {
        console.log(`Task [${id}] not found.`);
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(); // Save tasks after deleting
    console.log(`Task [${id}] deleted.`);
}

function showMenu() {
    console.log("\nTask Manager Menu: ");
    console.log("1. Add Task");
    console.log("2. View Tasks");
    console.log("3. Toggle Task Completion");
    console.log("4. Edit Task");
    console.log("5. Delete Task");
    console.log("6. Exit");

    const choice = prompt("Enter your choice (1-6):");

    switch (choice) {
        case '1':
            const description = prompt("Enter task description:");
            addTask(description);
            break;
        case '2':
            viewTasks();
            break;
        case '3':
            const toggleId = parseInt(prompt("Enter the task ID to toggle completion:"));
            toggleTaskCompletion(toggleId);
            break;
        case '4':
            const editId = parseInt(prompt("Enter the task ID to edit:"));
            const newDescription = prompt("Enter new task description:");
            editTask(editId, newDescription);
            break;
        case '5':
            const deleteId = parseInt(prompt("Enter the task ID to delete:"));
            deleteTask(deleteId);
            break; 
        case '6':
            console.log("Exiting Task Manager.");
            return; 
        default:
            console.log("Invalid option, Please try again.");
            break; 
    }

    // Show the menu again after completing an action
    showMenu(); 
}

// Load tasks from local storage at the start
loadTasks();
showMenu();
