const mongoose = require('mongoose');

const soilSchema = new mongoose.Schema({
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  field: {
    type: String,
    required: true,
  },
  soilType: {
    type: String,
    required: true,
  },
  pH: {
    type: Number,
    required: true,
  },
  nutrients: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
    organicMatter: Number,
  },
  moisture: {
    type: Number,
  },
  lastTestDate: {
    type: Date,
    default: Date.now,
  },
  recommendations: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Soil', soilSchema);
