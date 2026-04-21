const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Crop', 'Fertilizer', 'Irrigation', 'Pesticide'],
    required: true,
  },
  farmer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'Implemented', 'Ignored'],
    default: 'Pending',
  },
  data: {
    soilConditions: Object,
    weatherData: Object,
    cropHistory: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
