import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from './config/swagger';
import { User } from "./models/user.ts"; 
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 5000;


const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);

      await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@example.com",
        password: hashedPassword,
        role: "admin",
        year: 2025, 
        fieldOfStudy: "Admin", 
        registrationNumber: "221011234" 
      });

      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

connectDB().then(() => {
  createAdmin(); 
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server running on port ${PORT}`);
    console.log(`📘📘📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
