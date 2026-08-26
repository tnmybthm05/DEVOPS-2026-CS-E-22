import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
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
    },
    score: {
      type: Number,
      required: true, // Confidence/ranking score from the ML model
    },
    reason: {
      type: String, // E.g., 'Based on your interest in Technology' or 'Because you liked X'
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

// Index for efficiently fetching top recommendations for a user
recommendationSchema.index({ userId: 1, score: -1 });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;