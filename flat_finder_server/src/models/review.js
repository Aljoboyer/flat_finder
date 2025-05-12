const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Buyer giving the review
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Seller receiving the review
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    maxlength: 1000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

ReviewSchema.index({ seller: 1 }); // Faster lookup on seller profile
ReviewSchema.index({ reviewer: 1, seller: 1 }, { unique: true }); // One review per buyer per seller
