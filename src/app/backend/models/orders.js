const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  winnerName: {
    type: String,
    required: true,
    trim: true
  },
  winningBid: {
    type: Number,
    required: true,
    min: 0
  },
  auctionName: {
    type: String,  // Add this line for auctionName
    required: true, // Make this required if you want
    trim: true      // Optionally, trim spaces around the name
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  phone: {
    type: String,
    default: '',
    match: /^\+92[0-9]{10}$/
  },
  status: {
    type: String,
    required: true,
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
