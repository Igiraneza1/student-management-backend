import express from 'express';    

const router = express.Router();  
import { registerUser, loginUser, upload } from '../controllers/authController';
router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);

export default router;  
