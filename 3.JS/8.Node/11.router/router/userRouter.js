const express = require('express');
s

router.get('/user/profile', (req, res) => {
    res.send('사용자 > 프로필');
})
router.get('/user/settings', (req, res) => {
    res.send('사용자 > 셋팅');
})

module.exports = router;