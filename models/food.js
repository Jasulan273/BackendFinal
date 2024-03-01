// models/food.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

// Модель, связанная с коллекцией 'foods'
const Food = mongoose.model('Food', foodSchema, 'foods');

module.exports = Food;
