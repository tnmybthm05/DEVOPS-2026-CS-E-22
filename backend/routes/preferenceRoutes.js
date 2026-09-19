import express from 'express';
import { updatePreferences, getPreferences } from '../controllers/preferenceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(protect);

router.route('/')
  .get(getPreferences)
  .put(updatePreferences);

export default router;