const mongoose = require('mongoose');

const ClientUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  notifications: { type: [String], default: [] },
  winningBid: { type: String, default: '' }
});

const ClientUser = mongoose.model('ClientUser', ClientUserSchema);

module.exports = ClientUser;
