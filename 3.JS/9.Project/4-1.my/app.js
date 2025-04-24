const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite = require('sqlite3');
const session = require('express-session');

const port = 3000;
const app = express();
const db = new sqlite.Database('shopping.db', (err) => {
    if (!err) console.log('DB 연결 성공');
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use(session({
    secret: 'mycart',
    resave: false,
    saveUninitialized: false
}));

// 기본 페이지 라우트
app.get('/', (req, res) => res.redirect('/home'));
app.get('/home', (req, res) => res.sendFile(path.join(__dirname, 'public', 'home.html')));
app.get('/cart', (req, res) => res.sendFile(path.join(__dirname, 'public', 'cart.html')));
app.get('/product', (req, res) => res.sendFile(path.join(__dirname, 'public', 'product.html')));

// 로그인
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
        if (err) return res.status(500).json({ message: 'DB 오류', error: err });
        if (row) {
            req.session.user = { id: row.id, username: row.username };
            res.json({ username: row.username });
        } else {
            res.status(401).json({ message: '로그인 실패' });
        }
    });
});

// 로그인 상태 확인
app.get('/api/check-login', (req, res) => {
    const user = req.session.user;
    if (user) {
        res.json({ message: 'Welcome back', username: user.username });
    } else {
        res.status(401).json({ message: 'Not logged in' });
    }
});

// 상품 전체 목록 조회 (여기에만 ORDER BY 사용)
app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY id';
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'DB 오류', error: err });
        res.json(rows);
    });
});

// 장바구니 - 상품 추가
app.post('/api/cart/plus/:productId', (req, res) => {
    const productId = req.params.productId;
    const cart = req.session.cart || [];

    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [productId], (err, product) => {
        if (err) return res.status(500).json({ message: 'DB 오류', error: err });
        if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        req.session.cart = cart;
        res.json({ message: '상품 추가 완료' });
    });
});

// 장바구니 - 수량 감소
app.post('/api/cart/minus/:productId', (req, res) => {
    const productId = req.params.productId;
    const cart = req.session.cart || [];

    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [productId], (err, product) => {
        if (err) return res.status(500).json({ message: 'DB 오류', error: err });
        if (!product) return res.status(404).json({ message: '상품을 찾을 수 없습니다.' });

        const existingItem = cart.find(item => item.id == productId);
        if (existingItem) {
            if (existingItem.quantity === 1) {
                const index = cart.findIndex(item => item.id == productId);
                if (index !== -1) cart.splice(index, 1);
            } else {
                existingItem.quantity -= 1;
            }
        }

        req.session.cart = cart;
        res.json({ message: '상품 빼기 완료' });
    });
});

// 장바구니 - 상품 완전 삭제
app.post('/api/cart/delete/:productId', (req, res) => {
    const productId = req.params.productId;
    const cart = req.session.cart || [];

    const index = cart.findIndex(item => item.id == productId);
    if (index !== -1) {
        cart.splice(index, 1);
    }

    req.session.cart = cart;
    res.json({ message: '상품 삭제 완료' });
});

// 장바구니 조회
app.get('/api/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.json({ cart });
});

// 로그아웃
app.get('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: '세션 종료 실패' });
        }
        res.status(200).json({ message: '로그아웃 성공' });
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`${port} 서버가 레디 :)`);
}).on('error', err => {
    console.error('서버 실행 중 오류 발생:', err.message);
});
