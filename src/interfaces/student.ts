import { Document, Types } from 'mongoose';
import mongoose from 'mongoose';

export interface IStudent extends Document {
  _id: Types.ObjectId;
  user: mongoose.Types.ObjectId;
  course: string;
  enrollmentYear: number;
  status: 'Active' | 'Graduated' | 'Dropped';
  createdAt: Date;
  updatedAt: Date;
}