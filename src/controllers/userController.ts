import { Request, Response } from "express";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, registrationNumber, fieldOfStudy, year, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      fieldOfStudy,
      year,
      role: role || "student",
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to get users", error: err });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to get user", error: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "User ID missing from token" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "User ID missing from token" });

    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile", error: err });
  }
};

export const deleteUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ message: "User ID missing from token" });

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete profile", error: err });
  }
};
