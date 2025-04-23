const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3');
const bcrypt = require('bcrypt');

const app = express();
port = 3000;

app.use(session({
    secret: 'mylogin',
    resave: false,
    saveUninitialized: true
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
        const { username, password } = user;
        res.send(`당신의 계정명은 ${username}이고 비밀번호는 ${password}입니다.`)
    } else {
        res.send('로그인하고 오시오...')
    }
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // 나의 계정을 가져와서 bcyrpt

    db.get(`SELECT * FROM users WHERE username=?`, [username], async (err, row) => {
        if (row) {
            const isMatch = await bcrypt.compare(password, row.password);
            if (isMatch) {
                req.session.user = { username: row.username, password: row.password }
                res.json({ message: '로그인 성공' })
            } else {
                res.status(401).json({ message: '로그인 실패' })
            }
        } else {
            res.json({ message: '로그인 실패' })
        }
    })
})

// 로그아웃 세션 클리어
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('안녕히가세요...');
})

app.listen(port, () => {
    console.log('서버 레디')
})