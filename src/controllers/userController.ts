import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, registrationNumber, fieldOfStudy, role } = req.body;

    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashedPassword,
      registrationNumber,
      fieldOfStudy,
      role: role || "user", // default role
    });

    // Sign token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "User registered", user, token });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

// ✅ Login user
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", user, token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};

// ✅ Get all users (admin only)
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
};

// ✅ Get user by ID
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user", error: err });
  }
};

// ✅ Update user by ID (profile/settings)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");
    res.json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err });
  }
};

// ✅ Delete user by ID (account deletion)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err });
  }
};
