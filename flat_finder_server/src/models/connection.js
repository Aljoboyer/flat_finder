const UserConnectionSchema = new mongoose.Schema({
  buyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  connectionRoamId: {
    type: String
  },
  status: {
    type: String,
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
