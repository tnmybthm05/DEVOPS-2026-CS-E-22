import axios from 'axios';

const API_URL = 'http://localhost:5000/api/interactions';

const logInteraction = async (articleId, actionType, duration = 0, token) => {
  if (!token) return null; // Silently fail if not logged in, or we can throw error
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, { articleId, actionType, duration }, config);
  return response.data;
};

const getInteractions = async (token) => {
  if (!token) return [];
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const interactionService = {
  logInteraction,
  getInteractions
};

export default interactionService;