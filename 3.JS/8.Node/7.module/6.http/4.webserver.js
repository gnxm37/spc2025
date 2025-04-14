const fs = require('fs');
const http = require('http');

const text = fs.readFileSync('1.index.html', 'UTF8');

const server = http.createServer((req, res) => {
    console.log(res);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(text);
});

server.listen(3000 ,() =>{
    console.log("http://localhost:3000")
});