const express = require('express');
const morgan = require('morgan');


const mainRouter = require('./router/mainRouter')
const userRouter = require('./router/userRouter')
const productRouter = require('./router/productRouter')

const app = express();
const port = 3000;

// 로깅을 해주는 외부 라이브러리 - morgan
// 로그의 다양한 포맷들... 개발 할 때 편한 로그: 'dev'
//                        운영 할 때 웹서버같은 로그: 'combined'
//                        커스텀하게 설정도 가능
app.use(morgan('dev'));

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);

app.listen(port, () => {
    console.log('서버 레디');
})