const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");



const productController = require("../controllers/products");

router.get('/', productController.products_get_all);

router.get('/:productId',checkAuth, productController.products_get_product );

router.post('/', checkAuth, productController.products_create_product);

router.patch('/:productId', checkAuth, productController.products_patch_product);

router.delete('/:productId', checkAuth, productController.products_delete_product);



module.exports = router;//라우터를 모듈로 내보냄(product 안에 있는기능들을 server.js로 보냄)