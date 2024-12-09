const mongoose = require('mongoose');

// Define the schema for a Bid
const bidSchema = new mongoose.Schema({
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction', // Reference to the Auction model
    required: true,
  },
  bidderName: {
    type: String,
    required: true, // The name of the person placing the bid
  },
  bidAmount: {
    type: Number,
    required: true, // The amount of the bid
  },
  bidTime: {
    type: Date,
    default: Date.now, // Automatically sets the bid time
  },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
