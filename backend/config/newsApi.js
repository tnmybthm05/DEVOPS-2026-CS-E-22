import { env } from './env.js';

export const newsApiConfig = {
  baseUrl: 'https://newsapi.org/v2',
  apiKey: env.newsApiKey,
  endpoints: {
    topHeadlines: '/top-headlines',
    everything: '/everything',
  },
  categories: [
    'technology', 'sports', 'business', 'science', 'entertainment', 'health', 'general'
  ]
};