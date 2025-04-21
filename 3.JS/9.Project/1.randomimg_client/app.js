const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
// 라우트 만드는 과정
// 사용자는 나의 앱에 루트 디렉토리(/)에 GET으로 요청 할 수 있다.

// 서버 시작
app.listen(port, () =>{
    console.log(`서버가 준비됨. ${port} 포트에서...`);
})