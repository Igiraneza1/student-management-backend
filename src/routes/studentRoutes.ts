import express from 'express';
import { getStudents, updateStudent, deleteStudent } from '../controllers/studentController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(protect, admin, getStudents);

router.route('/:id')
  .put(protect, admin, updateStudent)
  .delete(protect, admin, deleteStudent);

export default router;