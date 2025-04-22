const sqlite = require('better-sqlite3');
const express = require('express');
const db = sqlite('users.db');
const port = 3000;
const app = express();

app.use(express.urlencoded());
app.use(express.static('public'));

app.post('/login', (req, res) => {
    const {username, password} =  req.body; 
    const user = db.prepare('SELECT * FROM users WHERE username=? AND password=?').get(username, password);
    if (user) {
        res.send('로그인 성공')
    } else {
        res.send('로그인 실패')
    }
    res.send('성공');
});

// const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
// insert.run(userInput, passInput);

db.close();

app.listen(port, () => {
    console.log(`서버 포트가 ${port}에서 실행중 입니다.`);
});