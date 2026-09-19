import { updateUserPreferences, getUserPreferences } from '../services/userProfileService.js';

// @desc    Update user preferences
// @route   PUT /api/preferences
// @access  Private
export const updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    if (!preferences || !Array.isArray(preferences)) {
      return res.status(400).json({ message: 'Please provide an array of preferences' });
    }

    const updatedUser = await updateUserPreferences(req.user._id, preferences);
    
    res.status(200).json({ preferences: updatedUser.preferences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user preferences
// @route   GET /api/preferences
// @access  Private
export const getPreferences = async (req, res) => {
  try {
    const preferences = await getUserPreferences(req.user._id);
    res.status(200).json({ preferences });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};