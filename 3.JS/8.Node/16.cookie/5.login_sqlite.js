const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3')

const app = express();
port = 3000;

app.use(session({
    secret: 'mylogin', // 세션 데이터를 암호화하기 위한 비밀키 (대칭키)
    resave: false,  // 세션 데이터가 변경되지 않아도 다시 저장할거냐?
    saveUninitialized: true // 초기화되지 않은 세션도 저장할거냐
}));

app.use(express.urlencoded());
app.use(morgan('dev'));

// DB 가져오기
const db = new sqlite3.Database('users.db');

// html 띄우기
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/user', (req, res) => {
    const user = req.session.user;
    if (user) {
        const {username, password} = user;
        res.send(`당신의 계정명은 ${username}이고 비밀번호는 ${password}입니다.`)
    }else{
        res.send('로그인하고 오시오...')
    }
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get ('SELECT * FROM users WHERE username=? AND password=?', [username, password], (err,row) => {
        if (row) {
            req.session.user = { username: row.username, password: row.password}
            res.json({ message: '로그인 성공'})
        } else{
            res.status(401).json({ message: '로그인 실패'})
        }
    })

})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('안녕히가세요...');
})

app.listen(port, () => {
    console.log('서버 레디')
})