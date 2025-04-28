const express = require('express');
const morgan = require('morgan');
const path = require('path');

const port = 3000;
const app = express();

app.use(express.json());
app.use(morgan('dev'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '2.example.html'));
})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log('입력값 :', email, password);

    sleep(2000);
    res.json({ message: "로그인 성공" });
});


app.listen(port, () => {
    console.log(`${port} 서버 레디`)
})