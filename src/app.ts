import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRouthes';
import studentRoutes from './routes/studentRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/error';

const app = express();

// Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

export default app;