const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg : "succesful get order"
    });
});

module.exports = router;