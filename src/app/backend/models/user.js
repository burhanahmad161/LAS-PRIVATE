const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
