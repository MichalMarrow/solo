const mongoose = require('mongoose');


/*This defines what a "user" document looks like in MongoDB. 
Mongoose uses this schema to enforce structure and give you 
methods like find(), create(), etc.*/

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
