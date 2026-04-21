const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  temperature: {
    min: Number,
    max: Number,
    avg: Number,
  },
  humidity: Number,
  rainfall: Number,
  windSpeed: Number,
  conditions: String,
  forecast: [{
    date: Date,
    temp: Number,
    conditions: String,
    rainChance: Number,
  }],
  alerts: [{
    type: String,
    severity: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Weather', weatherSchema);
