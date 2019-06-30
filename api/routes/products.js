const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg : "successful product get"
    });
});

module.exports = router;//라우터를 모듈로 내보냄(product 안에 있는기능들을 server.js로 보냄)