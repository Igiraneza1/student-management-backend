import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from './config/swagger';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


setupSwagger(app);

app.use('/api/v1/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀🚀🚀 Server running on port ${PORT}`);
  console.log(`📘📘📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
