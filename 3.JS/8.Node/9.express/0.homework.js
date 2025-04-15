const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

let count = 1;
let users = {};

app.use(express.json());
app.use(morgan('dev'));
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homework.html'));
});

app.use(express.static('public'));

app.get('/users', (req, res) => {
    res.send(users);
})

app.post('/users', (req, res) => {
    const { username, usernickname, age } = req.body;
    users[count] = { username, usernickname, age };
    res.send(username + "이 추가되었다.");
    count++;  // ID 증가
});

app.put('/users/:id', (req, res) => {
    const { username, usernickname, age } = req.body;
    const user = users[req.params.id];

    user.username = username;
    user.usernickname = usernickname;
    user.age = age;

    res.send(username + "의 정보가 수정");
}
)
app.delete('/users/:name', (req, res) => {
    delete users[req.params.name];
    res.send('여기는 딜리트');
})

app.listen(port, () => {
    console.log("서버 실행중");
})