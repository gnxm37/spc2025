const express = require('express');
const router = express.Router();
const todoControllers = require('../controllers/todoControllers');

// Routes
router.get('/', todoControllers.getAllTodos);
router.post('/', todoControllers.createTodo);
router.put('/:id', todoControllers.updateTodo);
router.delete('/:id', todoControllers.deleteTodo);

module.exports = router;