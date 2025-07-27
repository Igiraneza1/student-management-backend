import { Request, Response } from "express";
import { User } from "../models/user";

// POST /register
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// ...

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, registrationNumber, fieldOfStudy, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      registrationNumber,
      fieldOfStudy,
      role,
    });

    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
};



export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err });
  }
};


// GET /users
export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

// GET /users/:id
export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};

// PUT /users/:id
export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
};

// DELETE /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};
