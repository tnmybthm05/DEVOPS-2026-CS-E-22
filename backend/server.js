import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import logger from './utils/logger.js';

// Connect to MongoDB
await connectDB();

const PORT = env.port || 5000;

const server = app.listen(PORT, () => {
  logger.success(`🚀 Server running in ${env.nodeEnv} mode on port http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
