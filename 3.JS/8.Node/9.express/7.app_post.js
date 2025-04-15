const express = require('express');
const app = express();
const port = 3000;

const users = {};
app.use(express.json()); // JSON 데이터 파싱을 위한 미들웨어, 이 함수가 사용자의 요청에서 온 JSON을 req.body라는 변수에 담아줌.

// 메인화면
app.get('/', (req, res) => {
    res.send("여긴 메인 화면면");
})

// get user 해서 사용자 조회
app.get('/user', (req, res) => {
    res.send(users);
});

// 사용자 생성
app.post('/user', (req, res) => {
    console.log('사용자 생성 요청 : ' + req.body);
    const id = Date.now();
    users[id] = req.body.name;
    res.send('성공');
});

app.listen(port, () => {
    console.log(`서버 포트가 ${port}에서 실행중 입니다.`);
});