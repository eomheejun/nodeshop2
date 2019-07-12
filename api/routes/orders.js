const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');



const orderController = require("../controllers/orders");

router.get('/', checkAuth, orderController.orders_get_all );

router.get('/:orderId', checkAuth, orderController.orders_get_order);

router.post('/', checkAuth, orderController.orders_create_order);

router.patch('/:orderId', orderController.orders_patch_order);

router.delete('/:orderId', checkAuth, orderController.orders_delete_order );

module.exports = router;