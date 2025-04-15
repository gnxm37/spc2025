const express = require('express');
const app = express();
const port = 3000;

let users = [];

app.use(express.json());
app.use(express.urlencoded());

// 메인화면
app.get('/', (req, res) => {
    res.send("여긴 메인 화면");
})

// 사용자 조회
app.get('/users', (req, res) => {
    res.send("사용자 조회");
    console.log(users);
});

// 사용자 생성
app.post('/users', (req, res) => {
    res.send('사용자 생성');
    users.push(req.body.id);
    console.log(users);
});

// 사용자 수정
app.put('/users/:id', (req, res) => {
    const userid = req.params.id;
    users[userid] = req.body.id;
});-

// 사용자 삭제
app.delete('/users/:id', (req, res) => {
    res.send(`사용자 삭제`);
    users.pop(req.params.id);
});

app.listen(port, () => {
    console.log(`서버 포트가 ${port}에서 실행중입니다.`);
});
