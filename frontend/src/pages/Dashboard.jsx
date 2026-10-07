import React from 'react';
import { useAuth } from '../hooks/useAuth';
import RecommendationFeed from '../components/recommendations/RecommendationFeed';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 pb-5 border-b border-gray-200 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, {user?.name?.split(' ')[0] || 'Reader'}!
          </h1>
          <p className="text-gray-500 mt-2">
            Here are your personalized news recommendations based on your interests and reading history.
          </p>
        </div>
        <div>
          <Link 
            to="/preferences" 
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Update Interests
          </Link>
        </div>
      </div>

      <RecommendationFeed />
    </div>
  );
};

export default Dashboard;
