// routes/menu.js
const express = require('express');
const router = express.Router();
const path = require('path');
const Food = require('../models/food');
const Order = require('../models/order');

router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        const selectedFoodIds = req.session.selectedFoodIds || [];
        const selectedFoods = await Food.find({ _id: { $in: selectedFoodIds } });

        res.render(path.join(__dirname, '../public/menu'), { foods, selectedFoods });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
router.post('/addToCart', (req, res) => {
    try {
        const { foodId } = req.body;

        req.session.selectedFoodIds = req.session.selectedFoodIds || [];
        req.session.selectedFoodIds.push(foodId);

        res.redirect('/menu');
    } catch (err) {
        console.error('Error in POST /menu/addToCart:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.post('/order', async (req, res) => {
    try {
        const { foodIds } = req.body;
        req.session.selectedFoodIds = foodIds;
        res.redirect('/confirmation');
    } catch (err) {
        console.error('Ошибка в POST /menu/order:', err);
        res.status(500).send('Internal Server Error');
    }
});






module.exports = router;
