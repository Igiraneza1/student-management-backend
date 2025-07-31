import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  
});