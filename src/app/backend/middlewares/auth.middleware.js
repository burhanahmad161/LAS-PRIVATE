// middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// const SECRET_KEY = '090078601';
const SECRET_KEY = 'my_super_secret_key'; // Must be the same in both signing and verification


// const authenticateJWT = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];
  
//     if (!token) {
//       return res.sendStatus(403); // Forbidden
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.sendStatus(403); // Forbidden
//       }
//       req.user = user; // Attach user info to request
//       next();
//     });
//   };

// function authenticateJWT(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header
  
//     console.log('Received Token:', token); // Log the token for debugging
  
//     if (!token) {
//       return res.sendStatus(403); // Forbidden if no token
//     }
  
//     jwt.verify(token, SECRET_KEY, (err, user) => {
//       if (err) {
//         console.error('Token verification failed:', err); // Log verification errors
//         return res.sendStatus(403); // Token is invalid
//       }
//       req.user = user; // Save user information to request
//       next(); // Proceed to the next middleware or route handler
//     });
//   }
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header
  
    console.log('Received Token:', token); // Log the token for debugging
  
    if (!token) {
      return res.sendStatus(403); // Forbidden if no token
    }
  
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        console.error('Token verification failed:', err); // Log verification errors
        return res.sendStatus(403); // Token is invalid
      }
      req.user = user; // Save user information to request
      next(); // Proceed to the next middleware or route handler
    });
  }
module.exports = authenticateJWT;
