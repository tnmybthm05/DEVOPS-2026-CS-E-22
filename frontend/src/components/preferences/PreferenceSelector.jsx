import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import preferenceService from '../../services/preferenceService';
import PreferenceCard from './PreferenceCard';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Technology', 'AI', 'Sports', 'Business', 
  'Science', 'Politics', 'Entertainment', 'Gaming',
  'Health', 'World'
];

const PreferenceSelector = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPreferences, setSelectedPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        if (user?.token) {
          const data = await preferenceService.getPreferences(user.token);
          setSelectedPreferences(data.preferences || []);
        }
      } catch (err) {
        console.error('Failed to load preferences', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPrefs();
  }, [user]);

  const handleToggle = (category) => {
    if (selectedPreferences.includes(category)) {
      setSelectedPreferences(selectedPreferences.filter((p) => p !== category));
    } else {
      setSelectedPreferences([...selectedPreferences, category]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      await preferenceService.updatePreferences(selectedPreferences, user.token);
      // Update local storage user object if necessary, or just redirect
      const updatedUser = { ...user, preferences: selectedPreferences };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading preferences...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">What are you interested in?</h2>
        <p className="mt-4 text-lg text-gray-600">
          Select topics to personalize your news feed. We'll use this to build your initial recommendation profile.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-10">
        {CATEGORIES.map((category) => (
          <PreferenceCard
            key={category}
            category={category}
            isSelected={selectedPreferences.includes(category)}
            onToggle={handleToggle}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          disabled={saving || selectedPreferences.length === 0}
          className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors shadow-md ${
            saving || selectedPreferences.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saving ? 'Saving...' : 'Continue to Dashboard'}
        </button>
      </div>
    </div>
  );
};

export default PreferenceSelector;
