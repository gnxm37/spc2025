const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/memo');
})
app.get('/memo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memo.html'));
})

app.listen(port, () => {
    console.log(`${port}번 서버 포트가 레디!`);
})