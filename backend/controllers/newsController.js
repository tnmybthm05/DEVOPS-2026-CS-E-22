import * as newsService from '../services/newsService.js';

// @desc    Get latest news
// @route   GET /api/news
// @access  Public
export const getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const category = req.query.category;

    const query = category && category !== 'All' ? { category: { $regex: new RegExp(`^${category}$`, 'i') } } : {};

    const data = await newsService.getArticles(query, page, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search news
// @route   GET /api/news/search
// @access  Public
export const searchNews = async (req, res) => {
  try {
    const keyword = req.query.q;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;

    if (!keyword) {
      return res.status(400).json({ message: 'Search keyword is required' });
    }

    const data = await newsService.searchArticles(keyword, page, limit);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single article
// @route   GET /api/news/:id
// @access  Public
export const getArticle = async (req, res) => {
  try {
    const article = await newsService.getArticleById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};