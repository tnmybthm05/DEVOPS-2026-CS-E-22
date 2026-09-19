import axios from 'axios';
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import { newsApiConfig } from '../config/newsApi.js';
import Article from '../models/Article.js';
import logger from '../utils/logger.js';

const fetchAndStoreNews = async () => {
  try {
    // Connect to DB
    await mongoose.connect(env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB for fetching news');

    for (const category of newsApiConfig.categories) {
      logger.info(`Fetching news for category: ${category}`);
      
      try {
        const response = await axios.get(`${newsApiConfig.baseUrl}${newsApiConfig.endpoints.topHeadlines}`, {
          params: {
            apiKey: newsApiConfig.apiKey,
            category: category,
            language: 'en',
            pageSize: 20
          }
        });

        if (response.data.status !== 'ok') {
          logger.error(`Error from NewsAPI for category ${category}: ${response.data.message}`);
          continue;
        }

        const articles = response.data.articles;
        let addedCount = 0;

        for (const articleData of articles) {
          // Skip if missing essential fields or if it's a removed article
          if (!articleData.title || !articleData.url || articleData.title === '[Removed]') {
            continue;
          }

          // Check if article already exists by URL
          const exists = await Article.findOne({ url: articleData.url });
          if (!exists) {
            await Article.create({
              title: articleData.title,
              description: articleData.description || '',
              content: articleData.content || articleData.description || 'No content available',
              category: category,
              source: articleData.source.name || 'Unknown',
              author: articleData.author || 'Unknown',
              url: articleData.url,
              imageUrl: articleData.urlToImage || '',
              publishedAt: new Date(articleData.publishedAt || Date.now())
            });
            addedCount++;
          }
        }
        logger.info(`Added ${addedCount} new articles for category: ${category}`);
        
      } catch (err) {
        logger.error(`Failed to fetch category ${category}: ${err.message}`);
      }
    }

    logger.info('Finished fetching and storing news.');
    process.exit(0);
  } catch (error) {
    logger.error(`Script error: ${error.message}`);
    process.exit(1);
  }
};

fetchAndStoreNews();