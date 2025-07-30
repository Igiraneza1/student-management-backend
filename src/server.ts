import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import { setupSwagger } from './config/swagger';
import { User } from "./models/user"; 
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
    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        name: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        registrationNumber: "ADM001",
        fieldOfStudy: "System Admin",
        year: 2024,
        role: "admin",
      });
      await admin.save();
      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (err) {
    console.error("❌ Error creating admin:", err);
  }
};


connectDB().then(() => {
  createAdmin(); 
  app.listen(PORT, () => {
    console.log(`🚀🚀🚀 Server running on port ${PORT}`);
    console.log(`📘📘📘 Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
