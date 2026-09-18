import React from 'react';

const NewsCard = ({ article }) => {
  const fallbackImage = 'https://via.placeholder.com/400x200?text=News';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border border-gray-100">
      <div className="h-48 overflow-hidden relative">
        <img
          src={article.imageUrl || fallbackImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
          {article.category}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 mb-2 flex justify-between">
          <span>{article.source}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {article.description || 'No description available for this article.'}
        </p>
        
        <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-600 hover:text-blue-800"
          >
            Read More &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
