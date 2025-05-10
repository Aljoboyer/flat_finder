const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'video'],
    default: 'text'
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
}
}, { timestamps: true });

// Optional: compound index for performance
MessageSchema.index({ from: 1, to: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);
