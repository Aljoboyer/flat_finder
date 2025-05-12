const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  image: {
    type: String, 
    default: null
  },
  role: {
    type: String,
    enum: ['buyer', 'seller'],
    required: true
  },
  address: {
    city: { type: String },
    state: { type: String },
    country: { type: String, default: 'Bangladesh' } // optional
  },

 // Seller-specific fields
  nidNo: {
    type: String,
    required: function () {
      return this.role === 'seller';
    }
  },
  propertyName: {
    type: String,
    required: function () {
      return this.role === 'seller';
    }
  }

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
