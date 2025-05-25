const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: {
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
  purpose: {
    type: String,
    enum: ['rent', 'sell'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  advanceMoney: {
    type: String,
    required: true
  },
  flatMeasurement: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  floorNo: {
    type: String,
  },
  bedRooms: {
    type: String,
  },
  bathrooms: {
    type: String,
  },
  balcony: {
    type: String,
  },

  // Optional Facilities
  generator: {
    type: Boolean,
    default: false
  },
  govtGas: {
    type: Boolean,
    default: false
  },
  cctvSecurity: {
    type: Boolean,
    default: false
  },
  schoolNearBy: {
    type: Boolean,
    default: false
  },
  parking: {
    type: Boolean,
    default: false
  },
  hospitalNearBy: {
    type: Boolean,
    default: false
  },
  propertyType: {
    type: String,
    default: false,
     enum: ['flat', 'office', 'showroam', 'restaurant'],
  },
  // Generated ID for public display (6 digit code)
  propertyId: {
    type: String,
  },

  images: [String], // Array of image URLs
  video: {
    type: String // URL
  },

  status: {
    type: String,
    enum: ['active', 'in_process', 'booked', 'inactive'],
    default: 'active'
  },

  googleMapUrl: {
    type: String,
  },

  // Relations
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

PropertySchema.index({ propertyId: 1 });

module.exports = mongoose.model('Property', PropertySchema);
