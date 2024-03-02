const path = require('path');
const express = require('express');
const router = express.Router();
const Order = require('../models/order');



router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items user');
        res.render(path.join(__dirname, '../public/admin'), { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
