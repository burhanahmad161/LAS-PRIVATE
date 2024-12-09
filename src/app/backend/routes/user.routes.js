// routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticateJWT = require('../middlewares/auth.middleware');
const jwt = require('jsonwebtoken');


// const SECRET_KEY = '090078601';
const SECRET_KEY = 'my_super_secret_key'; // Must be the same in both signing and verification


// Route to get logged-in user details
router.get('/me', authenticateJWT,(req, res) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err);
      return res.status(403).json({ message: 'Forbidden' });
    }
  });
  

  //   // If token is valid, send back user details
  //   res.json({ message: 'User details', user: decoded });
  // });
});

// POST route to create a new user
router.post('/users', async (req, res) => {
    try {
      const { userid, password, username, role } = req.body;
  
      // Check if all fields are provided
      if (!userid || !password || !username || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const newUser = new User({
        userid,
        password,
        username,
        role
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
