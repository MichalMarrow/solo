const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  date: String,
  bloodPressure: String,
  heartRate: Number,
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
