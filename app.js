// Mock data for tasks (replace with actual API calls later)
let tasks = [];
let currentUser = null;

// DOM Elements
const addTaskForm = document.getElementById('addTaskForm');
const tasksList = document.getElementById('tasks');
const filterPriority = document.getElementById('filterPriority');
const sortBy = document.getElementById('sortBy');
const searchTask = document.getElementById('searchTask');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Event Listeners
addTaskForm.addEventListener('submit', addTask);
filterPriority.addEventListener('change', filterAndSortTasks);
sortBy.addEventListener('change', filterAndSortTasks);
searchTask.addEventListener('input', filterAndSortTasks);
loginBtn.addEventListener('click', () => window.location.href = 'login.html');
registerBtn.addEventListener('click', () => window.location.href = 'register.html');
logoutBtn.addEventListener('click', logout);

// Functions
function addTask(e) {
    e.preventDefault();
    if (!currentUser) {
        alert('Please login to add tasks');
        return;
    }
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const deadline = document.getElementById('taskDeadline').value;
    const priority = document.getElementById('taskPriority').value;

    const task = {
        id: Date.now(),
        title,
        description,
        deadline,
        priority
    };

    tasks.push(task);
    addTaskForm.reset();
    renderTasks();
}

function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priority: ${task.priority}</p>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

function editTask(id) {
    // Implement edit functionality
    console.log('Edit task', id);
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function filterAndSortTasks() {
    let filteredTasks = [...tasks];

    // Filter by priority
    const priorityFilter = filterPriority.value;
    if (priorityFilter) {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }

    // Sort tasks
    const sortValue = sortBy.value;
    if (sortValue === 'deadline') {
        filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortValue === 'priority') {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        filteredTasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    }

    // Search tasks
    const searchValue = searchTask.value.toLowerCase();
    if (searchValue) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(searchValue) || 
            task.description.toLowerCase().includes(searchValue)
        );
    }

    // Render filtered and sorted tasks
    tasksList.innerHTML = '';
    filteredTasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Deadline: ${task.deadline}</p>
            <p>Priority: ${task.priority}</p>
            <div class="task-actions">
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        tasksList.appendChild(taskElement);
    });
}

// Initial render
renderTasks();