const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mock database (replace with actual database integration)
const users = [];
const tasks = [];

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// User registration
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { id: Date.now(), username: req.body.username, password: hashedPassword };
        users.push(user);
        res.status(201).send('User registered successfully');
    } catch {
        res.status(500).send('Error registering user');
    }
});

// User login
app.post('/login', async (req, res) => {
    const user = users.find(user => user.username === req.body.username);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, process.env.JWT_SECRET);
            res.json({ accessToken: accessToken });
        } else {
            res.send('Not Allowed');
        }
    } catch {
        res.status(500).send('Error logging in');
    }
});

// CRUD operations for tasks
app.get('/tasks', authenticateToken, (req, res) => {
    res.json(tasks.filter(task => task.userId === req.user.id));
});

app.post('/tasks', authenticateToken, (req, res) => {
    const task = { id: Date.now(), ...req.body, userId: req.user.id };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', authenticateToken, (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id) && task.userId === req.user.id);
    if (taskIndex > -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', authenticateToken, (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(req.params.id) && task.userId === req.user.id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});