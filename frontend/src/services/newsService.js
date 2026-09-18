import axios from 'axios';

const API_URL = 'http://localhost:5000/api/news';

export const getNews = async (category = 'All', page = 1, limit = 20) => {
  const response = await axios.get(API_URL, {
    params: { category, page, limit }
  });
  return response.data;
};

export const searchNews = async (query, page = 1, limit = 20) => {
  const response = await axios.get(`${API_URL}/search`, {
    params: { q: query, page, limit }
  });
  return response.data;
};

export const getArticleById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const newsService = {
  getNews,
  searchNews,
  getArticleById
};

export default newsService;