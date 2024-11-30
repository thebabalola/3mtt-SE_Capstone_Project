// In-memory data store
let users = [];
let tasks = [];

// User schema
class User {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

// Task schema
class Task {
  constructor(id, userId, title, description, deadline, priority, status = 'active') {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
    this.status = status;
  }
}

// User CRUD operations
const userOperations = {
  create: (username, password) => {
    const id = Date.now().toString();
    const newUser = new User(id, username, password);
    users.push(newUser);
    return newUser;
  },
  findByUsername: (username) => {
    return users.find(user => user.username === username);
  },
  findById: (id) => {
    return users.find(user => user.id === id);
  }
};

// Task CRUD operations
const taskOperations = {
  create: (userId, title, description, deadline, priority) => {
    const id = Date.now().toString();
    const newTask = new Task(id, userId, title, description, deadline, priority);
    tasks.push(newTask);
    return newTask;
  },
  findByUserId: (userId) => {
    return tasks.filter(task => task.userId === userId);
  },
  update: (id, updates) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
      return tasks[taskIndex];
    }
    return null;
  },
  delete: (id) => {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
};

module.exports = {
  User,
  Task,
  userOperations,
  taskOperations
};