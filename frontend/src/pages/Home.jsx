import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNews } from '../hooks/useNews';
import CategoryTabs from '../components/news/CategoryTabs';
import NewsGrid from '../components/news/NewsGrid';
import SearchBar from '../components/news/SearchBar';

const Home = () => {
  const { user } = useAuth();
  const { articles, loading, error, category, setCategory, loadMore, hasMore } = useNews('All');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Personalized Welcome & Quick Actions (restored earlier requirements) */}
      {user && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 bg-blue-500/30 backdrop-blur-sm rounded-full text-xs font-semibold tracking-wide uppercase">
              Personalized News Feed
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome back, {user.name}!
            </h2>
            <p className="text-blue-100 text-sm max-w-xl">
              Curated real-time news powered by Machine Learning tailored to your interests.
            </p>
            {user.preferences && user.preferences.length > 0 ? (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-blue-200">Your topics:</span>
                {user.preferences.map((pref, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-white/20 hover:bg-white/30 rounded-full text-xs font-medium text-white transition"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            ) : (
              <div className="pt-1">
                <Link
                  to="/preferences"
                  className="text-xs text-yellow-300 hover:text-yellow-200 underline font-medium"
                >
                  ⚡ Set your news preferences to personalize your feed &rarr;
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-white text-blue-700 font-semibold rounded-lg text-sm hover:bg-blue-50 shadow-sm transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/preferences"
              className="px-4 py-2 bg-blue-500/30 hover:bg-blue-500/50 text-white font-semibold rounded-lg text-sm border border-white/20 transition"
            >
              My Preferences
            </Link>
          </div>
        </div>
      )}

      {/* Top Stories News Section */}
      <div>
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Top Stories</h1>
            <p className="text-gray-500 mt-1 text-sm">Catch up on what's happening around the world.</p>
          </div>
          <div className="w-full md:w-80">
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
    </div>
  );
};

export default Home;
