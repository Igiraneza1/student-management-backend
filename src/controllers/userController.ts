import { Request, Response } from 'express';
import User from '../models/user';

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user?._id,
      req.body,
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};