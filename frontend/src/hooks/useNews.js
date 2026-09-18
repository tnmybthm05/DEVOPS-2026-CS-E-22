import { useState, useEffect, useCallback } from 'react';
import newsService from '../services/newsService';

export const useNews = (initialCategory = 'All') => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async (reset = false) => {
    setLoading(true);
    try {
      const currentCategory = reset ? 'All' : category;
      const currentPage = reset ? 1 : page;
      
      const data = await newsService.getNews(currentCategory, currentPage);
      
      setArticles(prev => reset ? data.articles : [...prev, ...data.articles]);
      setHasMore(data.page < data.totalPages);
      if (reset) {
        setPage(2);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  }, [category, page]);

  useEffect(() => {
    fetchNews(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchNews(false);
    }
  };

  return { articles, loading, error, category, setCategory, loadMore, hasMore };
};