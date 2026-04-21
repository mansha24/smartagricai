const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [{
    name: String,
    category: String,
    price: Number,
    description: String,
    stock: Number,
  }],
  services: [{
    name: String,
    description: String,
    price: Number,
  }],
  ratings: [{
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: Number,
    review: String,
    date: Date,
  }],
  averageRating: {
    type: Number,
    default: 0,
  },
  contactInfo: {
    phone: String,
    address: String,
    website: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Supplier', supplierSchema);
