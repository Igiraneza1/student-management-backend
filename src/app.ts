import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import studentRoutes from './routes/studentRoutes';
import userRoutes from './routes/userRoutes';
import errorHandler from './middleware/error';

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); 
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;