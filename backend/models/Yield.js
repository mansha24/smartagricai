const mongoose = require('mongoose');

const yieldSchema = new mongoose.Schema({
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
  season: {
    type: String,
    required: true,
  },
  expectedYield: Number,
  actualYield: Number,
  unit: {
    type: String,
    default: 'kg',
  },
  quality: {
    type: String,
    enum: ['Excellent', 'Good', 'Average', 'Poor'],
  },
  factors: {
    weather: String,
    soil: String,
    irrigation: String,
    fertilizers: String,
  },
  analytics: {
    efficiency: Number,
    costPerUnit: Number,
    profit: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Yield', yieldSchema);
