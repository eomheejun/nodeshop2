const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const userModel = require("../models/users");

//sign up 
router.post("/signup", (req, res) => {

    bcrypt.hash(req.body.password, 10, (err,hash) => {
        if(err){
            return res.status(500).json({
                error: err
            });
        }else{
            const user = new userModel({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash
            });
        
            user
                .save()
                .then(result => {
                    res.status(200).json({
                        msg: "user created",
                        userinfo: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err 
                    });
                });
        }
    });

    

});

//log in
router.post("/login", (req, res) => {

});

module.exports = router;