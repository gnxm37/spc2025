// 미션. 파일을 읽어서, 그 내용을 전달하는 서버 만들기.
// 1. index.html 파일을 읽어서 변수에 담아두고
// 2. req가 왔을 때 그 변수의 내용을 전달한다.

const http = require('http');
const fs = require('fs');
const text = fs.readFileSync('example.txt', 'UTF8', (err, data) => {
    if(err){
        console.error('읽기에 에러가 있음. 에러는:' + err);
    }else{
        text = data;
    }
});

const datatext = "\n나는 글을 추가하고 있어";

fs.writeFileSync('example.txt', datatext, {encoding:'UTF8', flag:'a'}, (err) => {
    if(err){
        console.error('쓰기에 에러가 있음. 에러는:' + err);
    }else{
        console.log(datatext);
    }
});

fs.readdir('../6.http', 'utf-8', (err, data) => {
    if(err){
        console.error('파일 목록에 에러가 있음' + err);
    }else{
        fs.writeFileSync('a.txt', String(data), {encoding:'UTF8', flag:'a'});
    }
});

fs.unlinkSync('b.txt');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(text);
});

server.listen(3000 ,() =>{
    console.log("서버가 3000번 포트를 잘 리슨하고 있습니다. 지금부터 사용자의 요청을 기다리겠습니다.");
    console.log("http://localhost:3000")
});