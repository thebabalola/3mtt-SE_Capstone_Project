const { User, Task, userOperations, taskOperations } = require('./schema');

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, Task, userOperations, taskOperations } = require('./schema');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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
        const user = userOperations.create(req.body.username, hashedPassword);
        res.status(201).send('User registered successfully');
    } catch {
        res.status(500).send('Error registering user');
    }
});

// User login
app.post('/login', async (req, res) => {
    const user = userOperations.findByUsername(req.body.username);
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
    res.json(taskOperations.findByUserId(req.user.id));
});

app.post('/tasks', authenticateToken, (req, res) => {
    const task = taskOperations.create(req.user.id, req.body.title, req.body.description, req.body.deadline, req.body.priority);
    res.status(201).json(task);
});

app.put('/tasks/:id', authenticateToken, (req, res) => {
    const updatedTask = taskOperations.update(req.params.id, req.body);
    if (updatedTask) {
        res.json(updatedTask);
    } else {
        res.status(404).send('Task not found');
    }
});

app.delete('/tasks/:id', authenticateToken, (req, res) => {
    const deleted = taskOperations.delete(req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});