const mongoose = require('mongoose');

const TempPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  temp_password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('TempPassword', TempPasswordSchema);