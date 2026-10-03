import Interaction from '../models/Interaction.js';

export const logInteraction = async (userId, articleId, actionType, duration = null) => {
  // If the interaction is 'view', we might want to check if a recent view exists to avoid spamming
  if (actionType === 'view') {
    const recentView = await Interaction.findOne({
      user: userId,
      article: articleId,
      action: 'view',
      createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) } // last 5 minutes
    });

    if (recentView) {
      if (duration) {
        recentView.duration += duration;
        await recentView.save();
        return recentView;
      }
      return recentView; // skip redundant view logging
    }
  }

  // Handle like/dislike toggle
  if (actionType === 'like' || actionType === 'dislike') {
    // Remove existing like or dislike before adding the new one
    await Interaction.deleteMany({
      user: userId,
      article: articleId,
      action: { $in: ['like', 'dislike'] }
    });
  }

  const interaction = await Interaction.create({
    user: userId,
    article: articleId,
    action: actionType,
    duration: duration || 0
  });

  return interaction;
};

export const getInteractionsByUser = async (userId, limit = 50) => {
  return await Interaction.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('article', 'title url category source');
};