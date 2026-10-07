import React, { useState, useEffect } from 'react';
import recommendationService from '../../services/recommendationService';
import { useAuth } from '../../hooks/useAuth';
import NewsCard from '../news/NewsCard';

const RecommendationFeed = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user?.token) return;
      
      try {
        const data = await recommendationService.getRecommendations(user.token, 12);
        setArticles(data);
      } catch (err) {
        setError('Failed to load personalized recommendations. Showing latest news instead.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="mb-12">
      {error && (
        <div className="bg-yellow-50 text-yellow-800 p-4 rounded-lg mb-6 shadow-sm border border-yellow-200">
          {error}
        </div>
      )}

      {articles.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900">We're learning your preferences</h3>
          <p className="mt-2 text-gray-500">Read and interact with more articles to get personalized recommendations.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={`${article._id}-${index}`} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationFeed;
