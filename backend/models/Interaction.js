import mongoose from 'mongoose';

const interactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    articleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['view', 'click', 'like', 'dislike', 'bookmark', 'share'],
      required: true,
    },
    duration: {
      type: Number, // duration in seconds (mainly for 'view' events)
      default: 0,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, // We use timestamp field explicitly
  }
);

// Index to quickly query all interactions for a specific user and article
interactionSchema.index({ userId: 1, articleId: 1, type: 1 });

const Interaction = mongoose.model('Interaction', interactionSchema);
export default Interaction;