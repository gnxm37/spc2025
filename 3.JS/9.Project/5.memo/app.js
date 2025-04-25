const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/memo');
});

app.get('/memo', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'memo.html'));
});

// 수정된 delete 경로
app.delete('/image/:filename', (req, res) => {
    // :filename을 사용해 URL에서 파일명을 받아옵니다
    const filePath = path.join(__dirname, 'img', req.params.filename);
    console.log('삭제하려는 파일 경로:', filePath);

    // 파일이 존재하는지 확인
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('파일이 존재하지 않습니다:', filePath);
            return res.status(404).send('파일을 찾을 수 없습니다');
        }

        // 파일 삭제
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('파일 삭제 오류:', err);
                return res.status(500).send('파일 삭제 실패');
            }
            res.send('삭제 완료');
        });
    });
});

app.listen(port, () => {
    console.log(`${port}번 서버 포트가 레디!`);
});
