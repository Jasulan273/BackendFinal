// routes/food.js
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const Food = require('../models/food');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.render('menu', { foods });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/new', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/add.html'));
});

router.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const { name, price, image } = req.body;
    const newFood = new Food({ name, price, image });
    await newFood.save();


    console.log('Food saved successfully');

    const foods = await Food.find();

    res.send('Food added successfully');
  } catch (err) {
    console.error('Error in POST /food:', err);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
