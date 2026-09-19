import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import preferenceRoutes from './routes/preferenceRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'News Recommendation API is running' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/preferences', preferenceRoutes);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Error handling middleware
app.use(errorHandler);

export default app;
