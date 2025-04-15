const express = require('express');
const express = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('메인');
})

app.listen(port, () => {
    console.log('서버 레디');
});
