const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  plantingDate: {
    type: Date,
    required: true,
  },
  harvestDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Planted', 'Growing', 'Harvested', 'Failed'],
    default: 'Planted',
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  field: {
    location: String,
    size: Number, // in acres
  },
  irrigationSchedule: [{
    date: Date,
    amount: Number, // in liters
    method: String,
  }],
  fertilizers: [{
    name: String,
    date: Date,
    quantity: Number,
  }],
  pesticides: [{
    name: String,
    date: Date,
    quantity: Number,
  }],
  yield: {
    expected: Number,
    actual: Number,
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Crop', cropSchema);
