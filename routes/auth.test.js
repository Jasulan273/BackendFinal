const request = require('supertest');
const express = require('express');
const app = express();
const authRouter = require('../routes/auth');

app.use('/auth', authRouter);

describe('Authentication routes', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword2',
            });
        expect(response.statusCode).toBe(200); 
        expect(response.headers.location).toBe('/auth/login');
    });

    it('should login with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });
        expect(response.statusCode).toBe(302);
        expect(response.headers.location).toBe('/');
    });

    it('should not login with invalid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword',
            });
        expect(response.statusCode).toBe(401);
    });

    it('should logout', async () => {
        const response = await request(app).get('/auth/logout');
        expect(response.statusCode).toBe(200);
        expect(response.headers.location).toBe('/');
    });
});
