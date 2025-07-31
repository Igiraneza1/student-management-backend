import express from 'express';
import { getCurrentUser, updateCurrentUser } from '../controllers/userController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.route('/me')
  .get(protect, getCurrentUser)
  .put(protect, updateCurrentUser);

export default router;