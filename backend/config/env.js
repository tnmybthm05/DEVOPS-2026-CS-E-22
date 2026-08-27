import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Check possible .env file locations (current directory or parent root)
const envPaths = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(new URL('.', import.meta.url).pathname, '../../.env'),
  path.resolve(new URL('.', import.meta.url).pathname, '../.env'),
];

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
    break;
  }
}

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/news-recommendation',
  jwtSecret: process.env.JWT_SECRET || 'dev_secret_key_change_in_production',
  jwtExpire: process.env.JWT_EXPIRE || '30d',
  mlServiceUrl: process.env.ML_SERVICE_URL || 'http://localhost:8000',
  newsApiKey: process.env.NEWS_API_KEY || ''
};