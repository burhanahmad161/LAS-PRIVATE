// models/payment.js
const mongoose = require('mongoose');

// Define the payment schema
const paymentSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true, // Amount in cents (e.g., 2000 = $20.00)
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'], // Payment status can be pending, paid, or failed
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a payment model based on the schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
