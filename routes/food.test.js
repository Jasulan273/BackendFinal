const request = require('supertest');
const express = require('express');
const app = express();
const foodRouter = require('../routes/food');

app.use('/food', foodRouter);

describe('Food routes', () => {
  it('should get list of foods', async () => {
    const response = await request(app).get('/food');
    expect(response.statusCode).toBe(200);
  });

  it('should add a new food', async () => {
    const response = await request(app)
      .post('/food')
      .send({
        name: 'New Food',
        price: 10,
        image: 'food.jpg',
      });
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Food added successfully');
  });
});
