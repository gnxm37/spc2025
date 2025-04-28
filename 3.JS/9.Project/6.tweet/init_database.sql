CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- CREATE TABLE IF NOT EXISTS products (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     name TEXT NOT NULL,
--     price INTEGER NOT NULL
-- );

INSERT INTO users (name, email, password) VALUES ('user1', 'user1@example.com', 'password1');
INSERT INTO users (name, email, password) VALUES ('user2', 'user2@example.com', 'password2');

-- INSERT INTO products (name, price) VALUES ('Apple', 2000);
-- INSERT INTO products (name, price)VALUES ('Banana', 3000);
-- INSERT INTO products (name, price)VALUES ('Orange', 1500);

