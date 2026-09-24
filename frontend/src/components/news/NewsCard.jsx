import React, { useState } from 'react';
import interactionService from '../../services/interactionService';
import { useAuth } from '../../hooks/useAuth';

const NewsCard = ({ article }) => {
  const { user } = useAuth();
  const fallbackImage = 'https://via.placeholder.com/400x200?text=News';
  const [interacted, setInteracted] = useState(null); // 'like' | 'dislike'
  const [bookmarked, setBookmarked] = useState(false);

  const handleInteraction = async (actionType) => {
    if (!user?.token) return;
    
    try {
      await interactionService.logInteraction(article._id, actionType, 0, user.token);
      
      if (actionType === 'like' || actionType === 'dislike') {
        setInteracted(actionType);
      } else if (actionType === 'bookmark') {
        setBookmarked(true);
      }
    } catch (error) {
      console.error('Failed to log interaction', error);
    }
  };

  const handleView = () => {
    if (user?.token) {
      // Log view interaction when they click Read More
      interactionService.logInteraction(article._id, 'view', 0, user.token).catch(console.error);
    }
  };

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
          <a href={article.url} target="_blank" rel="noopener noreferrer" onClick={handleView}>
            {article.title}
          </a>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {article.description || 'No description available for this article.'}
        </p>
        
        <div className="mt-auto flex justify-between items-center border-t border-gray-100 pt-3">
          <div className="flex space-x-3">
            <button 
              onClick={() => handleInteraction('like')}
              className={`transition-colors ${interacted === 'like' ? 'text-green-600' : 'text-gray-400 hover:text-green-500'}`}
              title="Like"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={interacted === 'like' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </button>
            <button 
              onClick={() => handleInteraction('dislike')}
              className={`transition-colors ${interacted === 'dislike' ? 'text-red-600' : 'text-gray-400 hover:text-red-500'}`}
              title="Dislike"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={interacted === 'dislike' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
              </svg>
            </button>
            <button 
              onClick={() => handleInteraction('bookmark')}
              className={`transition-colors ${bookmarked ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'}`}
              title="Bookmark"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={bookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleView}
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
