const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static('public')); // 우리의 홈에 있는 public 폴더를 정적 폴더로 정의함.
                                   // 외부에서는 public이 보이는게 아니고 public안에 담긴 내용이 보임

app.get('/', (req, res) => {
    const htmlFilePath = path.join(__dirname, 'public', '1.index.html');    //절대 경로(absolute path, full path)
    res.sendFile(htmlFilePath); 
});

app.listen(port, () => {
    console.log("서버 레디");
})