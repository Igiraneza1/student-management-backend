import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user";
import bcrypt from "bcryptjs";

dotenv.config();
mongoose.connect(process.env.MONGO_URI!);

async function seed() {
  await User.deleteMany();

  const adminPassword = await bcrypt.hash("admin123", 10);
  const studentPassword = await bcrypt.hash("student123", 10);

  await User.create([
    {
      name: "Admin One",
      email: "admin@example.com",
      role: "admin",
      password: adminPassword,
      registrationNumber: "ADM001",
      course: "Computer Science",
      enrollmentYear: 2020,
      status: "Active",
    },
    {
      name: "Student One",
      email: "student1@example.com",
      role: "student",
      password: studentPassword,
      registrationNumber: "STU001",
      course: "IT",
      enrollmentYear: 2022,
      status: "Active",
    },
    {
      name: "Student Two",
      email: "student2@example.com",
      role: "student",
      password: studentPassword,
      registrationNumber: "STU002",
      course: "Software Eng",
      enrollmentYear: 2021,
      status: "Graduated",
    },
  ]);

  console.log("✅ Seeded");
  process.exit();
}

seed();
