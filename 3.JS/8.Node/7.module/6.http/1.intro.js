const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log("요청이 왔음");
    res.writeHead(200, { 'Content-Type':'text/plain'});
    res.end('Hello');
});
server.on('connection', () => {
    console.log("연결이 되었음");
});

server.on('close', () => {
    console.log("연결이 종료되었음");
});

server.listen(3000);