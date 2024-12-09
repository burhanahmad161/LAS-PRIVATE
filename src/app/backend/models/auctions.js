const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startingPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true, // Duration in hours
  },
  productImage: {
    type: String,
    required: true, // Image URL or file path
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the date of creation
  },
  category: {
    type: String,
    required: true,
  },
  accepted: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'], // Possible statuses
    default: 'pending', // Field to track if the auction is accepted
  },
  bids: [{
    bidderName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User model
      ref: 'User', // Ensure this matches the User model name
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    bidTime: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('Auction', auctionSchema);
