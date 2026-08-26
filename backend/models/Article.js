import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      index: true,
    },
    source: {
      type: String,
      required: true,
    },
    author: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
    },
    publishedAt: {
      type: Date,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

const Article = mongoose.model('Article', articleSchema);
export default Article;