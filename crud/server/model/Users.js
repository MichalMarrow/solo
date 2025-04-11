const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  name: String,
  email: { type: String, unique: true },
  date: String,
  bloodPressure: String,
  heartRate: Number,
});

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
