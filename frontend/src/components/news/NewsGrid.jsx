import React from 'react';
import NewsCard from './NewsCard';

const NewsGrid = ({ articles, loading, error, loadMore, hasMore }) => {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 bg-red-50 p-4 rounded-lg inline-block">{error}</p>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="text-center py-20">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
        <p className="mt-1 text-sm text-gray-500">Check back later or try a different category.</p>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={`${article._id}-${index}`} article={article} />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && hasMore && (
        <div className="flex justify-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsGrid;
