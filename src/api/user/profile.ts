import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../lib/db';
import { User } from '../../../models/user';

connectDB();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing or malformed' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");

    const decoded = jwt.verify(token, secret) as { id: string };

    const userId = decoded.id;

    switch (req.method) {
      case 'GET': {
        const user = await User.findById(userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
      }

      case 'PUT': {
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
          new: true,
        }).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'User not found to update' });
        return res.status(200).json({ message: 'Profile updated', user: updatedUser });
      }

      case 'DELETE': {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(404).json({ message: 'User not found to delete' });
        return res.status(200).json({ message: 'Account deleted' });
      }

      default:
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error("Token verification or DB operation failed:", error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
