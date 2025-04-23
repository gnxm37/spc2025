const { resolveSoa } = require('dns');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');

const app = express();
port = 3000;

app.use(session({
    secret: 'abcd1234', // 세션 데이터를 암호화하기 위한 비밀키 (대칭키)
    resave: false,  // 세션 데이터가 변경되지 않아도 다시 저장할거냐?
    saveUninitialized: true // 초기화되지 않은 세션도 저장할거냐
}));
app.use(express.urlencoded());
app.use(morgan('dev'));

// 로그인 DB 정보
const users = [
    {id:1, username:'user1', password: 'password1'},
    {id:2, username:'user2', password: 'password2'}
]

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/user', (req, res) =>{
    const user = req.session.user;
    if (user) {
        const {username, password} = req.session.user;
        res.send(`당신의 계정명은 ${username}이고 비밀번호는 ${password}입니다.`)
    }else{
        res.send('로그인하고 오시오...')
    }
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find((u) => u.username === username && u.password === password);
    if (user) {
        res.json({ message: '로그인 성공'})
        req.session.user = { username : user.username, password : user.password}
    } else{
        res.status(401).json({ message: '로그인 실패'})
    }

})

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.send('안녕히가세요...');
})

app.listen(port, () => {
    console.log('서버 레디')
})