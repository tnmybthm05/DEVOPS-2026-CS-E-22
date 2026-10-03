import express from 'express';
import { logUserInteraction, getUserInteractions } from '../controllers/interactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.post('/', logUserInteraction);
router.get('/', getUserInteractions);

export default router;