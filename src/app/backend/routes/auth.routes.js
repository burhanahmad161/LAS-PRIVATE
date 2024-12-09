// auth.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import your User model
const authenticateJWT = require('../middlewares/auth.middleware');
// const SECRET_KEY = '090078601';
const SECRET_KEY = 'my_super_secret_key'; // Must be the same in both signing and verification


// function authenticateJWT(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Get the token

//   if (!token) {
//       return res.sendStatus(401); // Unauthorized if no token is present
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//       if (err) {
//           return res.sendStatus(403); // Forbidden if token verification fails
//       }
//       req.user = user; // Attach user info to request
//       next(); // Proceed to the next middleware or route handler
//       localStorage.setItem('token', response.token);
// console.log('Token set:', response.token); // Log the token

//   });
// }

// Route to get the logged-in user's profile
router.get('/me', authenticateJWT,(req, res) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] }, (err, decoded) => {
    if (err) {
      console.error('Token verification failed:', err.message); // Log the error message for debugging
      return res.status(403).json({ message: 'Forbidden', error: err.message });
    }

    // If the token is valid, send back user details
    return res.json({ message: 'User details', user: req.user });
  });
});

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  console.log('Request body:', req.body); // Log incoming request data

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    console.log('User from database:', user); // Log user data from database

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Directly compare the provided password with the stored plain text password
    if (password !== user.password) {
        console.log('Provided password:', password); // Check this
        console.log('Stored password:', user.password); // Check this
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      

    // If the user is an admin, return isAdmin as true
    res.json({ isAdmin: user.role === 'admin' });
  } catch (error) {
    console.error('Server error:', error); // Log any server errors
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
