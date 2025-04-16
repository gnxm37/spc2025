const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = 3000;


// 템플릿 엔진 설정.. ejs라는걸 사용할 예정 (express가 기본 지원)
app.set('view engine', 'ejs');
app.use(morgan('dev'));

app.get('/', (req,res) => {
    // res.sendFile(path.join(__dirname, 'index.html'))
    res.render('index', {title:'나의 타이틀', message:'EJS 학습중입니다.'})
})

app.listen(port, () => {
    console.log('서버 레디');
})
