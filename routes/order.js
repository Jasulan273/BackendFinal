
const path = require('path');
const express = require('express');
const router = express.Router();
const Food = require('../models/food');
const Order = require('../models/order');
router.get('/confirmation', async (req, res) => {
    try {
        const selectedFoodIds = req.session.selectedFoodIds || [];
        const foods = await Food.find({ _id: { $in: selectedFoodIds } });

        res.render(path.join(__dirname, '../public/confirmation'), { foods });
    } catch (err) {
        console.error('Ошибка при получении данных для страницы подтверждения:', err);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/place', async (req, res) => {
    try {
        const foodIds = req.session.selectedFoodIds;
        const foods = await Food.find({ _id: { $in: foodIds } });
        const total = foods.reduce((acc, food) => acc + food.price, 0);

      
        const userId = req.session.userId;

        if (userId) {
            const newOrder = new Order({
                items: foodIds,
                total: total,
                user: userId, 
                date: new Date(),
            });

          
            await newOrder.save();

  
            req.session.selectedFoodIds = [];

            res.send('Заказ успешно размещен');
        } else {
          
            res.redirect('/auth/login');
        }
    } catch (err) {
        console.error('Ошибка в POST /order/place:', err);
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
});

module.exports = router;
