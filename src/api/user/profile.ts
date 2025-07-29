import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from '../../../lib/db';
import { User } from '../../../models/user';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const userId = decoded.id;

    if (req.method === 'GET') {
      const user = await User.findById(userId).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(user);
    }

    if (req.method === 'PUT') {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      }).select('-password');
      return res.status(200).json({ message: 'Profile updated', user: updatedUser });
    }

    if (req.method === 'DELETE') {
      await User.findByIdAndDelete(userId);
      return res.status(200).json({ message: 'Account deleted' });
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export default handler;
