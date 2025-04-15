const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('get 메시지는 HELLO');
});
app.post('/', (req, res) => {
    res.send('post 메시지 잘 받았음.');
});
app.put('/', (req, res) => {
    res.send('put 요청 잘 받았음.');
});
app.delete('/', (req, res) => {
    res.send('delete 요청 잘 했음. 네가 시킨대로 잘 삭제하겠음.');
});

app.get('/user', (req, res) => {
    res.send('사용자 정보 조회');
});
app.post('/user', (req, res) => {
    res.send('사용자 생성');
});
app.put('/user', (req, res) => {
    res.send('사용자 정보 수정');
});
app.delete('/user', (req, res) => {
    res.send('사용자 삭제');
});


app.listen(port, () => {
    console.log(`서버 레디 on ${port}`);
    console.log(`httpS://localhost:${port}`);
})