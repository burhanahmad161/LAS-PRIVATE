const mongoose = require('mongoose');

// Define the schema for the feedback form data
const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  comments: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
