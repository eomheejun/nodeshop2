const express = require('express');
const router = express.Router();
const orderModel = require("../models/orders");

router.get('/', (req, res) => {

    orderModel
        .find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

});

router.get('/orderId',(req, res) => {  
    const id = req.params.orderId;

    orderModel
        .findById(id)
        .exec()
        .then(docs => {
            if(!doc){
                res.status(200).json({
                    msg: "no orderid"
                });
            }else{
                res.status(200).json(docs);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
    });

router.post('/', (req, res) => {
    
    const order = new orderModel({
        name: req.body.name,
        price: req.body.price
    });

    order
        .save()
        .then(docs =>{
            res.status(200).json({
                msg: "success",
                createdOrder: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

router.patch('/', (req, res) => {
    res.json({
        msg: "successful orders patch"
    });
});

router.delete('/:orderId', (req, res) => {
    const id = req.params.orderId;

    orderModel
        .remove()
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "success remove",
                result: result

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

module.exports = router;