// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/uploads', express.static('uploads'));
dotenv.config();

const SECRET_KEY = 'my_super_secret_key'; // Must be the same in both signing and verification
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

const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const auctionRoutes = require('./routes/auctions.routes');
const ClientUser = require('./routes/clientUser.routes');
const Orders = require('./routes/order.routes');
const PORT = process.env.PORT || 3000;

// const SECRET_KEY = '090078601';

// Middleware
// app.use(bodyParser.json());
// const userRoutes = require('./routes/user.routes');


// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/user', ClientUser);
app.use('/api/orders', Orders)

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/FYP', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));


// Start the server
app.listen(PORT, '0.0.0.0',() => {
  console.log(`Server running on port ${PORT}`);
});
