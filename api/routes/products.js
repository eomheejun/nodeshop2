const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg : "successful product get"
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: "successful product post"
    });
});

router.patch('/', (req, res) => {
    res.json({
        msg: "successful product patch"
    });
});

router.delete('/', (req, res) => {
    res.json({
        msg: "successful product delete"
    });
});
module.exports = router;//라우터를 모듈로 내보냄(product 안에 있는기능들을 server.js로 보냄)