const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todos.db');

// Initialize database
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            completed INTEGER DEFAULT 0
        )
    `);
});

// Get all todos
exports.getAllTodos = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM todos', (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
};

// Create a new todo
exports.createTodo = (title) => {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO todos (title) VALUES (?)', [title], function (err) {
            if (err) reject(err);
            else resolve({ id: this.lastID, title, completed: 0 });
        });
    });
};

// Update a todo
exports.updateTodo = (id, completed) => {
    return new Promise((resolve, reject) => {
        db.run(
            'UPDATE todos SET completed = ? WHERE id = ?',
            [completed ? 1 : 0, id],
            function (err) {
                if (err) reject(err);
                else resolve({ id, completed });
            }
        );
    });
};

// Delete a todo
exports.deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
            if (err) reject(err);
            else resolve();
        });
    });
};