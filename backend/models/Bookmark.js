import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
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
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

// Prevent a user from bookmarking the same article multiple times
bookmarkSchema.index({ userId: 1, articleId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;