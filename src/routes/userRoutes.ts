import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

import { authenticate } from "../middleware/auth";
import { authorizeAdmin } from "../middleware/admin";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authenticate, authorizeAdmin, getAllUsers);
router.get("/:id", authenticate, getUser);

router.put("/:id", authenticate, updateUser);

router.delete("/:id", authenticate, deleteUser);

export default router;
