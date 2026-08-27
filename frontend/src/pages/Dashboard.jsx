import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">📰 News Recommendation System</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Signed in as <strong className="text-gray-900">{user?.name || user?.email}</strong></span>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Welcome to your News Feed, {user?.name}!</h2>
          <p className="text-gray-600 text-sm mb-4">
            Your personalized recommendations are being processed based on your reading interactions and preferences.
          </p>
          <div className="flex gap-2">
            {user?.preferences && user.preferences.length > 0 ? (
              user.preferences.map((pref, i) => (
                <span key={i} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                  {pref}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">No preference tags selected yet</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <span className="text-xs font-semibold text-blue-600 uppercase">Technology</span>
            <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">AI and LLMs Revolutionize Automated DevOps</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Modern CI/CD pipelines are evolving with automated machine learning recommendation and intelligent test dispatchers.
            </p>
            <div className="mt-4 text-xs text-gray-400">Tech Crunch • 2 hours ago</div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <span className="text-xs font-semibold text-indigo-600 uppercase">Science</span>
            <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">New Insights into Next-Gen Machine Learning</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Hybrid recommendation engines combining TF-IDF and collaborative filtering show up to 40% improvement in user relevance.
            </p>
            <div className="mt-4 text-xs text-gray-400">Science Daily • 4 hours ago</div>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <span className="text-xs font-semibold text-green-600 uppercase">Business</span>
            <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">Cloud-Native Architectures Drive Enterprise Growth</h3>
            <p className="text-sm text-gray-600 line-clamp-3">
              Microservices and containerization lead to faster deployment cycles across engineering teams worldwide.
            </p>
            <div className="mt-4 text-xs text-gray-400">Forbes • 6 hours ago</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
