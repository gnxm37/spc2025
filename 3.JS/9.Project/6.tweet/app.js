// 라이브러리 로딩
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const sqlite = require('sqlite3');
const path = require('path');

// 변수 선언
const app = express();
const port = 3000;
const db = new sqlite.Database('login.db', (err) => {
    if (!err) console.log('DB연결 성공');
});

// 각종 미들웨어 등록
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'login123',
    resave: false,
    saveUninitialized: false
}));

// 각종 라우트
app.get('/', (req, res) => {
    res.redirect('/home')
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/loginSubmit', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email=? AND password=?';   
    console.log(email, password);
    db.get(query, [email, password], (err, row) => {
        if(err) console.log('오류');
        if(row) {
            req.session.user = { id:row.id, name: row.name, email: row.email, password: row.password };
            res.json({ message:'로그인 성공', name: row.name, email: row.email, password: row.password, redirectUrl: '/home'});
        }else{
            console.log(row);
            res.status(401).json({ message: '로그인 실패'});
        }
    });
})

app.get('/logout', (req, res) => {
    const user = req.session.user;

    if (user) {
        req.session.destroy((err) => {
            if (err) {
                console.error('세션 삭제 중 오류 발생:', err);
                return res.status(500).send('서버 오류');
            }

            res.redirect('/home');
        });
    } else {
        res.status(401).json({ message: '로그인되지 않은 상태입니다.' });
    }
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/registerSubmit', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(query, [name, email, password], (err) => {
        if (err) {
            console.error('오류', err.message);
            return res.status(500).json({ message: '회원가입 실패' });
        }
        res.json({ message: '회원가입 성공', redirectUrl: '/login'});
    });
})

app.get('/tweet', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tweet.html'));
});

app.get('/tweet/checkLogin', (req, res) => {
    const user = req.session.user;

    if(user) {
        res.status(200).json({ message: '로그인 완료', name: user.name, email: user.email, loggedOut: false });
    } else {
        res.status(401).json({ message: '로그인 미완료', loggedOut: true });
    }
})

app.listen(port, () => {
    console.log(`${port} 서버 레디`);
});