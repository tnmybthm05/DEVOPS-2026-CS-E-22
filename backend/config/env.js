import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

export const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/news-recommendation',
  jwtSecret: process.env.JWT_SECRET || 'secretkey',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  newsApiKey: process.env.NEWS_API_KEY || ''
};