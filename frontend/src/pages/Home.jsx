import React from 'react';
import { useNews } from '../hooks/useNews';
import CategoryTabs from '../components/news/CategoryTabs';
import NewsGrid from '../components/news/NewsGrid';
import SearchBar from '../components/news/SearchBar';

const Home = () => {
  const { articles, loading, error, category, setCategory, loadMore, hasMore } = useNews('All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Top Stories</h1>
          <p className="text-gray-500 mt-1">Catch up on what's happening around the world.</p>
        </div>
        <div className="w-full md:w-96">
          <SearchBar />
        </div>
      </div>

      <CategoryTabs activeCategory={category} onSelectCategory={setCategory} />
      
      <NewsGrid 
        articles={articles} 
        loading={loading} 
        error={error} 
        loadMore={loadMore} 
        hasMore={hasMore} 
      />
    </div>
  );
};

export default Home;
