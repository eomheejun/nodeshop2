const express = require('express');
const router = express.Router();
const productModel = require("../models/products");

router.get('/', (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

router.post('/', (req, res) => {

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });

    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                msg: "successful product post get",
                createdProduct: result
            });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
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