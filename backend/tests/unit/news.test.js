import { jest } from '@jest/globals';

const mockGetArticles = jest.fn();
const mockSearchArticles = jest.fn();
const mockGetArticleById = jest.fn();

jest.unstable_mockModule('../../services/newsService.js', () => ({
  getArticles: mockGetArticles,
  searchArticles: mockSearchArticles,
  getArticleById: mockGetArticleById,
}));

const { getNews, searchNews, getArticle } = await import('../../controllers/newsController.js');

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
      mockGetArticles.mockResolvedValue(mockData);

      await getNews(req, res);

      expect(mockGetArticles).toHaveBeenCalledWith({}, 1, 20);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });

    it('should apply category filter', async () => {
      req.query = { category: 'Technology' };
      mockGetArticles.mockResolvedValue({});

      await getNews(req, res);

      expect(mockGetArticles).toHaveBeenCalled();
      const queryArg = mockGetArticles.mock.calls[0][0];
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
      mockSearchArticles.mockResolvedValue(mockData);

      await searchNews(req, res);

      expect(mockSearchArticles).toHaveBeenCalledWith('AI', 1, 20);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockData);
    });
  });

  describe('getArticle', () => {
    it('should return 404 if article not found', async () => {
      req.params = { id: 'invalid_id' };
      mockGetArticleById.mockResolvedValue(null);

      await getArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Article not found' });
    });

    it('should return article if found', async () => {
      req.params = { id: 'valid_id' };
      const mockArticle = { _id: 'valid_id', title: 'Test Article' };
      mockGetArticleById.mockResolvedValue(mockArticle);

      await getArticle(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockArticle);
    });
  });
});