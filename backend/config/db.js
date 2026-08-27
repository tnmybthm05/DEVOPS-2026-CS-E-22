import mongoose from 'mongoose';
import { env } from './env.js';
import logger from '../utils/logger.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.mongoUri);
    logger.success(`MongoDB Connected: ${conn.connection.host} (${conn.connection.name})`);
    return conn;
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error.message}`);
    if (error.name === 'MongooseServerSelectionError') {
      logger.error('👉 MongoDB Atlas Tip: Check your IP Whitelist (Network Access) in MongoDB Atlas or ensure your cluster is running.');
    } else if (error.message.includes('bad auth') || error.message.includes('Authentication failed')) {
      logger.error('👉 MongoDB Atlas Tip: Check your username and password in MONGO_URI.');
    }
    process.exit(1);
  }
};