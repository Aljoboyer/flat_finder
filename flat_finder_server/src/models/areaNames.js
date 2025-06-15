const mongoose = require('mongoose');

const areaNamesSchema = new mongoose.Schema({
  cityName: {
    type: String
  },
  areaName: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('AreaName', areaNamesSchema);
