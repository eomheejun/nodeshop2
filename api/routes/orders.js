const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg : "succesful get order"
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: "successful orders post"
    });
});

router.patch('/', (req, res) => {
    res.json({
        msg: "successful orders patch"
    });
});

router.delete('/', (req, res) => {
    res.json({
        msg: "successful orders delete"
    });
});
module.exports = router;