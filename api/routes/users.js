const express = require("express");
const router = express.Router();


const userController = require("../controllers/users");
//sign up 
router.post("/signup", userController.users_signup );

//log in
router.post("/login", userController.users_login);

module.exports = router;