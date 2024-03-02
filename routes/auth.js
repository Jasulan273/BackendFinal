const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/user');

const registerPagePath = path.join(__dirname, '../public/register.html');
const loginPagePath = path.join(__dirname, '../public/login.html');

router.get('/register', (req, res) => {
  res.sendFile(registerPagePath);
});

router.get('/login', (req, res) => {
  res.sendFile(loginPagePath);
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const newUser = new User({ username, password });
    await newUser.save();
    return res.redirect('/auth/login');
  } catch (error) {
    console.error('Error in POST /register:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { username, password } = req.body; 

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).send('Invalid username or password');
    }
    req.session.userId = user._id;
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Invalid password for user:', username);
      return res.status(401).send('Invalid username or password');
    }


    req.session.username = username;
    res.redirect('/');

  } catch (error) {
    console.error('Error in POST /login:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/logout', (req, res) => {

  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
});

module.exports = router;
