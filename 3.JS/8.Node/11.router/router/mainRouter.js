const express = require('express');
const router = express.Router();

morgan.get('/', (req, res) => {
    res.send("메인");
})

module.exports = router;