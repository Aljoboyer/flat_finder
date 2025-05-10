const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 2000
  }
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
