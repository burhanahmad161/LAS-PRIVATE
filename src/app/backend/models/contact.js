const mongoose = require('mongoose');

// Define the schema for the contact form data
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }  // New field to track read/unread status

});

// Create the model
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
