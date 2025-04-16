const mongoose = require('mongoose');
const { Schema } = mongoose;

const VitalsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the 'User' model
    required: true,
    index: true, // For efficient querying by user
  },
  date: { type: Date, required: true },
  bloodPressure: { type: String },
  heartRate: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update updatedAt on save
VitalsSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const VitalModel = mongoose.model('Vital', VitalsSchema); // Singular 'Vital' for the model name, Mongoose pluralizes to 'vitals'
module.exports = VitalModel;
