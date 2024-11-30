// Mock data for tasks (stored in localStorage)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// DOM Elements
const addTaskForm = document.getElementById('addTaskForm');
const tasksList = document.getElementById('tasks');
const filterPriority = document.getElementById('filterPriority');
const sortBy = document.getElementById('sortBy');
const searchTask = document.getElementById('searchTask');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');

// Event Listeners
addTaskForm.addEventListener('submit', addTask);
filterPriority.addEventListener('change', filterAndSortTasks);
sortBy.addEventListener('change', filterAndSortTasks);
searchTask.addEventListener('input', filterAndSortTasks);
loginBtn.addEventListener('click', () => window.location.href = 'login.html');
registerBtn.addEventListener('click', () => window.location.href = 'register.html');
logoutBtn.addEventListener('click', logout);

// Functions
function isLoggedIn() {
    return currentUser !== null;
}

function addTask(e) {
    e.preventDefault();
    if (!isLoggedIn()) {
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
        priority,
        userId: currentUser.id
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addTaskForm.reset();
    renderTasks();
}

function renderTasks() {
    if (!isLoggedIn()) {
        tasksList.innerHTML = '<p>Please login to view tasks</p>';
        return;
    }

    const userTasks = tasks.filter(task => task.userId === currentUser.id);
    tasksList.innerHTML = '';
    userTasks.forEach(task => {
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
    const task = tasks.find(t => t.id === id);
    if (task) {
        // For simplicity, we'll just use prompt, but in a real app, you'd use a form
        const newTitle = prompt('Edit task title:', task.title);
        if (newTitle) {
            task.title = newTitle;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function filterAndSortTasks() {
    let filteredTasks = tasks.filter(task => task.userId === currentUser.id);

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

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    renderTasks();
    updateUI();
}

function updateUI() {
    if (isLoggedIn()) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        addTaskForm.style.display = 'block';
        userInfo.textContent = `Welcome, ${currentUser.username}!`;
    } else {
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        addTaskForm.style.display = 'none';
        userInfo.textContent = '';
    }
}

// Initial render
updateUI();
renderTasks();