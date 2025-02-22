const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: String,
  adminID: {type: String, unique: true},
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('Admin', adminSchema);
