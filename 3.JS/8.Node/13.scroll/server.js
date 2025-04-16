const express = require('express');
const morgan = require('morgan');

const app = express();
const port = 3000;

const data = Array.from({ length: 339 }, (_, i) => `Item ${i + 1}`);

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/get-items', (req, res) => {
    const { start, end } = req.query;
    const userItems = data.slice(start,end);
    res.json(userItems);
});

app.listen(port, () => {
    console.log('서버 레디');
});