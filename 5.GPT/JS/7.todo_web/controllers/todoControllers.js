const database = require('../models/database');

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await database.getAllTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

// Create a new todo
exports.createTodo = async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newTodo = await database.createTodo(title);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

// Update a todo
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
        const updatedTodo = await database.updateTodo(id, completed);
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        await database.deleteTodo(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};