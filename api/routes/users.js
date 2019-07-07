const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");//npm install bcryptjs =>비밀번호를 암호화해줌
const jwt = require("jsonwebtoken");//로그인을하면 토큰을 발행 토큰이 있어야지 활동가능
const mongoose = require("mongoose");
const userModel = require("../models/users");

//sign up 
router.post("/signup", (req, res) => {//signup으로 들어감


    userModel
        .find({email: req.body.email})
        .exec()
        .then(user => {
            if(user.length > 1){
                return res.status(400).json({
                    msg:"mail 있음"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new userModel({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash //등록
                        });
                    
                        user
                            .save()//저장
                            .then(result => {
                                res.status(200).json({
                                    msg: "user created",
                                    userinfo: result//사용자정보
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err 
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
    

    

});

//log in
router.post("/login", (req, res) => {
    userModel
        .find({email:req.body.email})
        .then(user => {
            if(user.length < 1){
                return res.status(200).json({
                   msg:"등록되지 않은 회원"
               });
            }else{
                bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
                    if(err){
                        return res.status(401).json({
                            msg:"password 틀림"
                        });
                    }else{

                        const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                        "secret", {expiresIn: "1h"}
                        );
                        return res.status(200).json({
                            msg:"successful",
                            token: token
                        });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error:err
            });
        });
});

module.exports = router;