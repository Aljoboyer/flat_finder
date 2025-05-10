const mongoose = require('mongoose');

const RentHistorySchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentAmount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true 
  },
  city: {
    type: String,
    required: true
  },
  areaName: {
    type: String,
    required: true
  },
  rentedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('RentHistory', RentHistorySchema);
