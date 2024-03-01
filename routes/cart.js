const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Food = require('../models/food');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('items');
        res.render('cart', { orders });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/submitOrder', async (req, res) => {
    try {
        const cartItems = req.body.cartItems;

        // Создаем новый заказ в базе данных
        const order = new Order({
            items: cartItems,
            total: 0, // Можете настроить логику расчета общей суммы
            user: req.user._id, // Предполагается, что у вас есть middleware, устанавливающий пользователя в req
        });

        await order.save();

        res.status(200).json({ message: 'Order submitted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Добавьте другие методы, такие как removeFromCart, updateQuantity и doOrder, аналогично предыдущему примеру

module.exports = router;
