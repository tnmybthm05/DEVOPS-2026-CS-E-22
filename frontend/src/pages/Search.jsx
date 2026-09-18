import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import newsService from '../services/newsService';
import NewsGrid from '../components/news/NewsGrid';
import SearchBar from '../components/news/SearchBar';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      
      setLoading(true);
      try {
        const data = await newsService.searchNews(query, 1);
        setArticles(data.articles);
        setHasMore(data.page < data.totalPages);
        setPage(2);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to search news');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const data = await newsService.searchNews(query, page);
      setArticles(prev => [...prev, ...data.articles]);
      setHasMore(data.page < data.totalPages);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to load more results');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Search Results</h1>
          <p className="text-gray-500 mt-1">Showing results for "{query}"</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar />
        </div>
      </div>

      {!query ? (
        <div className="text-center py-20 text-gray-500">
          Enter a keyword to search for news articles.
        </div>
      ) : (
        <NewsGrid 
          articles={articles} 
          loading={loading} 
          error={error} 
          loadMore={loadMore} 
          hasMore={hasMore} 
        />
      )}
    </div>
  );
};

export default Search;
