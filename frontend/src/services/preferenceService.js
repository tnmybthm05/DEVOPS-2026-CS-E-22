import axios from 'axios';

const API_URL = 'http://localhost:5000/api/preferences/';

const getPreferences = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const updatePreferences = async (preferences, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL, { preferences }, config);
  return response.data;
};

const preferenceService = {
  getPreferences,
  updatePreferences,
};

export default preferenceService;
