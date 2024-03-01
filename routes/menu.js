const express = require('express');
const router = express.Router();
const path = require('path');
const Food = require('../models/food');
const Order = require('../models/order');


router.get('/', async (req, res) => {
    try {
        
        const foods = await Food.find();
        res.render(path.join(__dirname, '../public/menu'), { foods });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
