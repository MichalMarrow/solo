const mongoose = require('mongoose');
const { Schema } = mongoose;

const VitalsSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    bloodPressure: { type: String },
    heartRate: { type: Number },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // Correct type and required
  },
  { timestamps: true }
);


const VitalModel = mongoose.model('Vital', VitalsSchema); // Singular 'Vital' for the model name, Mongoose pluralizes to 'vitals'
module.exports = VitalModel;
