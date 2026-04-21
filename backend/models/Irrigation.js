const mongoose = require('mongoose');

const irrigationSchema = new mongoose.Schema({
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schedule: [{
    date: Date,
    time: String,
    amount: Number, // in liters
    method: {
      type: String,
      enum: ['Drip', 'Sprinkler', 'Flood', 'Manual'],
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Skipped'],
      default: 'Scheduled',
    },
  }],
  system: {
    type: String,
    enum: ['Automated', 'Semi-automated', 'Manual'],
    default: 'Manual',
  },
  sensors: [{
    type: String, // soil moisture, weather, etc.
    value: Number,
    lastReading: Date,
  }],
  reminders: [{
    message: String,
    date: Date,
    sent: Boolean,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Irrigation', irrigationSchema);
