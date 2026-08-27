import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Technology', 'Business', 'Sports', 'Entertainment', 'Science', 'Health', 'Politics', 'World'];

const Preferences = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(user?.preferences || ['Technology', 'Science']);
  const [saved, setSaved] = useState(false);

  const toggleCategory = (cat) => {
    if (selected.includes(cat)) {
      setSelected(selected.filter((c) => c !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Interests</h2>
        <p className="text-gray-600 mb-6">Select topic categories to tune the recommendation engine for you.</p>

        {saved && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
            Preferences saved! Redirecting to Dashboard...
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = selected.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                onClick={() => toggleCategory(cat)}
                className={`py-3 px-4 rounded-lg font-medium text-sm transition-all border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default Preferences;
