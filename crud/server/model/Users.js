const mongoose = require('mongoose');
const { Schema } = mongoose;


/*This defines what a "user" document looks like in MongoDB. 
Mongoose uses this schema to enforce structure and give you 
methods like find(), create(), etc.*/

const UserSchema = new Schema({
  googleId: { type: String, unique: true, sparse: true }, // For Google OAuth users
  name: String,
  email: { type: String, unique: true },
  password: { type: String }, // For username/password login (optional if only using OAuth)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update updatedAt on save
UserSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const UserModel = mongoose.model('User', UserSchema); // Singular 'User' for the model name, Mongoose pluralizes to 'users' for the collection
module.exports = UserModel;
