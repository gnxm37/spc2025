const sqlite = require('sqlite3');
const express = require('express');

const app = express();
const db = new sqlite.Database('users.db');
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded());

app.post('/login', (req, res) => {
    const {username, password} =  req.body; 
    db.run('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err, row) => {
        if(row) res.send('로그인 성공');
        else res.send('로그인 실패');
    });
});

db.close();

app.listen(port, () => {
    console.log(`서버 포트가 ${port}에서 실행중 입니다.`);
});