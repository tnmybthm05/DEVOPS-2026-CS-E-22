import User from '../models/User.js';

export const updateUserPreferences = async (userId, newPreferences) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  user.preferences = newPreferences;
  await user.save();

  return user;
};

export const getUserPreferences = async (userId) => {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return user.preferences;
};