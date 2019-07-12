const mongoose = require("mongoose");
const orderModel = require("../models/orders");
const productModel = require("../models/products");


exports.orders_get_all = (req, res) => {

    orderModel
        .find()
        .select("productId quantity _id")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        productId: doc.productId,
                        quantity: doc.quantity,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/"+doc._id
                        }
                    };
                })
            };
            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err:err
            });
        });

};

exports.orders_get_order = (req, res) => {  
    const id = req.params.orderId;

    orderModel
        .findById(id)
        .exec()
        .then(doc => {
            if(!doc){
                res.status(200).json({
                    msg: "no orderid"
                });
            }else{
                res.status(200).json({
                    order: doc,
                    request: {
                        type:"GET",
                        url:"http://localhost:3000/orders/" 
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
    };

    exports.orders_create_order = (req, res) => {
    
        productModel
            .findById(req.body.productId)
            .then(product => {//상품이 있는지없는지확인
                if(!product){
                    return res.status(404).json({
                        msg:"product not found"
                    });
                }
                const order = new orderModel({
                    _id:mongoose.Types.ObjectId(),
                    productId:req.body.productId,
                    quantity: req.body.quantity
                });
                return order.save();
            })
            .then(result => {
                console.log(result);
                res.status(200).json({
                    msg:'order stored',
                    createdOrder: result,
                    request:{
                        type:"GET",
                        url:"http://localhost:3000/orders/" + result._id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(200).json({
                    err:err
                })
            });
    
    
    
        // const order = new orderModel({
        //     name: req.body.name,
        //     price: req.body.price
        // });
    
        // order
        //     .save()
        //     .then(results =>{
        //         res.status(200).json({
        //             msg: "success",
        //             createdOrder: result
        //         });
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         res.status(500).json({
        //             err: err
        //         });
        //     });
    };

    exports.orders_patch_order = (req, res) => {
        const id = req.params.orderId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName] = ops.value;   
        }
    
        orderModel
            .update({_id:id}, {$set:updateOps})
            .exec()
            .then(result => {
                res.status(200).json({
                    msg:"order update",
                    request:{
                        type: "GET",
                        url: "http:/localhost:3000/orders/" + id
                    }
                });
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                });
            })
        };

exports.orders_delete_order = (req, res) => {
    const id = req.params.orderId;

    orderModel
        .remove({_id:id})
        .exec()
        .then(result => {
            res.status(200).json({
                msg: "success remove",
                result: result,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders"
                }

            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err: err
            });
        });
};