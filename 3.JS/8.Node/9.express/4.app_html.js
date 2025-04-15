const express = require('express');
const fs = require('fs');
const http = require('http');

const app = express();
const port = 3000;

const text = fs.readFileSync('1.index.html', 'utf-8');
console.log('text');
app.get('/', (req, res) => {
    res.send(text);
});

app.listen(3000, () => {
    console.log("서버 레디");
})