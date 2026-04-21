const mongoose = require('mongoose');

const fertilizerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  composition: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  price: Number,
  quantity: Number,
  expiryDate: Date,
  usage: [{
    crop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Crop',
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    date: Date,
    amount: Number,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Fertilizer', fertilizerSchema);
