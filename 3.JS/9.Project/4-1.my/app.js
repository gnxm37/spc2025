const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite = require('sqlite3');
const session = require('express-session');

const port = 3000;
const app = express();
const db = new sqlite.Database('shopping.db', (err) => {
    if(!err) console.log('DB연결 성공')
})

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'mycart',
    resave: false,
    saveUninitialized: false
}));

// 각종 라우트
app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));
app.get('/product', (req, res) => res.sendFile(path.join(__dirname, 'public', 'product.html')));


app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? AND password = ? ';
    db.get(query, [username,password], (err, row) => {
        if(err) console.log('오류');
        if(row) {
            req.session.user = { id: row.id, username: row.username };
            res.json({ username: row.username });
        } else {
            res.status(401).json ({ message: '로그인 실패' });
        }
    })
})

app.get('/api/check-login', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json({ message: 'Welcome back', username: user.username });
    } else {
        res.status(401).json({ message: 'Not logged in'});
    }
})

app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.all(query, [], (err, rows) => {
        res.json(rows);
    })
})

app.post('/api/cart/:productId', (req, res) => {
    const productId = req.params.productId;
    const cart = req.session.cart || [];

    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [productId], (err, product) => {
        if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

        const existingItem = cart.find((item) => item.id == productId)

        if(existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 })
        }

        req.session.cart = cart;
        res.json({ message: '상품 추가 완료'});
    })
})

app.get('/api/cart', (req, res) => {
    const cart = req.session.cart || []; // 장바구니에 물건 담은적이 없이 카트를 올수도 있음.
    console.log('내카트: ', cart);
    res.json({ cart });
});


app.listen(port, () => {
    console.log(`${port}서버가 레디 :)`);
}).on('error', (err) => {
    console.error('서버 실행 중 오류 발생:', err.message);
});