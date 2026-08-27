import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          📰 AI News Recommendation System
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Personalized, real-time news curated for your unique reading preferences powered by Machine Learning.
        </p>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg text-green-800 font-medium">
              Welcome back, <span className="font-bold">{user.name}</span>! ({user.email})
            </div>
            <div className="flex justify-center gap-4">
              <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/preferences"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                My Preferences
              </Link>
              <button
                onClick={logout}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
