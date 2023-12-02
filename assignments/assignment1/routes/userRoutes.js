const User = require('../models/userModel')
const express = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const routes = express.Router();

const secretKey = 'konga';

routes.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: 'Email already in use' });
    }
      const user = new User({ username, email, password });
      try {
        await user.save();
        res.status(201).json({ status: true, message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ status: false, message: 'An error occurred while saving the user' });
      }
  } catch (error) {
    res.status(500).json({ status: false, message: 'An error occurred' });
  }
});

routes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user == null) {
    return res.status(401).json({ status: false, message: 'Invalid username or password' });
  }
  if (password != user.password) {
    return res.status(401).json({ status: false, message: 'Invalid username or password' });
  }

  const token = jwt.sign({ username: user.username, email: user.email }, secretKey);

  res.status(200).json({
    status: true,
    username: user.username,
    message: 'User logged in successfully',
    jwt_token: token,
  });
});

module.exports = routes