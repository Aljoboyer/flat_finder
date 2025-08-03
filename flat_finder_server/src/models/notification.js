const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // System-generated notifications will have null
  },
  type: {
    type: String,
    enum: [
      'rent-request',
      'rent-request-accepted',
      'rent-request-rejected',
      'payment-success',
      'new-comment',
      'new-like',
      'new-property',
      'user-connected',
      'message-received',
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    default: null,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
 connectionRoamId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

NotificationSchema.index({ receiver: 1, createdAt: -1 }); // for fast fetching latest notifications

module.exports = mongoose.model('Notification', NotificationSchema);
