const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  userType: { type: String, enum: ['buyer', 'seller'], required: true }
});

module.exports = mongoose.model('User', UserSchema);