// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Страница заказов
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find();
        res.render('orders', { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
