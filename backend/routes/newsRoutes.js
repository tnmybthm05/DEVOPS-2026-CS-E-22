import express from 'express';
import { getNews, searchNews, getArticle } from '../controllers/newsController.js';

const router = express.Router();

router.get('/', getNews);
router.get('/search', searchNews);
router.get('/:id', getArticle);

export default router;