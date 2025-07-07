const mongoose = require('mongoose');

const RentalRequestSchema = new mongoose.Schema({
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
  message: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  showPaymentOption:{
    type: Boolean,
    default: false
  },
  paymentLastDate:{
    type: String,
    default: null
  },
}, { timestamps: true });

module.exports = mongoose.model('RentalRequest', RentalRequestSchema);
