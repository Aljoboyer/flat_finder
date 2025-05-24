const UserConnectionSchema = new mongoose.Schema({
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  connectionRoamId: {
    type: String
  },
  user1Deleted: {
    type: Boolean,
    default: false,
  },
  user2Deleted: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['connected', 'removed_by_user1', 'removed_by_user2', 'blocked'],
    default: 'connected',
  },
  connectedAt: {
    type: Date,
    default: Date.now,
  },
  lastMessageAt: {
    type: Date,
    default: null,
  }
}, { timestamps: true });

UserConnectionSchema.index({ user1: 1, user2: 1 }, { unique: true });
