const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  model: String,
  purchaseDate: Date,
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor'],
    default: 'Good',
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  maintenanceSchedule: [{
    date: Date,
    type: String,
    notes: String,
  }],
  usage: [{
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    date: Date,
    hours: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Equipment', equipmentSchema);
