import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", authenticate, getAllUsers);
router.get("/profile", authenticate, getUserProfile);
router.put("/profile", authenticate, updateUserProfile);
router.delete("/profile", authenticate, deleteUserProfile);
router.get("/:id", authenticate, getUser);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
