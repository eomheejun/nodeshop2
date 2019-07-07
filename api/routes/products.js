const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const productModel = require("../models/products");

router.get('/', (req, res) => {

    productModel
        .find()
        .exec()
        .then(docs => {
            //res.status(200).json(docs);
            const response = {
                count: docs.length,//화면상에 보여주는 지표 데이터 갯수가 몇개인지
                products: docs.map(doc => {
                    return{
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/"+doc._id
                        }
                    };    
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
});

router.get('/:productId', (req,res) => {
    const id = req.params.productId;
    productModel
        .findById(id)
        .exec()
        .then(doc => {
            if(!doc){
                res.status(400).json({
                    msg: "no productid"
                });
                    
            }else{
                res.status(200).json({
                    product: doc,
                    request: {
                        type: "GET",
                        url: 'http://localhost:3000/products'
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
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
                createdProduct: {
                    name:result.name,
                    price:result.price,
                    _id: result._id,
                    request: {
                        type:"GET",
                        url:"http://localhost:3000/products/" + result._id
                    }
                }
            });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });



});

router.patch('/:productId', (req, res) => {

    const id=req.params.productId;
    const updateOps = {};//수정할 내용을 저장해놓는곳 
    for(const ops of req.body){//req.body=사용자 입력값 name과 price
        updateOps[ops.propName] = ops.value; 
    }

    productModel
        .update({_id:id}, {$set: updateOps})
        .exec()
        .then(result => {
            res.status(200).json({
                msg:'product updated',
                request: {
                    type:'Get',
                    url:"http://localhost:3000/products/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })


    //res.json({
        //msg: "successful product patch"
    //});

});

router.delete('/:productId', (req, res) => {
    const id = req.params.productId; // param=> Url에 입력되는 값

    productModel
        .remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "successful delete product",
                result: result,
                request : {
                    type:"GET",
                    url:"http://localhost:3000/products/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});



module.exports = router;//라우터를 모듈로 내보냄(product 안에 있는기능들을 server.js로 보냄)