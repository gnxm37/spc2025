CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tweet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL, -- user 테이블
    likes_count INTEGER DEFAULT 0, -- 제3정규화에 의해 like 테이블을 항상 참조하지 않도록 여기에 합산 포함
    FOREIGN KEY(user_id) REFERENCES user(id)
);

CREATE TABLE IF NOT EXISTS like (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    tweet_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(tweet_id) REFERENCES tweet(id)
);

INSERT INTO user (username, email, password) VALUES 
('user1', 'user1@example.com', 'password1'),
('user2', 'user2@example.com', 'password2'),
('user3', 'user3@example.com', 'password3');

INSERT INTO tweet (content, user_id, likes_count) VALUES
('안녕하세요, 첫번째 글입니다.', 1, 0),
('안녕하세요, 두번째 글입니다.', 2, 0);

