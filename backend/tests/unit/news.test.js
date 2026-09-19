import { getNews, searchNews, getArticle } from '../../controllers/newsController.js';
import * as newsService from '../../services/newsService.js';

jest.mock('../../services/newsService.js');

describe('News Controller', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      query: {},
      params: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe('getNews', () => {
    it('should return articles successfully', async () => {
      const mockData = { articles: [], page: 1, totalPages: 1, total: 0 };
      newsService.getArticles.mockResolvedValue(mockData);

      await getNews(req, res);

      expect(newsService.getArticles).toHaveBeenCalledWith({}, 1, 20);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should apply category filter', async () => {
      req.query = { category: 'Technology' };
      newsService.getArticles.mockResolvedValue({});

      await getNews(req, res);

      expect(newsService.getArticles).toHaveBeenCalled();
      const queryArg = newsService.getArticles.mock.calls[0][0];
      expect(queryArg.category).toBeDefined();
    });
  });

  describe('searchNews', () => {
    it('should return 400 if keyword is missing', async () => {
      await searchNews(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Search keyword is required' });
    });

    it('should return search results', async () => {
      req.query = { q: 'AI' };
      const mockData = { articles: [] };
      newsService.searchArticles.mockResolvedValue(mockData);

      await searchNews(req, res);

      expect(newsService.searchArticles).toHaveBeenCalledWith('AI', 1, 20);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getArticle', () => {
    it('should return 404 if article not found', async () => {
      req.params = { id: 'invalid_id' };
      newsService.getArticleById.mockResolvedValue(null);

      await getArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Article not found' });
    });

    it('should return article if found', async () => {
      req.params = { id: 'valid_id' };
      const mockArticle = { _id: 'valid_id', title: 'Test Article' };
      newsService.getArticleById.mockResolvedValue(mockArticle);

      await getArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockArticle);
    });
  });
});