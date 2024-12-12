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
const contactRoutes = require('./routes/contact.routes')
const feedbackRoutes = require('./routes/feedback.routes')
const paymentRoutes = require('./routes/payment.routes')
const adminRoutes = require('./routes/admin.routes')
const { default: Stripe } = require('stripe');
const stripe = require('./routes/stripe.routes');
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);
app.use('/api/user', ClientUser);
app.use('/api/orders', Orders)
app.use('/api/stripe', stripe);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment', paymentRoutes)
app.use('/api/admin', adminRoutes);

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


// app.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const jwt = require('jsonwebtoken'); // Import JWT for token verification

// const app = express();
// app.use(bodyParser.json());
// app.use(cors({
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use('/uploads', express.static('uploads'));
// dotenv.config();

// const stripe = require('stripe')('sk_test_51QTW9CDiqcrh4bWVfxnwgMUj4We9MGO3gdM1EDIibpw9ZgaWs4edEBEm0y89dg4ooO95oCsB9m2AKelJYFIbP2N400PmImUXh2')// Must be the same in both signing and verification
// function authenticateJWT(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header

//   console.log('Received Token:', token); // Log the token for debugging

//   if (!token) {
//     return res.sendStatus(403); // Forbidden if no token
//   }

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) {
//       console.error('Token verification failed:', err); // Log verification errors
//       return res.sendStatus(403); // Token is invalid
//     }
//     req.user = user; // Save user information to request
//     next(); // Proceed to the next middleware or route handler
//   });
// }

// const userRoutes = require('./routes/user.routes');
// const authRoutes = require('./routes/auth.routes');
// const auctionRoutes = require('./routes/auctions.routes');
// const ClientUser = require('./routes/clientUser.routes');
// const Orders = require('./routes/order.routes');
// const { default: Stripe } = require('stripe');
// const stripe = require('./routes/stripe.routes');
// const PORT = process.env.PORT || 3000;

// app.post('/create-checkout-session', async (req, res) => {
//   const stripe = Stripe('sk_test_51QTW9CDiqcrh4bWVfxnwgMUj4We9MGO3gdM1EDIibpw9ZgaWs4edEBEm0y89dg4ooO95oCsB9m2AKelJYFIbP2N400PmImUXh2'); // Use env variable for security
//   const domain = `http://localhost:${PORT}`;
//   // Get the amount from request, default to 1000 if not provided
//   const amount = req.body?.data?.amount || 1000;
  
//   try {
//     // Create Stripe session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'Test payment',
//             },
//             unit_amount: amount,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${domain}/stripe-successful-payment?hash=hash`, // Proper string concatenation
//       cancel_url: `${domain}/stripe-canceled-payment?hash=hash`, // Proper string concatenation
//       expand: ['payment_intent'],
//     });

//     return res.send(session);
//   } catch (err) {
//     console.log('Stripe error:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// // Routes
// app.use('/api', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/auctions', auctionRoutes);
// app.use('/api/user', ClientUser);
// app.use('/api/orders', Orders);
// app.use('/api/stripe', stripe);

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/FYP', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((error) => console.log('MongoDB connection error:', error));

// // Start the server
// app.listen(PORT, '0.0.0.0', () => {
//   console.log(`Server running on port ${PORT}`);
// });
