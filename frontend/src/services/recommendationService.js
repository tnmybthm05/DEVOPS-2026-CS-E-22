import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recommendations';

const getRecommendations = async (token, limit = 10) => {
  if (!token) return [];
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { limit }
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const recommendationService = {
  getRecommendations
};

export default recommendationService;