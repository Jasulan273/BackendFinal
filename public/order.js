// routes/order.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Food = require('../models/food');

router.post('/place', async (req, res) => {
    try {
        const foodIds = req.session.selectedFoodIds;

        // Получаем информацию о пользователе из сессии
        const userId = req.session.userId;

        // Рассчитываем общую стоимость заказа
        const foods = await Food.find({ _id: { $in: foodIds } });
        const total = foods.reduce((acc, food) => acc + food.price, 0);

        // Создаем новый заказ
        const newOrder = new Order({ user: userId, items: foodIds, total });
        await newOrder.save();

        // Очищаем выбранные блюда из сессии
        req.session.selectedFoodIds = null;

        res.send('Заказ успешно размещен');
    } catch (err) {
        console.error('Ошибка в POST /order/place:', err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
